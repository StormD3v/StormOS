'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { waitlistSchema, type WaitlistFormData } from '@/lib/validations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WaitlistFormProps {
    className?: string;
}

type ToastState = { type: 'success' | 'error'; message: string } | null;

export function WaitlistForm({ className }: WaitlistFormProps) {
    const [toast, setToast] = useState<ToastState>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<WaitlistFormData>({
        resolver: zodResolver(waitlistSchema),
    });

    async function onSubmit(data: WaitlistFormData) {
        setToast(null);
        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error('Request failed');

            reset();
            setToast({ type: 'success', message: "You're on the list! We'll keep you updated." });
        } catch {
            setToast({ type: 'error', message: 'Something went wrong. Please try again.' });
        }
    }

    return (
        <div className={cn('w-full max-w-md', className)}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <label htmlFor="waitlist-email" className="sr-only">
                        Email address
                    </label>
                    <Input
                        id="waitlist-email"
                        type="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={isSubmitting}
                    className="bg-accent-purple hover:bg-accent-purple-dark focus:ring-accent-purple whitespace-nowrap"
                >
                    Join Waitlist
                </Button>
            </form>

            {toast && (
                <p
                    role="status"
                    className={cn(
                        'mt-3 text-sm',
                        toast.type === 'success' ? 'text-success' : 'text-error'
                    )}
                >
                    {toast.message}
                </p>
            )}
        </div>
    );
}
