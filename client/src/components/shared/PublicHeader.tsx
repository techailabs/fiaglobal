import React, { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';

const PublicHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <span className="text-2xl font-bold text-primary">Fia Global</span>
              <span className="ml-2 text-sm bg-secondary text-white px-2 py-1 rounded">Bank CS</span>
            </a>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className="text-gray-700 hover:text-primary transition-colors">Home</a>
          </Link>
          <Link href="/how-it-works">
            <a className="text-gray-700 hover:text-primary transition-colors">How It Works</a>
          </Link>
          <Link href="/become-csp">
            <a className="text-gray-700 hover:text-primary transition-colors">Become a CSP</a>
          </Link>
          <Link href="/support">
            <a className="text-gray-700 hover:text-primary transition-colors">Support</a>
          </Link>
          <Link href="/csr-impact">
            <a className="text-gray-700 hover:text-primary transition-colors">CSR Impact</a>
          </Link>
          <Link href="/login">
            <Button className="bg-primary text-white hover:bg-primary/90">Login</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            <Link href="/">
              <a className="py-3 border-b border-gray-100 text-gray-700 hover:text-primary transition-colors" 
                 onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
            </Link>
            <Link href="/how-it-works">
              <a className="py-3 border-b border-gray-100 text-gray-700 hover:text-primary transition-colors" 
                 onClick={() => setIsMenuOpen(false)}>
                How It Works
              </a>
            </Link>
            <Link href="/become-csp">
              <a className="py-3 border-b border-gray-100 text-gray-700 hover:text-primary transition-colors" 
                 onClick={() => setIsMenuOpen(false)}>
                Become a CSP
              </a>
            </Link>
            <Link href="/support">
              <a className="py-3 border-b border-gray-100 text-gray-700 hover:text-primary transition-colors" 
                 onClick={() => setIsMenuOpen(false)}>
                Support
              </a>
            </Link>
            <Link href="/csr-impact">
              <a className="py-3 border-b border-gray-100 text-gray-700 hover:text-primary transition-colors" 
                 onClick={() => setIsMenuOpen(false)}>
                CSR Impact
              </a>
            </Link>
            <Link href="/login">
              <a className="py-3 text-primary font-medium" onClick={() => setIsMenuOpen(false)}>
                Login
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;