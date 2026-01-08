import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { type ServiceType } from '@/lib/inquiry';
import {
  FROM_EMAIL,
  RECEIVE_EMAIL_NOTIFICATIONS,
  getInquiryTeamNotificationEmail,
  getInquiryCustomerConfirmationEmail,
} from '@/lib/emails';

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
    const teamEmail = getInquiryTeamNotificationEmail({ formData, serviceType, score });
    await resend.emails.send({
      from: FROM_EMAIL,
      to: RECEIVE_EMAIL_NOTIFICATIONS,
      subject: teamEmail.subject,
      text: teamEmail.text,
    });
    
    // Send confirmation email to the customer
    const customerEmail = getInquiryCustomerConfirmationEmail({
      email: formData.email,
      name: formData.name,
      serviceType,
    });
    await resend.emails.send({
      from: FROM_EMAIL,
      to: formData.email,
      subject: customerEmail.subject,
      text: customerEmail.text,
    });
    
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
