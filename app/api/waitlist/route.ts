import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const waitlistSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().optional(),
  company: z.string().optional(),
  interest: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = waitlistSchema.parse(body);

    // TODO: Implement actual waitlist storage
    // For now, just log the data
    console.log('Waitlist signup:', validatedData);

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
