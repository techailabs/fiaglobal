import React from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import PublicLayout from '@/layouts/PublicLayout';
import { Button } from '@/components/ui/button';
import { 
  Users, ShieldCheck, TrendingUp, 
  Clock, MapPin, CreditCard, Zap
} from 'lucide-react';

const HomePage = () => {
  return (
    <PublicLayout
      title="Fia Global - Banking Correspondent System"
      description="Fia Global brings banking to underserved communities through our innovative correspondent banking model."
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Banking Services for <span className="text-yellow-300">Every Indian</span>
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Bringing financial access to remote and underserved communities through our nationwide network of Customer Service Points.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/become-csp">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Become a CSP
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 relative z-10">
                  <video
                    className="rounded-lg w-full h-auto shadow-xl"
                    poster="/assets/video-poster.jpg"
                    controls
                  >
                    <source src="#" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="absolute -bottom-5 -right-5 bg-yellow-500 text-black p-3 rounded-md font-bold">
                  CSP Impact Stories
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-4xl font-bold text-primary mb-2">250K+</h3>
              <p className="text-gray-600">CSP Agents</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-4xl font-bold text-primary mb-2">650+</h3>
              <p className="text-gray-600">Districts Covered</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-4xl font-bold text-primary mb-2">25M+</h3>
              <p className="text-gray-600">Customers Served</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-4xl font-bold text-primary mb-2">₹500Cr+</h3>
              <p className="text-gray-600">Daily Transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CSP Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our National Presence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fia Global's CSP network spans across India, bringing banking to the remotest villages and underserved urban areas.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center p-10">
                <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Interactive CSP Map</p>
                <p className="text-sm text-gray-400 mt-2">Showing active CSPs across India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Banking Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide a wide range of banking and financial services through our CSP network, bringing convenience to every doorstep.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CreditCard className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Cash Deposits & Withdrawals</h3>
              <p className="text-gray-600">
                Make cash deposits and withdrawals at any CSP point. Your money is secure with biometric verification.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Bill Payments</h3>
              <p className="text-gray-600">
                Pay your electricity, water, gas, mobile, and other utility bills quickly and securely.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Money Transfers</h3>
              <p className="text-gray-600">
                Send money to anyone across India instantly with minimal fees and maximum security.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <TrendingUp className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Direct Benefit Transfers</h3>
              <p className="text-gray-600">
                Receive government subsidies and benefits directly through your bank account.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ShieldCheck className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Micro Insurance</h3>
              <p className="text-gray-600">
                Access affordable insurance products designed for your protection and security.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Account Opening</h3>
              <p className="text-gray-600">
                Open a new bank account easily with minimal documentation and formalities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Banking Revolution?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Become a Customer Service Point (CSP) and help bring banking to your community while earning a steady income.
          </p>
          <Link href="/become-csp">
            <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
              Apply to Become a CSP
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;