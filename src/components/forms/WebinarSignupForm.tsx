"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface WebinarSignupFormProps {
  webinarName: string;
  courseName: string;
  slots: string[];
}

export default function WebinarSignupForm({ webinarName, courseName, slots }: WebinarSignupFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [webinarSlot, setWebinarSlot] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!webinarSlot || !email) {
      toast({
        title: "Please fill in required fields",
        description: "Please pick a slot and enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: 'webinar-registration',
          webinarName,
          courseName,
          webinarSlot,
          email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again or email us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="flex items-center gap-3 h-full">
        <CheckCircle2 className="w-8 h-8 text-swiss-blue flex-shrink-0" strokeWidth={1.5} />
        <p className="text-gray-700">
          Thank you! You're registered for <span className="font-semibold">{webinarSlot}</span>.
          We'll send you the access details by email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-end gap-3">
      <div className="sm:flex-1">
        <Label htmlFor="webinarSlot">Webinar slot *</Label>
        <select
          id="webinarSlot"
          name="webinarSlot"
          required
          value={webinarSlot}
          onChange={(e) => setWebinarSlot(e.target.value)}
          className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        >
          <option value="" disabled>
            Pick a slot suitable for you
          </option>
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:flex-1">
        <Label htmlFor="webinarEmail">Your email address *</Label>
        <Input
          id="webinarEmail"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="mt-1"
        />
      </div>
      <Button
        type="submit"
        variant="default"
        className="font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </Button>
    </form>
  );
}
