import { Link } from 'wouter';
import { Button } from '../../components/ui/button';
import { Helmet } from 'react-helmet';
import { ArrowRight, Users, Banknote, Globe, CheckCircle, ShieldCheck } from 'lucide-react';

export default function PublicHomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Fia Global Bank Correspondent System | Banking For Everyone</title>
        <meta name="description" content="Fia Global Bank Correspondent System bridges the gap between rural communities and financial services through our network of trusted agents. Join us today." />
      </Helmet>
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Fia Global Bank</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-primary font-medium">How It Works</Link>
            <Link href="/become-csp" className="text-gray-700 hover:text-primary font-medium">Become a CSP</Link>
            <Link href="/csr-impact" className="text-gray-700 hover:text-primary font-medium">CSR Impact</Link>
            <Link href="/support" className="text-gray-700 hover:text-primary font-medium">Support</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth" className="text-primary hover:underline font-medium">Login</Link>
            <Link href="/auth?tab=register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Banking for Everyone, Everywhere</h1>
              <p className="text-lg mb-8">
                Fia Global Bank Correspondent System bridges the gap between rural communities and essential financial services through our network of trusted agents.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/auth?tab=register">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded p-4 text-center">
                    <h3 className="text-3xl font-bold">5M+</h3>
                    <p>Users Served</p>
                  </div>
                  <div className="bg-white/10 rounded p-4 text-center">
                    <h3 className="text-3xl font-bold">15K+</h3>
                    <p>CSP Agents</p>
                  </div>
                  <div className="bg-white/10 rounded p-4 text-center">
                    <h3 className="text-3xl font-bold">500+</h3>
                    <p>Rural Banks</p>
                  </div>
                  <div className="bg-white/10 rounded p-4 text-center">
                    <h3 className="text-3xl font-bold">200+</h3>
                    <p>Districts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Accessible financial services for rural communities through our trusted network of correspondent agents.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Accounts</h3>
              <p className="text-gray-600 mb-4">
                Open and manage bank accounts without traveling to distant branch offices.
              </p>
              <Link href="/how-it-works" className="text-primary font-medium flex items-center hover:underline">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Banknote className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AEPS & BBPS Payments</h3>
              <p className="text-gray-600 mb-4">
                Make secure Aadhaar-enabled and bill payments through our verified CSP agents.
              </p>
              <Link href="/how-it-works" className="text-primary font-medium flex items-center hover:underline">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Direct Benefit Transfers</h3>
              <p className="text-gray-600 mb-4">
                Receive government subsidies and benefits directly through our secure network.
              </p>
              <Link href="/how-it-works" className="text-primary font-medium flex items-center hover:underline">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Fia Global Bank</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Trusted Network</h3>
                    <p className="text-gray-600">
                      Our CSP agents undergo rigorous verification and training to ensure the highest standards of service.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Secure Transactions</h3>
                    <p className="text-gray-600">
                      Advanced security measures including biometric verification and encrypted data transmission.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Offline Capability</h3>
                    <p className="text-gray-600">
                      Our system works even in areas with limited connectivity, ensuring continuous service.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">Transparent Auditing</h3>
                    <p className="text-gray-600">
                      Regular audits and compliance checks maintain the integrity of our financial network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex justify-center mb-6">
                  <ShieldCheck className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">Become a CSP Agent</h3>
                <p className="text-gray-600 text-center mb-6">
                  Join our network of trusted Banking Correspondents and help bring financial services to underserved communities.
                </p>
                <Link href="/become-csp" className="block w-full">
                  <Button className="w-full">Apply Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join millions of users accessing essential banking services through the Fia Global Bank Correspondent System.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth?tab=register">
              <Button size="lg">
                Create Account
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fia Global Bank</h3>
              <p className="text-gray-300">
                Banking for everyone, everywhere through our innovative correspondent system.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-gray-300 hover:text-white">How It Works</Link>
                </li>
                <li>
                  <Link href="/become-csp" className="text-gray-300 hover:text-white">Become a CSP</Link>
                </li>
                <li>
                  <Link href="/csr-impact" className="text-gray-300 hover:text-white">CSR Impact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/support" className="text-gray-300 hover:text-white">Help Center</Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-300 hover:text-white">Contact Us</Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-300 hover:text-white">FAQs</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/support" className="text-gray-300 hover:text-white">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-300 hover:text-white">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-300 hover:text-white">Compliance</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>© {new Date().getFullYear()} Fia Global Bank Correspondent System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}