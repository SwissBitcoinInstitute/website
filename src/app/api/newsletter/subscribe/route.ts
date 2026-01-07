import MailerLite from '@mailerlite/mailerlite-nodejs';
import { NextResponse } from 'next/server';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY!
});

export async function POST(request: Request) {
  try {
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
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

