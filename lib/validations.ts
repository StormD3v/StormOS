import { z } from 'zod';

/**
 * Contact form validation schema.
 * Shared between the client-side form and the /api/contact route handler.
 */
export const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().optional().default(''),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

/**
 * Waitlist form validation schema.
 * Shared between the client-side form and the /api/waitlist route handler.
 */
export const waitlistSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type WaitlistFormData = z.infer<typeof waitlistSchema>;
