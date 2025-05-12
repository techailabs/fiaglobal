import React from 'react';
import { Link } from 'wouter';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const PublicFooter = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fia Global</h3>
            <p className="text-gray-400 mb-4">
              Empowering communities through inclusive banking services,
              bringing financial access to every corner.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <a className="text-gray-400 hover:text-white transition-colors">How It Works</a>
                </Link>
              </li>
              <li>
                <Link href="/become-csp">
                  <a className="text-gray-400 hover:text-white transition-colors">Become a CSP</a>
                </Link>
              </li>
              <li>
                <Link href="/support">
                  <a className="text-gray-400 hover:text-white transition-colors">Support</a>
                </Link>
              </li>
              <li>
                <Link href="/csr-impact">
                  <a className="text-gray-400 hover:text-white transition-colors">CSR Impact</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  CSP Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Verification Process
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Banking Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Commission Structure
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="shrink-0 text-gray-400 mt-1" size={18} />
                <span className="text-gray-400">
                  Head Office, Fia Global Tower, Sector 5, Noida, UP, India - 201301
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="shrink-0 text-gray-400" size={18} />
                <a href="tel:+911800123456789" className="text-gray-400 hover:text-white transition-colors">
                  1800-123-456-789 (Toll Free)
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="shrink-0 text-gray-400" size={18} />
                <a href="mailto:info@fiaglobal.com" className="text-gray-400 hover:text-white transition-colors">
                  info@fiaglobal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Fia Global. All rights reserved.
            </p>
            <ul className="flex flex-wrap space-x-4 mt-4 md:mt-0">
              <li>
                <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;