import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>How It Works | Fia Global Bank Correspondent System</title>
        <meta name="description" content="Learn how the Fia Global Bank Correspondent System bridges the gap between rural communities and financial services through our network of trusted agents." />
      </Helmet>
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer">Fia Global Bank</h1>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
            <Link href="/how-it-works" className="text-primary font-medium">How It Works</Link>
            <Link href="/become-csp" className="text-gray-700 hover:text-primary font-medium">Become a CSP</Link>
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
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6">How the Fia Global Bank Correspondent System Works</h1>
          
          <div className="prose max-w-none">
            <p className="lead text-xl text-gray-600 mb-8">
              Our Banking Correspondent System is designed to bring essential financial services to underserved and rural communities through a network of trusted agents.
            </p>
            
            <h2>The Banking Correspondent Model</h2>
            <p>
              Banking Correspondents (CSP Agents) act as representatives of Fia Global Bank in areas where traditional banking infrastructure is limited. These agents are equipped with the necessary tools and technology to provide a range of financial services to local communities.
            </p>
            
            <h2>Services We Offer</h2>
            <ul>
              <li><strong>Account Opening:</strong> CSP agents can help customers open bank accounts without visiting a branch.</li>
              <li><strong>Cash Deposits and Withdrawals:</strong> Customers can deposit or withdraw cash through their local CSP agent.</li>
              <li><strong>Bill Payments:</strong> Pay utility bills, mobile recharges, and other services.</li>
              <li><strong>Government Benefit Transfers:</strong> Receive government subsidies and benefits directly.</li>
              <li><strong>Remittances:</strong> Send and receive money domestically.</li>
              <li><strong>Balance Inquiry:</strong> Check account balances and request mini-statements.</li>
              <li><strong>Small Loans:</strong> Apply for microloans and other financial products.</li>
            </ul>
            
            <h2>Security and Verification</h2>
            <p>
              Our system uses multiple layers of security to ensure safe transactions:
            </p>
            <ul>
              <li><strong>Biometric Authentication:</strong> Using Aadhaar-enabled payment system to verify identity.</li>
              <li><strong>Face Recognition:</strong> Additional verification through facial recognition technology.</li>
              <li><strong>OTP Verification:</strong> One-time passwords sent to registered mobile numbers.</li>
              <li><strong>Transaction Receipts:</strong> Digital and physical receipts for all transactions.</li>
              <li><strong>Audit Trails:</strong> Complete record of all transactions for transparency.</li>
            </ul>
            
            <h2>Offline Capabilities</h2>
            <p>
              We understand that connectivity can be a challenge in rural areas. Our system is designed to work even in low-connectivity environments:
            </p>
            <ul>
              <li>Transactions can be processed offline and synchronized when connectivity is restored.</li>
              <li>Essential services remain available even during network outages.</li>
              <li>Secure encryption ensures data integrity during synchronization.</li>
            </ul>
            
            <h2>Quality Assurance</h2>
            <p>
              To maintain the highest standards of service:
            </p>
            <ul>
              <li>Regular audits of CSP agents by bank officers and independent auditors.</li>
              <li>Customer feedback mechanisms to continuously improve service quality.</li>
              <li>Ongoing training and certification for all CSP agents.</li>
              <li>Compliance with regulatory requirements and banking standards.</li>
            </ul>
            
            <h2>Getting Started</h2>
            <p>
              To access services through the Fia Global Bank Correspondent System:
            </p>
            <ol>
              <li>Register for an account on our platform.</li>
              <li>Visit your nearest CSP agent with valid ID proof.</li>
              <li>Complete the verification process.</li>
              <li>Start using the full range of banking services immediately.</li>
            </ol>
            
            <div className="mt-8 p-4 bg-primary/10 rounded-lg">
              <h3 className="text-primary font-bold">Ready to get started?</h3>
              <p>
                <Link href="/auth?tab=register" className="text-primary hover:underline">Register now</Link> to create your account, or <Link href="/support" className="text-primary hover:underline">contact us</Link> if you have any questions.
              </p>
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