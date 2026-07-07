'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ToastState = { type: 'success' | 'error'; message: string } | null;

interface ContactFormProps {
    className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
    const [toast, setToast] = useState<ToastState>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    async function onSubmit(data: ContactFormData) {
        setToast(null);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Request failed');

            reset();
            setToast({ type: 'success', message: "Message sent! I'll get back to you soon." });
        } catch {
            // Preserve field values on error — do not call reset()
            setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={cn('space-y-6', className)}
        >
            <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-300 mb-2">
                    Name
                </label>
                <Input
                    id="contact-name"
                    placeholder="Your name"
                    autoComplete="name"
                    error={errors.name?.message}
                    {...register('name')}
                />
            </div>

            <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-300 mb-2">
                    Email
                </label>
                <Input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register('email')}
                />
            </div>

            <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-300 mb-2">
                    Message
                </label>
                <Textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell me about your project..."
                    error={errors.message?.message}
                    {...register('message')}
                />
            </div>

            <Button
                type="submit"
                size="lg"
                variant="primary"
                loading={isSubmitting}
                className="w-full"
            >
                Send Message
            </Button>

            {toast && (
                <p
                    role="status"
                    className={cn(
                        'text-sm text-center',
                        toast.type === 'success' ? 'text-success' : 'text-error'
                    )}
                >
                    {toast.message}
                </p>
            )}
        </form>
    );
}
