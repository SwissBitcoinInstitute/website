"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function WebinarPage() {
  const { toast } = useToast();
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    timeSlot: '12:45'
  });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    // Here you would typically send the form data to your backend
    toast({
      title: "Registration successful!",
      description: `You've been registered for the webinar on 21 Jan 2026 at ${registerData.timeSlot}. Check your email for confirmation.`,
    });
    setRegisterData({ name: '', email: '', timeSlot: '12:45' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="swiss-hero swiss-gradient relative overflow-hidden">
        <div className="absolute inset-0 swiss-blue-gradient-hero"></div>
        <div className="swiss-grid relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-8 text-gray-900">Bitcoin in 21 Minutes</h1>
            <p className="swiss-prose-lg mb-12 max-w-3xl mx-auto text-gray-700 leading-relaxed">
              One strategic insight – clear enough to help you decide whether Bitcoin matters for your job. 
              In 21 minutes, an expert explains one non-technical Bitcoin topic with strategic relevance 
              for business and society – grounded, accessible, and anti-hype.
            </p>
          </div>
        </div>
      </section>

      {/* Webinar Details */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
                <div className="font-semibold text-gray-900 mb-2">Format</div>
                <div className="text-gray-600 swiss-prose">Live webinar + Q&A (if applicable)</div>
              </div>
              <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-8">
                <div className="font-semibold text-gray-900 mb-2">Duration</div>
                <div className="text-gray-600 swiss-prose">21 minutes</div>
              </div>
              <div className="text-center md:text-left">
                <div className="font-semibold text-gray-900 mb-2">Level</div>
                <div className="text-gray-600 swiss-prose">Beginner (no prior knowledge)</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Who it's for</h2>
                <ul className="space-y-3 text-gray-600 swiss-prose">
                  <li>• Finance & Banking</li>
                  <li>• Energy & Utilities</li>
                  <li>• Government & Administration</li>
                  <li>• International Organisations</li>
                  <li>• Civil Society / NGOs</li>
                  <li>• Anyone who needs to form a professional view on Bitcoin</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">What you'll get</h2>
                <ul className="space-y-3 text-gray-600 swiss-prose">
                  <li>• One strategic Bitcoin topic explained in-depth (not "Bitcoin 101", not trading)</li>
                  <li>• Clear relevance to one current event</li>
                  <li>• A simple mental model of the broader Bitcoin landscape</li>
                  <li>• Better questions to ask internally – before spending time or money</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="swiss-section bg-white">
        <div className="swiss-grid">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Register for the next (free) Webinar
              </h3>
              
              <form onSubmit={handleRegister} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">
                    Contact Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="registerName">Full Name *</Label>
                      <Input
                        id="registerName"
                        type="text"
                        name="name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        required
                        placeholder="John Smith"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="registerEmail">Email Address *</Label>
                      <Input
                        id="registerEmail"
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                        placeholder="john@company.com"
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-6">
                    21 Jan 2026
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRegisterData({ ...registerData, timeSlot: '12:45' })}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        registerData.timeSlot === '12:45'
                          ? 'border-swiss-blue bg-swiss-blue/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`text-2xl font-semibold ${
                        registerData.timeSlot === '12:45' 
                          ? 'swiss-blue-gradient-text' 
                          : 'text-gray-900'
                      }`}>
                        12:45h
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Afternoon session</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegisterData({ ...registerData, timeSlot: '18:30' })}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        registerData.timeSlot === '18:30'
                          ? 'border-swiss-blue bg-swiss-blue/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`text-2xl font-semibold ${
                        registerData.timeSlot === '18:30' 
                          ? 'swiss-blue-gradient-text' 
                          : 'text-gray-900'
                      }`}>
                        18:30h
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Evening session</div>
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold swiss-blue-gradient btn-hover-scale text-white"
                >
                  Register
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
