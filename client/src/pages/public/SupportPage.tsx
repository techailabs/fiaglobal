import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Phone, Mail, MapPin, MessageCircle, 
  HelpCircle, AlertCircle, BookOpen, Clock
} from 'lucide-react';

const SupportPage = () => {
  return (
    <PublicLayout
      title="Support & Helpline | Fia Global - Banking Correspondent System"
      description="Get in touch with Fia Global's support team for assistance with banking services, CSP operations, or general inquiries."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support & Helpline</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            We're here to help you with any questions or concerns about our banking correspondent services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:+18001234567" 
              className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium flex items-center"
            >
              <Phone className="mr-2" size={20} />
              <span>1800-123-4567 (Toll Free)</span>
            </a>
            <a 
              href="https://wa.me/919876543210"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium flex items-center"
            >
              <MessageCircle className="mr-2" size={20} />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">How Can We Help You?</h2>
          
          <Tabs defaultValue="contact">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            {/* Contact Us Tab */}
            <TabsContent value="contact" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                      
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <Phone className="text-primary mr-4 shrink-0" size={24} />
                          <div>
                            <p className="font-bold mb-1">Call Us</p>
                            <p className="text-gray-600 mb-1">
                              <a href="tel:+18001234567" className="hover:text-primary">
                                1800-123-4567 (Toll Free)
                              </a>
                            </p>
                            <p className="text-sm text-gray-500">
                              Monday-Saturday: 8am - 8pm
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MessageCircle className="text-green-600 mr-4 shrink-0" size={24} />
                          <div>
                            <p className="font-bold mb-1">WhatsApp Support</p>
                            <p className="text-gray-600 mb-1">
                              <a href="https://wa.me/919876543210" className="hover:text-green-600">
                                +91 98765-43210
                              </a>
                            </p>
                            <p className="text-sm text-gray-500">
                              24/7 Chat Support
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Mail className="text-primary mr-4 shrink-0" size={24} />
                          <div>
                            <p className="font-bold mb-1">Email Us</p>
                            <p className="text-gray-600">
                              <a href="mailto:support@fiaglobal.com" className="hover:text-primary">
                                support@fiaglobal.com
                              </a>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="text-primary mr-4 shrink-0" size={24} />
                          <div>
                            <p className="font-bold mb-1">Head Office</p>
                            <p className="text-gray-600">
                              Fia Global Tower, <br />
                              Sector 5, Noida, <br />
                              Uttar Pradesh, India - 201301
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
                      
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Your name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" placeholder="Your phone number" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="inquiry-type">Type of Inquiry</Label>
                            <select 
                              id="inquiry-type" 
                              className="w-full p-2 border border-gray-300 rounded-md"
                              required
                            >
                              <option value="">Select inquiry type</option>
                              <option value="general">General Information</option>
                              <option value="csp">CSP Application</option>
                              <option value="transaction">Transaction Issue</option>
                              <option value="technical">Technical Support</option>
                              <option value="complaint">File a Complaint</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            placeholder="Please describe your inquiry in detail..." 
                            rows={5}
                            required
                          />
                        </div>
                        
                        <Button type="submit" className="bg-primary text-white">
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* FAQs Tab */}
            <TabsContent value="faqs" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-lg mb-4">For Customers</h4>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>What services can I access at a CSP?</AccordionTrigger>
                          <AccordionContent>
                            At a CSP, you can access various banking services including cash deposits, withdrawals, fund transfers, bill payments, account opening, and government benefit withdrawals. All transactions are secure with biometric verification.
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-2">
                          <AccordionTrigger>How do I find the nearest CSP?</AccordionTrigger>
                          <AccordionContent>
                            You can find the nearest CSP by using our "Locate CSP" feature on the website or by calling our toll-free number. We have CSPs in most villages and urban neighborhoods across India.
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Are transactions at CSPs secure?</AccordionTrigger>
                          <AccordionContent>
                            Yes, all transactions at CSPs are secured with biometric verification (fingerprint/Aadhaar authentication). Each transaction is recorded digitally and you receive an instant confirmation receipt.
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-4">
                          <AccordionTrigger>What documents do I need to bring?</AccordionTrigger>
                          <AccordionContent>
                            For most services, you need your Aadhaar card for biometric verification. For account opening, you need Aadhaar, PAN card, and address proof. For specific services, the CSP will guide you on additional documentation.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-4">For CSP Agents</h4>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-5">
                          <AccordionTrigger>How do I become a CSP?</AccordionTrigger>
                          <AccordionContent>
                            To become a CSP, apply through our website's "Become a CSP" section. You need to meet eligibility criteria, provide documentation, and undergo verification. After approval, we'll provide training and equipment.
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-6">
                          <AccordionTrigger>What is the commission structure?</AccordionTrigger>
                          <AccordionContent>
                            CSPs earn commission on each transaction. The commission varies by transaction type - ranging from ₹10-50 for bill payments to 0.2-0.5% for cash transactions. CSPs typically earn ₹15,000-₹50,000 monthly based on location and transaction volume.
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-7">
                          <AccordionTrigger>What technical support is available?</AccordionTrigger>
                          <AccordionContent>
                            We provide 24/7 technical support through our helpline and WhatsApp. Each CSP is assigned a relationship manager to address issues and conduct regular training updates.
                          </AccordionContent>
                        </AccordionItem>
                        
                        <AccordionItem value="item-8">
                          <AccordionTrigger>How are disputes resolved?</AccordionTrigger>
                          <AccordionContent>
                            For transaction disputes, the CSP should first check transaction logs in the portal. If unresolved, report through the portal's dispute section or call the helpline. Resolution typically takes 3-7 business days.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-6">Helpful Resources</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <a href="#" className="block group">
                      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-video flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <BookOpen className="text-primary" size={48} />
                      </div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Customer Guide</h4>
                      <p className="text-gray-600 text-sm">Learn how to use CSP services effectively and securely.</p>
                    </a>
                    
                    <a href="#" className="block group">
                      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-video flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <HelpCircle className="text-primary" size={48} />
                      </div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">CSP Training Manual</h4>
                      <p className="text-gray-600 text-sm">Comprehensive guide for CSP operations and troubleshooting.</p>
                    </a>
                    
                    <a href="#" className="block group">
                      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-video flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <AlertCircle className="text-primary" size={48} />
                      </div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Security Guidelines</h4>
                      <p className="text-gray-600 text-sm">Best practices for secure banking at CSP points.</p>
                    </a>
                    
                    <a href="#" className="block group">
                      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-video flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <Clock className="text-primary" size={48} />
                      </div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Service Timelines</h4>
                      <p className="text-gray-600 text-sm">Expected processing times for different transactions.</p>
                    </a>
                    
                    <a href="#" className="block group">
                      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-video flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <MapPin className="text-primary" size={48} />
                      </div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">CSP Locator Guide</h4>
                      <p className="text-gray-600 text-sm">How to find the nearest CSP in your area.</p>
                    </a>
                    
                    <a href="#" className="block group">
                      <div className="bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-video flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <Phone className="text-primary" size={48} />
                      </div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">Escalation Matrix</h4>
                      <p className="text-gray-600 text-sm">Who to contact for different types of issues.</p>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Support Centers Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Support Centers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center">
            Visit our regional support centers for in-person assistance with banking services or CSP operations.
          </p>
          
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center p-10">
                <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Support Centers Map</p>
                <p className="text-sm text-gray-400 mt-2">Showing our centers across India</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div>
                <h3 className="font-bold mb-2">North Region</h3>
                <p className="text-gray-700">
                  1234, Rajendra Place<br />
                  New Delhi - 110008<br />
                  <span className="text-primary">Ph: 011-12345678</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">East Region</h3>
                <p className="text-gray-700">
                  567, Park Street<br />
                  Kolkata - 700016<br />
                  <span className="text-primary">Ph: 033-23456789</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">West Region</h3>
                <p className="text-gray-700">
                  890, Linking Road<br />
                  Mumbai - 400050<br />
                  <span className="text-primary">Ph: 022-34567890</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">South Region</h3>
                <p className="text-gray-700">
                  123, Anna Nagar<br />
                  Chennai - 600040<br />
                  <span className="text-primary">Ph: 044-45678901</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default SupportPage;