import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Users, Heart, LineChart, Globe, 
  School, Medal, Shield, MapPin 
} from 'lucide-react';

const CsrImpactPage = () => {
  return (
    <PublicLayout
      title="CSR Impact | Fia Global - Banking Correspondent System"
      description="Discover how Fia Global's CSR initiatives are creating positive social impact through financial inclusion, education, and support programs."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Social Impact</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            At Fia Global, we believe in creating positive change through financial inclusion and community empowerment.
          </p>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Financial Inclusion Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our banking correspondent network has helped bring financial services to previously underbanked and unbanked populations across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-primary" size={32} />
                  </div>
                  <h3 className="text-4xl font-bold mb-2">25M+</h3>
                  <p className="text-gray-600">Previously Unbanked People Now Banked</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="text-primary" size={32} />
                  </div>
                  <h3 className="text-4xl font-bold mb-2">650+</h3>
                  <p className="text-gray-600">Districts With Banking Access</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LineChart className="text-primary" size={32} />
                  </div>
                  <h3 className="text-4xl font-bold mb-2">₹18K Cr</h3>
                  <p className="text-gray-600">Govt Benefits Disbursed Yearly</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-primary" size={32} />
                  </div>
                  <h3 className="text-4xl font-bold mb-2">250K+</h3>
                  <p className="text-gray-600">CSP Livelihoods Created</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SDG Goals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sustainable Development Goals</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our initiatives are aligned with the United Nations Sustainable Development Goals to create meaningful and lasting impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-md mr-4">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">SDG 1: No Poverty</h3>
                    <p className="text-gray-600 text-sm">
                      Providing financial services to help lift people out of poverty
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Financial Inclusion Index</span>
                      <span className="font-bold">76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Poverty Reduction Impact</span>
                      <span className="font-bold">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-3">
                    Over 15 million families have risen above the poverty line through improved financial access and services.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-orange-100 p-3 rounded-md mr-4">
                    <Medal className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">SDG 8: Decent Work</h3>
                    <p className="text-gray-600 text-sm">
                      Creating sustainable livelihoods through our CSP network
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Employment Generation</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Income Stability</span>
                      <span className="font-bold">84%</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-3">
                    Our CSP network has created 250,000+ direct jobs and supported approximately 1 million indirect livelihoods.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-3 rounded-md mr-4">
                    <School className="text-green-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">SDG 4: Quality Education</h3>
                    <p className="text-gray-600 text-sm">
                      Supporting education through financial literacy programs
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Financial Literacy Sessions</span>
                      <span className="font-bold">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Rural School Reach</span>
                      <span className="font-bold">73%</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-3">
                    Conducted over 50,000 financial literacy camps reaching more than 2 million students and adults.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Army Family Support */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Army Family Support Program</h2>
              <p className="text-lg text-gray-600 mb-6">
                We've established a dedicated program to ensure that families of army personnel have reliable access to banking services and financial support, especially in border and remote areas.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 shrink-0">
                    <Shield className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Zero-Fee Banking</h3>
                    <p className="text-gray-600">
                      Special zero-fee banking services for immediate family members of armed forces personnel.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 shrink-0">
                    <Users className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Priority CSP Service</h3>
                    <p className="text-gray-600">
                      Dedicated CSP agents in cantonment areas and military stations for prompt service.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 shrink-0">
                    <Heart className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Family Support Fund</h3>
                    <p className="text-gray-600">
                      Emergency financial assistance for families of martyred soldiers through our CSP network.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div>
                  <h4 className="text-4xl font-bold text-primary">15,000+</h4>
                  <p className="text-gray-600">Families Supported</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-primary">₹35 Cr</h4>
                  <p className="text-gray-600">Financial Assistance</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-primary">120+</h4>
                  <p className="text-gray-600">Military Stations</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gray-100 rounded-lg p-6 relative">
                <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-gray-400" size={64} />
                </div>
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-full">
                  Impact Program
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-2">Army Family Support</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Serving those who serve our nation
                  </p>
                  <Button className="bg-primary text-white">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* War Zone Service Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Operation Critical Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our dedicated CSPs continue to operate in challenging regions, ensuring financial services remain accessible even in conflict-affected areas.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
                <MapPin size={48} className="text-gray-400" />
              </div>
              
              <h3 className="text-xl font-bold mb-4">Critical Service Areas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-2">Northern Border Regions</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Jammu & Kashmir: 45 CSPs</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Ladakh: 28 CSPs</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Himachal Border: 34 CSPs</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Uttarakhand Border: 31 CSPs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-2">North-Eastern Regions</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Arunachal Pradesh: 38 CSPs</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Nagaland: 32 CSPs</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Manipur: 35 CSPs</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Mizoram: 25 CSPs</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-bold mb-2">Other Critical Zones</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        <span>LWE* Affected Areas: 120 CSPs</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Flood-Prone Zones: 85 CSPs</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Disaster-Prone Areas: 78 CSPs</span>
                      </li>
                      <li className="flex items-center text-xs text-gray-500 mt-2">
                        <span>*Left Wing Extremism</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                    <span>Fully Operational</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                    <span>Partially Operational</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                    <span>Temporarily Suspended</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Impact Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories of how our financial inclusion efforts have transformed lives and communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                <h3 className="text-xl font-bold mb-2">Lakshmi's Journey</h3>
                <p className="text-gray-600 mb-4">
                  "I was a housewife in a remote village of Odisha with no financial independence. Becoming a CSP changed everything - I now run my own banking point and earn ₹25,000 monthly while helping my community access banking."
                </p>
                <p className="text-sm text-gray-500">Lakshmi Devi, CSP Agent, Odisha</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                <h3 className="text-xl font-bold mb-2">The Village Transformation</h3>
                <p className="text-gray-600 mb-4">
                  "Our village was completely unbanked until 3 years ago. Now with a CSP, farmers receive direct subsidies, women have savings accounts, and the local economy has flourished with easy access to banking."
                </p>
                <p className="text-sm text-gray-500">Rajendra Singh, Village Head, Rajasthan</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                <h3 className="text-xl font-bold mb-2">Serving at the Borders</h3>
                <p className="text-gray-600 mb-4">
                  "As a CSP in Tawang, I serve army families and locals in this remote border area. Despite challenging conditions, we ensure that families receive pensions and benefits without traveling 80km to the nearest bank."
                </p>
                <p className="text-sm text-gray-500">Tenzin Norbu, CSP Agent, Arunachal Pradesh</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-10">
            <Button className="bg-primary text-white">
              Read More Stories
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default CsrImpactPage;