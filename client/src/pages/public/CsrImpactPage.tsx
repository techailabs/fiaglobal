import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Heart, Users, Home, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function CsrImpactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>CSR Impact | Fia Global Bank Correspondent System</title>
        <meta name="description" content="Learn about the social impact of Fia Global Bank's financial inclusion initiatives through our Correspondent Banking System." />
      </Helmet>
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer">Fia Global Bank</h1>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-primary font-medium">How It Works</Link>
            <Link href="/become-csp" className="text-gray-700 hover:text-primary font-medium">Become a CSP</Link>
            <Link href="/csr-impact" className="text-primary font-medium">CSR Impact</Link>
            <Link href="/support" className="text-gray-700 hover:text-primary font-medium">Support</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth" className="text-primary hover:underline font-medium">Login</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Our Social Impact</h1>
          
          <div className="prose max-w-none mb-12">
            <p className="text-xl text-gray-600 mb-8">
              At Fia Global Bank, we believe that financial inclusion is a powerful tool for social change and economic development. Our Correspondent System is designed not just as a banking service, but as a catalyst for community empowerment.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Bridging the Financial Divide</h2>
            <p className="mb-6">
              In many rural and underserved areas, access to basic banking services remains a significant challenge. Physical bank branches are often located far from these communities, making simple financial transactions time-consuming and expensive for residents.
            </p>
            <p className="mb-6">
              Our network of Customer Service Point (CSP) Agents brings essential banking services directly to these communities, eliminating the need for long journeys and ensuring that everyone has equal access to financial services regardless of their location.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">5M+</h3>
                </div>
                <p className="text-gray-600">People gained access to banking services through our CSP network</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">500+</h3>
                </div>
                <p className="text-gray-600">Remote villages now have access to formal banking services</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Creating Economic Opportunities</h2>
            <p className="mb-6">
              Our CSP model doesn't just provide banking services—it creates entrepreneurship opportunities for local residents who serve as agents. These CSP Agents earn commissions for every transaction, creating sustainable livelihoods while serving their communities.
            </p>
            <p className="mb-6">
              Additionally, increased access to banking services enables local businesses to grow, facilitates easier payments for goods and services, and helps individuals build credit histories that can open doors to other financial opportunities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">15,000+</h3>
                </div>
                <p className="text-gray-600">CSP Agents earning sustainable incomes while serving their communities</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">₹500 Crore+</h3>
                </div>
                <p className="text-gray-600">Disbursed in government benefits directly to beneficiaries</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Enabling Government Benefit Distribution</h2>
            <p className="mb-6">
              Our CSP network plays a crucial role in ensuring that government subsidies and benefits reach their intended recipients efficiently and transparently. Through Direct Benefit Transfers (DBT), citizens can receive their entitlements without delays or leakages.
            </p>
            <p className="mb-6">
              From pension payments to scholarship disbursements and agricultural subsidies, our platform ensures that welfare programs achieve their intended social impact by reaching the right beneficiaries at the right time.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Financial Literacy Initiatives</h2>
            <p className="mb-6">
              We believe that true financial inclusion goes beyond providing access to banking services—it requires empowering individuals with the knowledge to make informed financial decisions. Our CSP Agents are trained not just to process transactions but also to educate community members about basic financial concepts.
            </p>
            <p className="mb-6">
              Through workshops, informational materials, and one-on-one guidance, we're building financial literacy in underserved communities and helping individuals develop healthy financial habits.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 my-12">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">2,000+</h3>
              </div>
              <p className="text-gray-600">Financial literacy workshops conducted across rural communities</p>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Environmental Responsibility</h2>
            <p className="mb-6">
              Our digital-first approach to banking significantly reduces the need for paper documentation and physical travel, contributing to environmental conservation. By enabling transactions through digital channels and local CSP Agents, we're helping reduce the carbon footprint associated with traditional banking.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Social Impact Reports</h2>
            <p className="mb-6">
              We're committed to measuring and reporting on the social impact of our initiatives. Our annual impact reports provide transparent insights into how our correspondent banking system is affecting lives and communities.
            </p>
            
            <div className="bg-primary/5 p-6 rounded-lg my-8">
              <h3 className="text-xl font-bold mb-4">Download Our Impact Reports</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Annual Impact Report 2024</span>
                  <Button variant="outline" size="sm">Download PDF</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Annual Impact Report 2023</span>
                  <Button variant="outline" size="sm">Download PDF</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Annual Impact Report 2022</span>
                  <Button variant="outline" size="sm">Download PDF</Button>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
            <p className="mb-6">
              Whether you're interested in becoming a CSP Agent, opening an account with Fia Global Bank, or simply learning more about our approach to financial inclusion, we invite you to join our mission of building more inclusive and economically vibrant communities.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/become-csp">
                <Button className="flex items-center">
                  Become a CSP Agent
                </Button>
              </Link>
              <Link href="/auth?tab=register">
                <Button variant="outline" className="flex items-center">
                  Open an Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Fia Global Bank Correspondent System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}