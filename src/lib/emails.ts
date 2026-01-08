import { SERVICE_LABELS, type ServiceType } from '@/lib/inquiry';

// Email configuration
export const FROM_EMAIL = 'Swiss Bitcoin Institute <noreply@notifications.bitcoininstitute.ch>';
export const RECEIVE_EMAIL_NOTIFICATIONS = 'hello@bitcoininstitute.ch';

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

// Shared email footer
const EMAIL_FOOTER = `
--
Swiss Bitcoin Institute
Zurich, Switzerland
https://bitcoininstitute.ch`.trim();

// Helper to format field labels from camelCase to readable text
function formatFieldLabel(key: string): string {
  const labels: Record<string, string> = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    organization: 'Organization',
    organizationType: 'Organization Type',
    seniorityLevel: 'Seniority Level',
    workExperience: 'Work Experience',
    teamSize: 'Team Size',
    timeline: 'Timeline',
    selectedCourses: 'Selected Courses',
    message: 'Message',
    eventType: 'Event Type',
    eventDate: 'Event Date',
    location: 'Location',
    audienceSize: 'Audience Size',
    audienceDescription: 'Audience Description',
    topics: 'Topics of Interest',
    budget: 'Budget',
    additionalInfo: 'Additional Information',
  };
  
  return labels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

// Helper to get current Zurich timestamp
function getZurichTimestamp(): string {
  return new Date().toLocaleString('en-CH', { timeZone: 'Europe/Zurich' });
}

// ============================================
// CONTACT FORM EMAIL TEMPLATES
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
}

export function getContactTeamNotificationEmail(formData: ContactFormData) {
  const text = `
NEW CONTACT FORM MESSAGE
${'='.repeat(50)}

From: ${formData.name}
Email: ${formData.email}
Organization: ${formData.organization || 'Not provided'}
Subject: ${formData.subject}

MESSAGE
${'-'.repeat(50)}
${formData.message}

${'-'.repeat(50)}
Submitted: ${getZurichTimestamp()} (Zurich)
  `.trim();

  return {
    subject: `[Contact] ${formData.subject} - from ${formData.name}`,
    text,
  };
}

export function getContactCustomerConfirmationEmail(formData: ContactFormData) {
  const firstName = formData.name?.split(' ')[0] || 'there';

  const text = `
Dear ${firstName},

Thank you for reaching out to the Swiss Bitcoin Institute. We have received your message and will get back to you within 1-2 business days.

Your message:
${'-'.repeat(40)}
Subject: ${formData.subject}

${formData.message}
${'-'.repeat(40)}

Best regards,
The Swiss Bitcoin Institute Team

${EMAIL_FOOTER}
  `.trim();

  return {
    subject: 'Message Received - Swiss Bitcoin Institute',
    text,
  };
}

// ============================================
// INQUIRY FORM EMAIL TEMPLATES
// ============================================

export interface InquiryTeamNotificationParams {
  formData: Record<string, any>;
  serviceType: ServiceType;
  score: number;
}

export function getInquiryTeamNotificationEmail({ formData, serviceType, score }: InquiryTeamNotificationParams) {
  const priority = score >= 70 ? 'HIGH PRIORITY' : score >= 40 ? 'MEDIUM PRIORITY' : 'STANDARD';
  const serviceLabel = SERVICE_LABELS[serviceType];

  const formattedData = Object.entries(formData)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      const label = formatFieldLabel(key);
      const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
      return `${label}: ${displayValue}`;
    })
    .join('\n');

  const text = `
NEW ${serviceLabel.toUpperCase()}
${'='.repeat(50)}

Priority: ${priority}
Lead Score: ${score}/100

FORM DATA
${'-'.repeat(50)}
${formattedData}

${'-'.repeat(50)}
Submitted: ${getZurichTimestamp()} (Zurich)
  `.trim();

  const priorityTag = score >= 70 ? 'HIGH' : score >= 40 ? 'MED' : 'STD';

  return {
    subject: `[${priorityTag}] New ${serviceLabel} from ${formData.name || formData.email}`,
    text,
  };
}

export interface InquiryCustomerConfirmationParams {
  email: string;
  name: string;
  serviceType: ServiceType;
}

export function getInquiryCustomerConfirmationEmail({ name, serviceType }: InquiryCustomerConfirmationParams) {
  const firstName = name?.split(' ')[0] || 'there';
  const content = SERVICE_EMAIL_CONTENT[serviceType];

  const text = `
Dear ${firstName},

${content.message}

What happens next?
One of our team members will personally review your inquiry and reach out to you directly. If you have any urgent questions, feel free to reply to this email.

Best regards,
The Swiss Bitcoin Institute Team

${EMAIL_FOOTER}
  `.trim();

  return {
    subject: `${content.title} - Swiss Bitcoin Institute`,
    text,
  };
}
