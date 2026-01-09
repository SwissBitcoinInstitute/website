"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Send, Briefcase, Mic, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { type ServiceType, type CourseType } from '@/lib/inquiry';

export default function LeadIntakeForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  // Pre-fill service type from URL params
  const urlService = searchParams?.get('service') as ServiceType | null;
  const urlCourse = searchParams?.get('course') as CourseType | null;
  const urlDiscovery = searchParams?.get('discovery') === 'true';
  
  const [serviceType, setServiceType] = useState<ServiceType>(urlService || 'courses');
  const [isDiscoveryCallSelected, setIsDiscoveryCallSelected] = useState(urlDiscovery);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    email: '',
    phone: '',
    organization: '',
    title: '',
    
    // Service-specific
    selectedCourses: urlCourse ? [urlCourse] : [] as CourseType[],
    
    // Qualification Questions
    professionalBackground: '',
    seniorityLevel: '',
    workExperience: '',
    organizationType: '',
    teamSize: '',
    
    // Speaking Specific
    eventName: '',
    eventDate: '',
    eventLocation: '',
    eventWebsite: '',
    topicRequested: '',
    audienceSize: '',
    speakingDuration: '',
    
    // General
    message: '',
    timeline: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseToggle = (course: CourseType) => {
    const updated = formData.selectedCourses.includes(course)
      ? formData.selectedCourses.filter(c => c !== course)
      : [...formData.selectedCourses, course];
    setFormData({ ...formData, selectedCourses: updated });
  };

  const handleDiscoveryCallClick = () => {
    setIsDiscoveryCallSelected(true);
    setServiceType('research');
    // Don't scroll - let user stay where they are
  };

  // Scroll to service selection section when coming from external links with URL params or hash
  useEffect(() => {
    // Check if URL has hash anchor or URL params
    const hasHash = typeof window !== 'undefined' && window.location.hash === '#service-selection';
    const hasUrlParams = urlService || urlDiscovery || urlCourse;
    
    if (hasHash || hasUrlParams) {
      setTimeout(() => {
        const serviceSelection = document.getElementById('service-selection');
        if (serviceSelection) {
          const rect = serviceSelection.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetY = scrollTop + rect.top - 20; // 20px offset for slight breathing room
          window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        }
      }, 200); // Slightly longer delay to ensure DOM is ready
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          serviceType, 
          isDiscoveryCall: isDiscoveryCallSelected && serviceType === 'research',
          ...formData 
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          title: '',
          selectedCourses: [],
          professionalBackground: '',
          seniorityLevel: '',
          workExperience: '',
          organizationType: '',
          teamSize: '',
          eventName: '',
          eventDate: '',
          eventLocation: '',
          eventWebsite: '',
          topicRequested: '',
          audienceSize: '',
          speakingDuration: '',
          message: '',
          timeline: '',
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
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getConfirmationMessage = () => {
    if (isDiscoveryCallSelected && serviceType === 'research') {
      return "We'll review your discovery call request and get back to you within 24 hours to schedule your 20-minute call.";
    }
    
    switch (serviceType) {
      case 'research':
        return "We'll review your research inquiry and get back to you within 24 hours to discuss your intelligence needs.";
      case 'speaking':
        return "We'll review your event details and respond within 24 hours.";
      case 'courses':
        return "We'll send you detailed course information and schedule a consultation.";
      default:
        return "We'll get back to you within 24 hours.";
    }
  };

  // Success state component
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="p-12">
          <div className="text-center py-8">
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 rounded-full bg-swiss-blue/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
                <CheckCircle2 className="w-20 h-20 text-swiss-blue" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Thank You!</h2>
            <p className="swiss-prose text-gray-600 max-w-md mx-auto mb-8">
              {getConfirmationMessage()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                variant="default"
                size="lg"
                className="swiss-blue-gradient text-white"
              >
                <Link href="/research">
                  View Research Briefs
                </Link>
              </Button>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="text-swiss-blue border-swiss-blue hover:bg-swiss-blue/5"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Service Type Selection */}
        <Card id="service-selection" className="p-8 scroll-mt-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            What are you interested in?
          </h3>

          {/* Discovery Call Button - Full Width Above Service Types */}
          <button
            id="discovery-call-button"
            type="button"
            onClick={handleDiscoveryCallClick}
            className={`w-full p-6 rounded-xl border-2 transition-all mb-6 group ${
              isDiscoveryCallSelected && serviceType === 'research'
                ? 'border-swiss-blue bg-swiss-blue/5 shadow-lg'
                : 'border-gray-200 hover:border-swiss-blue/50 hover:shadow-md bg-white'
            }`}
          >
            <div className="flex items-center justify-center gap-3">
              <Calendar className={`w-6 h-6 transition-colors ${
                isDiscoveryCallSelected && serviceType === 'research'
                  ? 'text-swiss-blue'
                  : 'text-gray-400 group-hover:text-swiss-blue'
              }`} />
              <span className={`text-lg font-semibold transition-colors ${
                isDiscoveryCallSelected && serviceType === 'research'
                  ? 'swiss-blue-gradient-text'
                  : 'text-gray-900'
              }`}>
                Open Discovery Call
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Book a 20-minute discovery call to discuss your research or intelligence needs
            </p>
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => {
                setServiceType('research');
                setIsDiscoveryCallSelected(false);
              }}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                serviceType === 'research' && !isDiscoveryCallSelected
                  ? 'border-swiss-blue bg-swiss-blue/5'
                  : 'border-gray-200 hover:border-swiss-blue/50 hover:bg-gray-50'
              }`}
            >
              <Briefcase className={`w-8 h-8 mx-auto mb-3 transition-colors ${
                serviceType === 'research' && !isDiscoveryCallSelected ? 'text-swiss-blue' : 'text-gray-400'
              }`} />
              <div className="font-semibold text-gray-900">Research Brief</div>
              <div className="text-sm text-gray-600 mt-1">Intelligence & Analysis</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setServiceType('speaking');
                setIsDiscoveryCallSelected(false);
              }}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                serviceType === 'speaking' && !isDiscoveryCallSelected
                  ? 'border-swiss-blue bg-swiss-blue/5'
                  : 'border-gray-200 hover:border-swiss-blue/50 hover:bg-gray-50'
              }`}
            >
              <Mic className={`w-8 h-8 mx-auto mb-3 transition-colors ${
                serviceType === 'speaking' && !isDiscoveryCallSelected ? 'text-swiss-blue' : 'text-gray-400'
              }`} />
              <div className="font-semibold text-gray-900">Speaking</div>
              <div className="text-sm text-gray-600 mt-1">Keynotes & Events</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setServiceType('courses');
                setIsDiscoveryCallSelected(false);
              }}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                serviceType === 'courses' && !isDiscoveryCallSelected
                  ? 'border-swiss-blue bg-swiss-blue/5'
                  : 'border-gray-200 hover:border-swiss-blue/50 hover:bg-gray-50'
              }`}
            >
              <GraduationCap className={`w-8 h-8 mx-auto mb-3 transition-colors ${
                serviceType === 'courses' && !isDiscoveryCallSelected ? 'text-swiss-blue' : 'text-gray-400'
              }`} />
              <div className="font-semibold text-gray-900">Courses</div>
              <div className="text-sm text-gray-600 mt-1">Education & Training</div>
            </button>
          </div>
        </Card>

        {/* Basic Contact Information (Always shown) */}
        <Card className="p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="John Smith"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@company.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+41 XX XXX XX XX"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="organization">Organization *</Label>
              <Input
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                required
                placeholder="Company or Institution"
                className="mt-2"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="e.g., CFO, Wealth Manager, Managing Director"
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* CONDITIONAL: Open Discovery Call Form (Different from Research Brief) */}
        {isDiscoveryCallSelected && serviceType === 'research' && (
          <Card id="discovery-form" className="p-8 border-2 border-swiss-blue/30">
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="w-6 h-6 text-swiss-blue" />
              <h3 className="text-xl font-semibold text-gray-900">
                Book Your 20-Minute Discovery Call
              </h3>
            </div>
            
            <div className="bg-swiss-blue/5 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-4">
                We'll discuss your needs and determine how the Swiss Bitcoin Institute can best support your organization's Bitcoin strategy, education, or research requirements.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="timeline">Preferred Timeline</Label>
                <Select 
                  name="timeline" 
                  onValueChange={(value) => handleSelectChange('timeline', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent (within 1 week)</SelectItem>
                    <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                    <SelectItem value="1month">Within a month</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">What would you like to discuss? *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Tell us about your organization's needs, goals, or questions related to Bitcoin strategy, education, or research..."
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        )}

        {/* CONDITIONAL: Research Brief Form (Different from Discovery Call) */}
        {serviceType === 'research' && !isDiscoveryCallSelected && (
          <Card className="p-8 border-2 border-swiss-blue/30">
            <div className="flex items-center space-x-3 mb-6">
              <Briefcase className="w-6 h-6 text-swiss-blue" />
              <h3 className="text-xl font-semibold text-gray-900">
                Research & Intelligence Brief
              </h3>
            </div>
            
            <div className="bg-swiss-blue/5 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-4">
                We'll discuss your research or intelligence needs and determine the best approach for your organization.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Custom research briefs and market analysis</li>
                <li>• Competitive intelligence and trend monitoring</li>
                <li>• Strategic Bitcoin intelligence for decision-makers</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="timeline">Preferred Timeline</Label>
                <Select 
                  name="timeline" 
                  onValueChange={(value) => handleSelectChange('timeline', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent (within 1 week)</SelectItem>
                    <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                    <SelectItem value="1month">Within a month</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">What questions do you need answered? *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe the strategic questions or intelligence needs you have..."
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        )}

        {/* CONDITIONAL: Speaking Engagement */}
        {serviceType === 'speaking' && (
          <Card className="p-8 border-2 border-swiss-blue/30">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Event Details
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Swiss Finance Summit 2025"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="eventLocation">Event Location *</Label>
                  <Input
                    id="eventLocation"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleInputChange}
                    required
                    placeholder="City, Country or Virtual"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="eventWebsite">Event Website / Link</Label>
                  <Input
                    id="eventWebsite"
                    name="eventWebsite"
                    type="url"
                    value={formData.eventWebsite}
                    onChange={handleInputChange}
                    placeholder="https://event-website.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="audienceSize">Expected Audience Size</Label>
                  <Select 
                    name="audienceSize"
                    onValueChange={(value) => handleSelectChange('audienceSize', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<50">Less than 50</SelectItem>
                      <SelectItem value="50-200">50-200</SelectItem>
                      <SelectItem value="200-500">200-500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="speakingDuration">Speaking Duration</Label>
                  <Select 
                    name="speakingDuration"
                    onValueChange={(value) => handleSelectChange('speakingDuration', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20min">20 minutes</SelectItem>
                      <SelectItem value="30-45min">30-45 minutes</SelectItem>
                      <SelectItem value="60min">60 minutes (keynote)</SelectItem>
                      <SelectItem value="panel">Panel discussion</SelectItem>
                      <SelectItem value="workshop">Workshop (90+ min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="topicRequested">Topic / Theme Requested *</Label>
                <Textarea
                  id="topicRequested"
                  name="topicRequested"
                  value={formData.topicRequested}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="What topic would you like covered? (e.g., Bitcoin for Central Banks, Corporate Treasury Strategy, etc.)"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Details</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Audience profile, special requirements, budget considerations, etc."
                  className="mt-2"
                />
              </div>
            </div>
          </Card>
        )}

        {/* CONDITIONAL: Courses & Coaching */}
        {serviceType === 'courses' && (
          <>
            <Card className="p-8 border-2 border-swiss-blue/30">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Which course(s) are you interested in?
              </h3>
              
              <div className="space-y-4 mb-8">
                <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.selectedCourses.includes('bitcoin-executives')
                    ? 'border-swiss-blue bg-swiss-blue/5'
                    : 'border-gray-200 hover:border-swiss-blue/30'
                }`}>
                  <Checkbox
                    checked={formData.selectedCourses.includes('bitcoin-executives')}
                    onCheckedChange={() => handleCourseToggle('bitcoin-executives')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Bitcoin for Executives</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Live course in Zürich. 4 afternoons covering Bitcoin's strategic implications for business, policy, society, and geopolitics. For executives with little Bitcoin knowledge.
                    </div>
                  </div>
                </label>

                <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.selectedCourses.includes('financial-sovereignty')
                    ? 'border-swiss-blue bg-swiss-blue/5'
                    : 'border-gray-200 hover:border-swiss-blue/30'
                }`}>
                  <Checkbox
                    checked={formData.selectedCourses.includes('financial-sovereignty')}
                    onCheckedChange={() => handleCourseToggle('financial-sovereignty')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Financial Sovereignty - Starter</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Half-day hands-on course in Zürich. Learn to securely control your Bitcoin through hardware wallets, seed phrase management, and secure backup strategies. For Bitcoin holders.
                    </div>
                  </div>
                </label>

                <label className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.selectedCourses.includes('custom')
                    ? 'border-swiss-blue bg-swiss-blue/5'
                    : 'border-gray-200 hover:border-swiss-blue/30'
                }`}>
                  <Checkbox
                    checked={formData.selectedCourses.includes('custom')}
                    onCheckedChange={() => handleCourseToggle('custom')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Custom Program</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Tailored curriculum for your organization's specific needs. Board briefings, team workshops, or extended programs.
                    </div>
                  </div>
                </label>
              </div>

              {/* Conditional Questions Based on Course Selection */}
              {formData.selectedCourses.length > 0 && (
                <div className="space-y-6 pt-6 border-t-2 border-gray-100">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Help us understand your background
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="organizationType">Organization Type *</Label>
                      <Select 
                        name="organizationType"
                        onValueChange={(value) => handleSelectChange('organizationType', value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="financial-advisory">Financial Advisory Firm</SelectItem>
                          <SelectItem value="family-office">Family Office</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="bank">Bank / Financial Institution</SelectItem>
                          <SelectItem value="government">Government / Public Sector</SelectItem>
                          <SelectItem value="individual">Individual Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="seniorityLevel">Seniority Level *</Label>
                      <Select 
                        name="seniorityLevel"
                        onValueChange={(value) => handleSelectChange('seniorityLevel', value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="c-suite">C-Suite / Executive</SelectItem>
                          <SelectItem value="director">Director / VP</SelectItem>
                          <SelectItem value="manager">Manager / Senior Professional</SelectItem>
                          <SelectItem value="advisor">Advisor / Consultant</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="workExperience">Years of Professional Experience *</Label>
                      <Select 
                        name="workExperience"
                        onValueChange={(value) => handleSelectChange('workExperience', value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<5">Less than 5 years</SelectItem>
                          <SelectItem value="5-15">5-15 years</SelectItem>
                          <SelectItem value="15+">15+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="teamSize">Team Size (if enrolling multiple)</Label>
                      <Select 
                        name="teamSize"
                        onValueChange={(value) => handleSelectChange('teamSize', value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Individual (just me)</SelectItem>
                          <SelectItem value="2-3">2-3 people</SelectItem>
                          <SelectItem value="4-10">4-10 people</SelectItem>
                          <SelectItem value="10+">10+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="professionalBackground">
                      Professional Background & Bitcoin Experience *
                    </Label>
                    <Textarea
                      id="professionalBackground"
                      name="professionalBackground"
                      value={formData.professionalBackground}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Tell us about your professional background and any existing Bitcoin knowledge or experience..."
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeline">Preferred Start Timeline</Label>
                    <Select 
                      name="timeline"
                      onValueChange={(value) => handleSelectChange('timeline', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">As soon as possible</SelectItem>
                        <SelectItem value="1-2months">1-2 months</SelectItem>
                        <SelectItem value="3-6months">3-6 months</SelectItem>
                        <SelectItem value="exploring">Just exploring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Specific Goals or Questions</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="What specific outcomes are you hoping to achieve? Any particular concerns or requirements?"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </Card>
          </>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg"
            disabled={isSubmitting}
            className="px-12 h-14 text-lg font-semibold swiss-blue-gradient btn-hover-scale text-white"
          >
            {isSubmitting ? (
              <>Processing...</>
            ) : serviceType === 'research' ? (
              <>
                <Calendar className="w-5 h-5 mr-2" />
                Book Discovery Call
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Request
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

