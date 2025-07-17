import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Mail, Shield, FileText, HelpCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-coral-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-coral-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-bold">ColorCraft AI</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create beautiful coloring books with AI. Perfect for parents, educators, and creative professionals.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/create" className="text-gray-400 hover:text-coral-400 transition-colors duration-200">Create Coloring Book</Link></li>
              <li><Link to="/templates" className="text-gray-400 hover:text-coral-400 transition-colors duration-200">Templates</Link></li>
              <li><Link to="/history" className="text-gray-400 hover:text-coral-400 transition-colors duration-200">History</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-coral-400 transition-colors duration-200">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-coral-400 transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-coral-400 transition-colors duration-200">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-coral-400 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-coral-400 transition-colors duration-200">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-coral-400 transition-colors duration-200 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <span>Help Center</span>
              </Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-coral-400 transition-colors duration-200 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Contact Support</span>
              </Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2025 ColorCraft AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-coral-400 transition-colors duration-200 text-sm flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-coral-400 transition-colors duration-200 text-sm flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>Terms</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};