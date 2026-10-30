import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  FROM_EMAIL,
  RECEIVE_EMAIL_NOTIFICATIONS,
  getContactTeamNotificationEmail,
  getContactCustomerConfirmationEmail,
  type ContactFormData,
} from '@/lib/emails';
import { assertSameOrigin } from '@/lib/request-guard';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY!);

// Abuse protection: limit to 5 contact submissions per IP per 10 minutes.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  try {
    const originError = assertSameOrigin(request);
    if (originError) {
      return NextResponse.json(
        { success: false, error: 'Request rejected' },
        { status: 403 }
      );
    }

    const rate = checkRateLimit(
      `contact:${getClientIp(request)}`,
      RATE_LIMIT,
      RATE_WINDOW_MS
    );
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests, please try again later' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      );
    }

    const formData: ContactFormData = await request.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the contact submission
    console.log('New Contact Form Submission:', {
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      subject: formData.subject,
      timestamp: new Date().toISOString(),
    });

    // Send notification email to SBI team
    const teamEmail = getContactTeamNotificationEmail(formData);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: RECEIVE_EMAIL_NOTIFICATIONS,
      subject: teamEmail.subject,
      text: teamEmail.text,
      replyTo: formData.email,
    });

    // Send confirmation email to the customer
    const customerEmail = getContactCustomerConfirmationEmail(formData);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: formData.email,
      subject: customerEmail.subject,
      text: customerEmail.text,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
