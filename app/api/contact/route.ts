import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { contactFormSchema } from '@/lib/validations';

// In-memory rate limit: 5 requests per 10 minutes per IP
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes in ms

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Honeypot check: if website field is filled, reject silently
    if (validatedData.website && validatedData.website.trim() !== '') {
      // Return generic success to mislead bots
      return NextResponse.json(
        { message: 'Message sent successfully' },
        { status: 200 }
      );
    }

    // Rate limit check
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor 
      ? forwardedFor.split(',')[0].trim() 
      : request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();

    // Delete expired entries
    for (const [key, value] of rateLimit.entries()) {
      if (now > value.resetTime) {
        rateLimit.delete(key);
      }
    }

    const record = rateLimit.get(ip);

    if (record) {
      if (now > record.resetTime) {
        // Window expired, reset
        rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else if (record.count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      } else {
        record.count++;
      }
    } else {
      rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // TODO: Implement actual email sending
    // For now, just log the data
    console.log('Contact form submission:', validatedData);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
