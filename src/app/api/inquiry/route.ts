import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SERVICE_LABELS, SERVICE_EMAIL_CONTENT, type ServiceType } from '@/lib/inquiry';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceType, ...formData } = body as { serviceType: ServiceType; [key: string]: any };
    
    // Calculate lead score for internal prioritization
    const score = calculateLeadScore(formData, serviceType);
    
    // Log the inquiry for tracking
    console.log('New Inquiry:', {
      serviceType,
      score,
      name: formData.name,
      email: formData.email,
      organization: formData.organization,
      timestamp: new Date().toISOString(),
    });
    
    // Send notification email to SBI team
    await sendTeamNotification(formData, serviceType, score);
    
    // Send confirmation email to the customer
    await sendCustomerConfirmation(formData.email, formData.name, serviceType);
    
    return NextResponse.json({ 
      success: true, 
      score,
      message: 'Request received successfully' 
    });
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

function calculateLeadScore(formData: any, serviceType: ServiceType): number {
  let score = 0;
  
  // Base points by service type
  if (serviceType === 'courses') score += 20;
  else if (serviceType === 'research') score += 15;
  else if (serviceType === 'speaking') score += 10;
  
  // Seniority scoring (high value decision-makers)
  if (formData.seniorityLevel === 'c-suite') score += 25;
  else if (formData.seniorityLevel === 'director') score += 15;
  else if (formData.seniorityLevel === 'manager') score += 10;
  
  // Organization type scoring (target segments)
  if (formData.organizationType === 'family-office') score += 20;
  else if (formData.organizationType === 'bank') score += 20;
  else if (formData.organizationType === 'financial-advisory') score += 15;
  else if (formData.organizationType === 'corporation') score += 10;
  
  // Timeline urgency (ready to buy signals)
  if (formData.timeline === 'asap' || formData.timeline === 'urgent') score += 25;
  else if (formData.timeline === '1-2months' || formData.timeline === '1-2weeks') score += 15;
  else if (formData.timeline === '3-6months') score += 5;
  
  // Team size (group bookings more valuable)
  if (formData.teamSize === '10+') score += 20;
  else if (formData.teamSize === '4-10') score += 15;
  else if (formData.teamSize === '2-3') score += 10;
  
  // Work experience (senior professionals)
  if (formData.workExperience === '15+') score += 10;
  else if (formData.workExperience === '5-15') score += 5;
  
  // Multiple courses selected (higher intent)
  if (formData.selectedCourses && formData.selectedCourses.length > 1) {
    score += 15;
  }
  
  // Custom program interest (high-value opportunity)
  if (formData.selectedCourses && formData.selectedCourses.includes('custom')) {
    score += 10;
  }
  
  return Math.min(score, 100); // Cap at 100
}

// Send notification email to SBI team with all form data
async function sendTeamNotification(formData: any, serviceType: ServiceType, score: number) {
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
Submitted: ${new Date().toLocaleString('en-CH', { timeZone: 'Europe/Zurich' })} (Zurich)
  `.trim();

  await resend.emails.send({
    from: 'Swiss Bitcoin Institute <noreply@notifications.bitcoininstitute.ch>',
    to: 'hello@bitcoininstitute.ch',
    subject: `[${score >= 70 ? 'HIGH' : score >= 40 ? 'MED' : 'STD'}] New ${serviceLabel} from ${formData.name || formData.email}`,
    text,
  });
}

// Send confirmation email to the customer
async function sendCustomerConfirmation(email: string, name: string, serviceType: ServiceType) {
  const firstName = name?.split(' ')[0] || 'there';
  const content = SERVICE_EMAIL_CONTENT[serviceType];

  const text = `
Dear ${firstName},

${content.message}

What happens next?
One of our team members will personally review your inquiry and reach out to you directly. If you have any urgent questions, feel free to reply to this email.

Best regards,
The Swiss Bitcoin Institute Team

--
Swiss Bitcoin Institute
Zurich, Switzerland
https://bitcoininstitute.ch
  `.trim();

  await resend.emails.send({
    from: 'Swiss Bitcoin Institute <noreply@notifications.bitcoininstitute.ch>',
    to: email,
    subject: `${content.title} - Swiss Bitcoin Institute`,
    text,
  });
}

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
