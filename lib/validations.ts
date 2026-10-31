import { z } from 'zod';

/**
 * Contact form validation schema.
 * Shared between the client-side form and the /api/contact route handler.
 */
export const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
    email: z.string().email('Please enter a valid email address').max(200, 'Email must be less than 200 characters'),
    subject: z.string().max(150, 'Subject must be less than 150 characters').optional().default(''),
    message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be less than 5000 characters'),
    website: z.string().optional(),
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
