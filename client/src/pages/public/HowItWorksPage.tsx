import React from 'react';
import { Link } from 'wouter';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Fingerprint, UserCheck, BarChart4 } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <PublicLayout
      title="How It Works | Fia Global - Banking Correspondent System"
      description="Learn how Fia Global's banking correspondent system works to provide financial services securely in remote areas."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How Fia Global Works</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
            Our banking correspondent system bridges the gap between traditional banks and underserved communities by leveraging technology and a network of trusted agents.
          </p>
        </div>
      </section>

      {/* CSP Model Explanation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The CSP Model</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Customer Service Points (CSPs) are authorized representatives who provide banking services in locations where traditional bank branches are unavailable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">Who are CSPs?</h3>
                <p className="text-gray-700 mb-4">
                  CSPs are local entrepreneurs who undergo thorough verification and training to become banking correspondents. They could be shop owners, small business operators, or community leaders with good standing in their locality.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Thoroughly vetted local residents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Trained in banking operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Equipped with biometric devices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Background verified by banks</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Services Offered</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Cash deposits and withdrawals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Fund transfers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Bill and utility payments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Government benefit disbursements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Account opening assistance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Micro-insurance enrollment</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://placehold.co/600x400/e2e8f0/475569?text=CSP+Model+Diagram" 
                alt="CSP Model Diagram" 
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-3">How Money Flows</h3>
                <ol className="space-y-3">
                  <li className="flex">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">1</span>
                    <p>Customer approaches CSP for banking transaction</p>
                  </li>
                  <li className="flex">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">2</span>
                    <p>CSP verifies customer identity using biometric authentication</p>
                  </li>
                  <li className="flex">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">3</span>
                    <p>Transaction is processed through Fia Global's secure platform</p>
                  </li>
                  <li className="flex">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">4</span>
                    <p>Bank confirms and processes the transaction</p>
                  </li>
                  <li className="flex">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">5</span>
                    <p>Customer receives confirmation and receipt</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fraud Protection Demo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industry-Leading Fraud Protection</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our multi-layered security system ensures that every transaction is secure, authenticated, and traceable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Fingerprint className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Biometric Authentication</h3>
              <p className="text-gray-600">
                Every transaction requires biometric verification through fingerprint or face recognition, ensuring only the account holder can access funds.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ShieldCheck className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">
                Our system monitors transactions in real-time, flagging and preventing suspicious activities before they complete.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <UserCheck className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Agent Verification</h3>
              <p className="text-gray-600">
                All CSP agents undergo thorough background checks, training, and are monitored through regular audits and mystery shopping.
              </p>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg overflow-hidden">
            <h3 className="text-2xl font-bold mb-6 text-center">Security Demo</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center p-10">
                <BarChart4 size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Fraud Protection Interactive Demo</p>
                <p className="text-sm text-gray-400 mt-2">See how our system detects and prevents unauthorized transactions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">From Our Partners</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear what banks, CSP agents, and customers have to say about working with Fia Global.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Rajesh Mehta</h4>
                  <p className="text-sm text-gray-500">CSP Agent, Jharkhand</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Becoming a CSP has transformed my small shop into a vital service center for my village. People no longer have to travel 30km to access banking."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Sunita Patel</h4>
                  <p className="text-sm text-gray-500">Customer, Madhya Pradesh</p>
                </div>
              </div>
              <p className="text-gray-700">
                "I receive my pension directly through the CSP in our village. The biometric verification makes me feel secure that no one else can access my money."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Prakash Sharma</h4>
                  <p className="text-sm text-gray-500">Bank Manager, SBI</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Fia Global's network has helped us extend our services to remote areas without the cost of setting up branches. Their security protocols meet all our requirements."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bring Banking Services to Your Community</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our network of 250,000+ CSP agents and help provide essential financial services while earning a steady income.
          </p>
          <Link href="/become-csp">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Apply to Become a CSP
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HowItWorksPage;