import MailerLite from '@mailerlite/mailerlite-nodejs';
import { NextResponse } from 'next/server';
import { AxiosError } from 'axios';
import { assertSameOrigin } from '@/lib/request-guard';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY!
});

// Abuse protection: limit to 10 subscriptions per IP per 10 minutes.
const RATE_LIMIT = 10;
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
      `newsletter:${getClientIp(request)}`,
      RATE_LIMIT,
      RATE_WINDOW_MS
    );
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests, please try again later' },
        { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
      );
    }

    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Log the subscription for tracking
    console.log('Newsletter subscription:', {
      email,
      timestamp: new Date().toISOString(),
    });

    // Add subscriber to MailerLite
    await mailerlite.subscribers.createOrUpdate({
      email,
      groups: ['160706794878928310'],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    if (error instanceof AxiosError) {
      console.error(error.response?.data);
    }
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

