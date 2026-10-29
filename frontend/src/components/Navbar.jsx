import React, { useState, useEffect } from 'react';
import { Menu, X, Flame, Sparkles } from 'lucide-react';

/**
 * Navbar Component (Electric Blue & Neon Mint/Emerald Theme)
 * -----------------------------------------------------------
 * Features colors inspired by user uploaded images:
 * - Electric Blue: #3B82F6 / #60A5FA
 * - Neon Mint / Emerald: #10B981 / #34D399 / #00E599
 */
export default function Navbar({ profile }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-3.5 shadow-xl shadow-black/40' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Electric Blue to Neon Emerald Accent */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0A0F1D] rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
                {profile?.name?.split(' ')[0] || 'SOHAN'}
                <span className="text-emerald-400">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-cyan-400/90 font-bold -mt-1">
                Full-Stack Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#131D31]/80 px-4 py-1.5 rounded-full border border-blue-500/20 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-blue-500/10 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Primary Action Button: Hire Me */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="relative group overflow-hidden px-5 py-2.5 text-sm font-bold text-slate-950 rounded-xl bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-white"
            >
              <span className="relative z-10 flex items-center gap-1.5 font-extrabold tracking-wide text-slate-950">
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Hire Me</span>
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none bg-[#131D31] border border-blue-500/20"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav mt-3 border-t border-blue-500/20 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-blue-500/10 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center py-2.5 rounded-lg font-bold text-slate-950 bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981]"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
