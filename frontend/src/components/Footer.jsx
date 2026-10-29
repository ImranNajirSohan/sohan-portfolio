import React from 'react';
import { ArrowUp, Flame, Github, Linkedin } from 'lucide-react';

/**
 * Footer Component (Electric Blue & Neon Mint Theme)
 */
export default function Footer({ profile, settings }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070B16] border-t border-blue-500/20 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand & Tagline */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] p-0.5">
              <div className="w-full h-full bg-[#0A0F1D] rounded-[6px] flex items-center justify-center">
                <Flame className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">
                {profile?.name || "Imran Najir Sohan"}
              </span>
              <p className="text-xs text-slate-400">
                {settings?.footer_text || "Full-Stack Software Engineer • Django & Laravel Specialist"}
              </p>
            </div>
          </div>

          {/* Center: In-page Navigation Links */}
          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          {/* Right: Scroll to Top & Social Links */}
          <div className="flex items-center gap-4">
            {profile?.github_url && (
              <a 
                href={profile.github_url} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-400 transition-colors" 
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile?.linkedin_url && (
              <a 
                href={profile.linkedin_url} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-cyan-400 transition-colors" 
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={scrollToTop}
              title="Scroll to Top"
              className="w-9 h-9 rounded-xl bg-[#131D31] hover:bg-[#1A2640] border border-blue-500/25 text-cyan-400 hover:text-white flex items-center justify-center transition-all hover:scale-105"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright Notice */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {profile?.name || "Imran Najir Sohan"}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
