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

// Course types
export const COURSE_TYPES = ['bitcoin-executives', 'financial-sovereignty', 'custom'] as const;
export type CourseType = (typeof COURSE_TYPES)[number];
