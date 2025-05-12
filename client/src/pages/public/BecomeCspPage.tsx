import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileUpIcon, MapPin, CheckCircle2, Clock, AlertCircle,
  Camera, ShieldCheck, BadgeCheck, Landmark
} from 'lucide-react';

const BecomeCspPage = () => {
  const [applicationStatus, setApplicationStatus] = useState('not-started');
  const [activeTab, setActiveTab] = useState('requirements');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setApplicationStatus('pending');
    setActiveTab('track');
  };

  return (
    <PublicLayout
      title="Become a CSP | Fia Global - Banking Correspondent System"
      description="Apply to become a Customer Service Point (CSP) with Fia Global and bring banking services to your community."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Banking Correspondent</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Join our network of 250,000+ Customer Service Points and help bring essential banking services to your community while earning a steady income.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="requirements" value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-8">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="apply">Apply Now</TabsTrigger>
                <TabsTrigger value="track">Track Application</TabsTrigger>
              </TabsList>
            </div>

            {/* Requirements Tab */}
            <TabsContent value="requirements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Eligibility Requirements</h2>
                  
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">Basic Criteria</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle2 className="text-green-500 mr-3 mt-1 shrink-0" size={20} />
                          <span>Age 21-58 years</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="text-green-500 mr-3 mt-1 shrink-0" size={20} />
                          <span>Minimum 10th pass education (12th preferred)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="text-green-500 mr-3 mt-1 shrink-0" size={20} />
                          <span>Basic computer and smartphone knowledge</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="text-green-500 mr-3 mt-1 shrink-0" size={20} />
                          <span>Shop/office space of minimum 100 sq. ft.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="text-green-500 mr-3 mt-1 shrink-0" size={20} />
                          <span>Good reputation in the local community</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">Documentation Required</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <FileUpIcon className="text-primary mr-3 mt-1 shrink-0" size={20} />
                          <span>Proof of identity (Aadhaar, PAN Card)</span>
                        </li>
                        <li className="flex items-start">
                          <FileUpIcon className="text-primary mr-3 mt-1 shrink-0" size={20} />
                          <span>Proof of address (Aadhaar, Utility bill, etc.)</span>
                        </li>
                        <li className="flex items-start">
                          <FileUpIcon className="text-primary mr-3 mt-1 shrink-0" size={20} />
                          <span>Educational qualification certificates</span>
                        </li>
                        <li className="flex items-start">
                          <FileUpIcon className="text-primary mr-3 mt-1 shrink-0" size={20} />
                          <span>2 passport size photographs</span>
                        </li>
                        <li className="flex items-start">
                          <FileUpIcon className="text-primary mr-3 mt-1 shrink-0" size={20} />
                          <span>Shop/office ownership documents or rent agreement</span>
                        </li>
                        <li className="flex items-start">
                          <FileUpIcon className="text-primary mr-3 mt-1 shrink-0" size={20} />
                          <span>Bank account statements (last 6 months)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-6">Benefits of Becoming a CSP</h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start">
                          <div className="bg-green-100 p-3 rounded-full mr-4">
                            <Landmark className="text-green-600" size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold mb-1">Steady Income Source</h3>
                            <p className="text-gray-600">
                              Earn commission on every transaction - from ₹15,000 to ₹50,000+ monthly based on location and transaction volumes.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start">
                          <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <BadgeCheck className="text-blue-600" size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold mb-1">Enhanced Reputation</h3>
                            <p className="text-gray-600">
                              Gain prestige in your community as a banking representative and trusted financial service provider.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start">
                          <div className="bg-purple-100 p-3 rounded-full mr-4">
                            <ShieldCheck className="text-purple-600" size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold mb-1">Training & Support</h3>
                            <p className="text-gray-600">
                              Receive comprehensive training, ongoing technical support, and a dedicated relationship manager.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start">
                          <div className="bg-yellow-100 p-3 rounded-full mr-4">
                            <Camera className="text-yellow-600" size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold mb-1">Equipment Provided</h3>
                            <p className="text-gray-600">
                              Get biometric devices, micro-ATM machines, and all necessary technology to conduct banking operations.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button 
                      size="lg" 
                      className="bg-primary text-white"
                      onClick={() => setActiveTab('apply')}
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Application Form Tab */}
            <TabsContent value="apply">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">CSP Application Form</h2>
                
                {formSubmitted ? (
                  <div className="bg-green-50 p-6 rounded-lg text-center">
                    <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                    <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 mb-6">
                      Your application has been received. You can track its status using the tracking ID sent to your email and phone.
                    </p>
                    <Button 
                      className="bg-primary text-white"
                      onClick={() => setActiveTab('track')}
                    >
                      Track Your Application
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="first_name">First Name</Label>
                              <Input id="first_name" placeholder="Enter your first name" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="last_name">Last Name</Label>
                              <Input id="last_name" placeholder="Enter your last name" required />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input id="email" type="email" placeholder="you@example.com" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input id="phone" placeholder="Your 10-digit mobile number" required />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="address">Complete Address</Label>
                            <Textarea id="address" placeholder="Enter your full address" rows={3} required />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="city">City/Town/Village</Label>
                              <Input id="city" placeholder="Your city or village" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="state">State</Label>
                              <Input id="state" placeholder="Your state" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="pincode">PIN Code</Label>
                              <Input id="pincode" placeholder="6-digit PIN code" required />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="education">Highest Education</Label>
                            <select 
                              id="education" 
                              className="w-full p-2 border border-gray-300 rounded-md"
                              required
                            >
                              <option value="">Select your highest qualification</option>
                              <option value="10th">10th Pass</option>
                              <option value="12th">12th Pass</option>
                              <option value="graduate">Graduate</option>
                              <option value="postgraduate">Post Graduate</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="shop_details">Shop/Office Details</Label>
                            <Textarea 
                              id="shop_details" 
                              placeholder="Describe your shop/office (size, location, existing business if any)"
                              rows={3}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Upload KYC Documents</Label>
                            <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                              <FileUpIcon className="mx-auto text-gray-400 mb-2" size={32} />
                              <p className="text-sm text-gray-500 mb-2">
                                Upload Aadhaar Card, PAN Card, and Address Proof (ZIP file)
                              </p>
                              <input 
                                type="file" 
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4 file:rounded-md
                                file:border-0 file:text-sm file:font-medium
                                file:bg-primary file:text-white
                                hover:file:bg-primary/80"
                              />
                            </div>
                          </div>
                          
                          <div className="pt-4 text-center">
                            <Button type="submit" size="lg" className="bg-primary text-white">
                              Submit Application
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </form>
                )}
              </div>
            </TabsContent>

            {/* Application Tracking Tab */}
            <TabsContent value="track">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Track Your Application</h2>
                
                {applicationStatus === 'not-started' ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <p className="text-center text-gray-600 mb-4">
                          Enter your application ID and registered mobile number to track your CSP application status.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="application_id">Application ID</Label>
                            <Input id="application_id" placeholder="e.g. CSP-2023-12345" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tracking_phone">Registered Mobile</Label>
                            <Input id="tracking_phone" placeholder="10-digit mobile number" />
                          </div>
                        </div>
                        
                        <div className="text-center pt-4">
                          <Button className="bg-primary text-white">
                            Track Status
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <Label className="text-sm text-gray-500">Application ID</Label>
                            <p className="font-bold">CSP-2023-48752</p>
                          </div>
                          <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
                            In Progress
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Progress</span>
                            <span className="text-sm font-bold">40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                        
                        <div className="space-y-4 pt-4">
                          <div className="flex">
                            <div className="mr-4">
                              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                                <CheckCircle2 size={20} />
                              </div>
                              <div className="h-full w-0.5 bg-gray-200 mx-auto mt-2"></div>
                            </div>
                            <div className="pb-6">
                              <h3 className="font-bold">Application Received</h3>
                              <p className="text-sm text-gray-500">May 12, 2023 • 10:23 AM</p>
                              <p className="text-sm mt-1">
                                Your application has been successfully submitted and is being reviewed.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex">
                            <div className="mr-4">
                              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                                <CheckCircle2 size={20} />
                              </div>
                              <div className="h-full w-0.5 bg-gray-200 mx-auto mt-2"></div>
                            </div>
                            <div className="pb-6">
                              <h3 className="font-bold">Document Verification</h3>
                              <p className="text-sm text-gray-500">May 13, 2023 • 02:45 PM</p>
                              <p className="text-sm mt-1">
                                Your documents are being verified for authenticity and completeness.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex">
                            <div className="mr-4">
                              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                <Clock size={20} />
                              </div>
                              <div className="h-full w-0.5 bg-gray-200 mx-auto mt-2"></div>
                            </div>
                            <div className="pb-6">
                              <h3 className="font-bold">Background Check</h3>
                              <p className="text-sm text-gray-500">In Progress</p>
                              <p className="text-sm mt-1">
                                We are currently conducting a background verification.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex">
                            <div className="mr-4">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <MapPin size={20} />
                              </div>
                              <div className="h-full w-0.5 bg-gray-200 mx-auto mt-2"></div>
                            </div>
                            <div className="pb-6">
                              <h3 className="font-bold">Location Inspection</h3>
                              <p className="text-sm text-gray-500">Pending</p>
                              <p className="text-sm mt-1">
                                A representative will visit your shop/office location for inspection.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex">
                            <div className="mr-4">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <AlertCircle size={20} />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold">Final Approval</h3>
                              <p className="text-sm text-gray-500">Pending</p>
                              <p className="text-sm mt-1">
                                Final review and approval by the banking partner.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BecomeCspPage;