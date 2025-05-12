import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Mail, Phone, MessageSquare, Clock, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Support | Fia Global Bank Correspondent System</title>
        <meta name="description" content="Get help with the Fia Global Bank Correspondent System. Contact our customer support team for assistance with transactions, account issues, or general inquiries." />
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
            <Link href="/csr-impact" className="text-gray-700 hover:text-primary font-medium">CSR Impact</Link>
            <Link href="/support" className="text-primary font-medium">Support</Link>
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
          <h1 className="text-3xl font-bold mb-6">Support & Help Center</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-xl text-gray-600 mb-6">
                We're here to help you with any questions or issues you may have with the Fia Global Bank Correspondent System.
              </p>
              
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-gray-600">support@fiaglobalbank.com</p>
                    <p className="text-sm text-gray-500">For general inquiries and non-urgent issues</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <p className="text-gray-600">+91-800-123-4567</p>
                    <p className="text-sm text-gray-500">Available 24/7 for urgent issues</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Chat Support</h3>
                    <p className="text-gray-600">Available in your account dashboard</p>
                    <p className="text-sm text-gray-500">Instant help from our support agents</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Support Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Head Office</h3>
                    <p className="text-gray-600">123 Finance Street, Sector 5</p>
                    <p className="text-gray-600">New Delhi, India 110001</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Emergency Support</h3>
                <p className="text-gray-600 text-sm mb-2">
                  For transaction-related emergencies, account freezing, or suspected fraud:
                </p>
                <p className="text-primary font-medium">+91-800-999-8888</p>
                <p className="text-xs text-gray-500">Available 24/7</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Contact Form</h2>
              <p className="text-gray-600 mb-6">
                Fill out this form with your query, and our support team will get back to you within 24 hours.
              </p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select a subject</option>
                    <option value="account">Account Issues</option>
                    <option value="transactions">Transaction Problems</option>
                    <option value="csp">CSP Agent Inquiries</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={5}
                    placeholder="Please describe your issue or question in detail"
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">Submit Request</Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  By submitting this form, you agree to our terms and conditions and consent to our privacy policy.
                </p>
              </form>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
            <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg">What is a CSP Agent?</h3>
                <p className="text-gray-600">
                  A Customer Service Point (CSP) Agent is an authorized representative of Fia Global Bank who provides banking services in areas where traditional banking infrastructure is limited.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">How do I find my nearest CSP Agent?</h3>
                <p className="text-gray-600">
                  You can locate your nearest CSP Agent through the 'Find CSP' feature in your customer account dashboard or by contacting our support center.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">What services can I access through a CSP Agent?</h3>
                <p className="text-gray-600">
                  CSP Agents offer various services including account opening, cash deposits and withdrawals, bill payments, government benefit transfers, remittances, and more.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">Is it safe to transact through a CSP Agent?</h3>
                <p className="text-gray-600">
                  Yes, all transactions through CSP Agents are secure and verified through multiple authentication methods including biometric verification and OTP validation.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">What should I do if a transaction fails?</h3>
                <p className="text-gray-600">
                  If a transaction fails, please contact our support center immediately with the transaction reference number for assistance.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">How can I apply to become a CSP Agent?</h3>
                <p className="text-gray-600">
                  You can apply to become a CSP Agent through our <Link href="/become-csp" className="text-primary hover:underline">Become a CSP</Link> page or by contacting our recruitment team.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg">What happens if I have a complaint about a CSP Agent?</h3>
                <p className="text-gray-600">
                  If you have a complaint about a CSP Agent, please submit it through your customer account or contact our support center directly. All complaints are investigated thoroughly.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="mb-6">Our team is ready to assist you with any questions or concerns you may have.</p>
            <div className="flex justify-center space-x-4">
              <Link href="/auth">
                <Button>Login for Support</Button>
              </Link>
              <Link href="/auth?tab=register">
                <Button variant="outline">Create Account</Button>
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