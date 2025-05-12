import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function BecomeCspPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Become a CSP Agent | Fia Global Bank Correspondent System</title>
        <meta name="description" content="Join our network of trusted banking correspondents and help bring financial services to underserved communities." />
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
            <Link href="/become-csp" className="text-primary font-medium">Become a CSP</Link>
            <Link href="/csr-impact" className="text-gray-700 hover:text-primary font-medium">CSR Impact</Link>
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
          <h1 className="text-3xl font-bold mb-6">Become a Customer Service Point Agent</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-xl text-gray-600 mb-6">
                Join our network of trusted banking correspondents and help bring essential financial services to underserved communities.
              </p>
              
              <h2 className="text-xl font-bold mb-4">Benefits of becoming a CSP Agent:</h2>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Earn commission on every transaction</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Minimal investment required to start</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Comprehensive training and ongoing support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Enhance your status in the community</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 mt-1" />
                  <span>Be part of financial inclusion efforts</span>
                </li>
              </ul>
              
              <h2 className="text-xl font-bold mb-4">Requirements:</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span>Minimum educational qualification: 10+2 pass</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span>Age: Between 21-45 years</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span>Clean credit history with no defaults</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span>Basic computer and smartphone proficiency</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-1" />
                  <span>Shop/office space in suitable location</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Application Form</h2>
              <p className="text-gray-600 mb-6">
                Fill out the application form below to start your journey as a CSP Agent. Our team will review your application and contact you within 48 hours.
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
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter your city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Educational Qualification</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Select your highest qualification</option>
                    <option value="10th">10th Pass</option>
                    <option value="12th">12th Pass</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Post Graduate</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Do you have a shop/office space?</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="has_shop" value="yes" className="mr-2" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="has_shop" value="no" className="mr-2" />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Additional Comments</label>
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Tell us about yourself and why you want to become a CSP Agent"
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">Submit Application</Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  By submitting this form, you agree to our terms and conditions and consent to our privacy policy.
                </p>
              </form>
            </div>
          </div>
          
          <div className="bg-primary/5 rounded-lg p-6 mb-12">
            <h2 className="text-xl font-bold mb-4">How the Application Process Works</h2>
            <ol className="space-y-4">
              <li className="flex">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium">Submit Application</h3>
                  <p className="text-gray-600">Fill out the online application form with your details.</p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium">Initial Screening</h3>
                  <p className="text-gray-600">Our team reviews your application and may contact you for additional information.</p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium">Background Verification</h3>
                  <p className="text-gray-600">We verify your documents and background to ensure eligibility.</p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium">Training</h3>
                  <p className="text-gray-600">Successful applicants receive comprehensive training on services and systems.</p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">5</div>
                <div>
                  <h3 className="font-medium">Setup and Certification</h3>
                  <p className="text-gray-600">We help you set up your CSP point and certify you as an official agent.</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
            <p className="mb-6">Contact our recruitment team for more information about becoming a CSP Agent.</p>
            <Link href="/support">
              <Button variant="outline">Contact Us</Button>
            </Link>
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