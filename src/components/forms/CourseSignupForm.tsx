"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface CourseSignupFormProps {
  courseName: string;
  courseSlug: string;
  courseDate?: string;
}

export default function CourseSignupForm({ courseName, courseSlug, courseDate }: CourseSignupFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    courseDate: courseDate || '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || (courseDate && !formData.courseDate)) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and course date are required.",
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
          serviceType: 'courses',
          selectedCourses: [courseSlug],
          ...formData,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Registration received!",
          description: `We'll be in touch soon about ${courseName}.`,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          courseDate: courseDate || '',
          message: '',
        });
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your full name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+41 XX XXX XX XX"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input
            id="organization"
            name="organization"
            type="text"
            value={formData.organization}
            onChange={handleInputChange}
            placeholder="Your organization"
            className="mt-1"
          />
        </div>
      </div>

      {courseDate && (
        <div>
          <Label htmlFor="courseDate">Course Date *</Label>
          <Input
            id="courseDate"
            name="courseDate"
            type="text"
            required
            value={formData.courseDate}
            readOnly
            className="mt-1 bg-gray-50 cursor-not-allowed border-gray-300 text-gray-700"
          />
        </div>
      )}

      <div>
        <Label htmlFor="message">Message (optional)</Label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Any questions or additional information? If you have a discount code, simply mention it here."
          rows={3}
          className="mt-1 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full swiss-blue-gradient text-white shadow-lg hover:shadow-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Book your seat'
        )}
      </Button>
    </form>
  );
}

