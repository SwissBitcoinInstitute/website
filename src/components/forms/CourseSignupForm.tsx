"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface CourseOption {
  id: string;
  label: string;
}

interface CourseSignupFormProps {
  courseName: string;
  courseSlug: string;
  courseDate?: string;
  courseOptions?: CourseOption[];
}

export default function CourseSignupForm({ courseName, courseSlug, courseDate, courseOptions }: CourseSignupFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Determine the initial course date value
  const getInitialCourseDate = () => {
    if (courseOptions && courseOptions.length > 0) {
      return courseOptions[0].label;
    }
    return courseDate || '';
  };
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    courseDate: getInitialCourseDate(),
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const hasCourseSelection = courseOptions || courseDate;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || (hasCourseSelection && !formData.courseDate)) {
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
          serviceType: 'scheduled-course',
          selectedCourses: [courseSlug],
          courseName,
          ...formData,
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
      <div className="text-center py-8">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-swiss-blue/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
            <CheckCircle2 className="w-12 h-12 text-swiss-blue" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Booking Received!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for registering for {courseName}. We'll be in touch within 1-2 business days with confirmation and next steps.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              organization: '',
              courseDate: getInitialCourseDate(),
              message: '',
            });
          }}
          variant="outline"
          className="text-swiss-blue border-swiss-blue hover:bg-swiss-blue/5"
        >
          Book Another Seat
        </Button>
      </div>
    );
  }

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

      {hasCourseSelection && (
        <div>
          <Label htmlFor="courseDate">Course Date *</Label>
          {courseOptions && courseOptions.length > 1 ? (
            <select
              id="courseDate"
              name="courseDate"
              required
              value={formData.courseDate}
              onChange={handleInputChange}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              {courseOptions.map((option) => (
                <option key={option.id} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              id="courseDate"
              name="courseDate"
              type="text"
              required
              value={formData.courseDate}
              readOnly
              className="mt-1 bg-gray-50 cursor-not-allowed border-gray-300 text-gray-700"
            />
          )}
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

