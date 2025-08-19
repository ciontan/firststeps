'use server';

import { NextResponse } from 'next/server';
import crypto from 'crypto';

const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SECRET;

// Verify that the webhook came from Coinbase Commerce
function verifyWebhookSignature(
  signature: string,
  body: string,
  secretKey: string
) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(body);
  const computedSignature = hmac.digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}

export async function POST(request: Request) {
  try {
    // Get the raw request body as text
    const rawBody = await request.text();
    const signature = request.headers.get('x-cc-webhook-signature');

    if (!signature || !COINBASE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Missing signature or webhook secret' },
        { status: 401 }
      );
    }

    // Verify the webhook signature
    const isValid = verifyWebhookSignature(
      signature,
      rawBody,
      COINBASE_WEBHOOK_SECRET
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const event = JSON.parse(rawBody);

    // Handle different webhook events
    switch (event.type) {
      case 'charge:created':
        console.log('Charge created:', event.data);
        break;
      case 'charge:confirmed':
        console.log('Payment confirmed:', event.data);
        // Handle successful payment
        break;
      case 'charge:failed':
        console.log('Payment failed:', event.data);
        // Handle failed payment
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
