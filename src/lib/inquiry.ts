// Service types for inquiry forms
export const SERVICE_TYPES = ['research', 'speaking', 'courses', 'other'] as const;
export type ServiceType = (typeof SERVICE_TYPES)[number];

// Labels for each service type (used in emails and UI)
export const SERVICE_LABELS: Record<ServiceType, string> = {
  research: 'Research & Advisory',
  speaking: 'Speaking Request',
  courses: 'Course Inquiry',
  other: 'General Inquiry',
};

// Email content for customer confirmations
export const SERVICE_EMAIL_CONTENT: Record<ServiceType, { title: string; message: string }> = {
  courses: {
    title: 'Course Inquiry Received',
    message: 'Thank you for your interest in our executive education programs. Our team will review your requirements and get back to you within 1-2 business days with program details and availability.',
  },
  research: {
    title: 'Research Inquiry Received',
    message: 'Thank you for your interest in our research and advisory services. A member of our team will reach out within 1-2 business days to schedule a discovery call and discuss your specific needs.',
  },
  speaking: {
    title: 'Speaking Request Received',
    message: 'Thank you for considering the Swiss Bitcoin Institute for your event. Our team will review your request and respond within 1-2 business days with speaker availability and presentation options.',
  },
  other: {
    title: 'Inquiry Received',
    message: 'Thank you for contacting the Swiss Bitcoin Institute. Our team will review your inquiry and respond within 1-2 business days.',
  },
};

// Course types
export const COURSE_TYPES = ['bitcoin-executives', 'financial-sovereignty', 'custom'] as const;
export type CourseType = (typeof COURSE_TYPES)[number];
