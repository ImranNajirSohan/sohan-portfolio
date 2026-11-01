import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal, CheckCircle2, Clock, Globe } from 'lucide-react';

/**
 * Hero Component (Electric Blue & Neon Mint Theme with Live Rajshahi Time Zone)
 * -----------------------------------------------------------------------------
 * Features:
 * - Live clock synchronized with Asia/Dhaka (GMT+6) in Rajshahi, Bangladesh.
 * - Pill badges for "Available for Freelance" and "Python + PHP + React".
 * - Dynamic typewriter effect cycling through core engineering roles.
 * - Interactive code card with dual Python/Django and PHP/Laravel snippets.
 */
export default function Hero({ profile, settings }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live ticking Rajshahi Time (GMT+6)
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roles = profile?.roles_list?.length > 0
    ? profile.roles_list
    : [
        "Django & Python Specialist",
        "Laravel & PHP Expert",
        "React.js & React Native Engineer",
        "Full-Stack System Architect"
      ];

  // Typewriter effect
  useEffect(() => {
    const currentFullText = roles[currentRoleIndex] || roles[0];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Soft Ambient Lights (Electric Blue & Neon Mint) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/12 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-600/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-emerald-500/12 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio, Typewriter, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Badges (Image 2 + Image 1 + Live Rajshahi Time Zone) */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              
              {/* Image 2 Style: Neon Mint "Available for Freelance" */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#10B981] text-xs sm:text-sm font-semibold tracking-wide shadow-sm shadow-emerald-500/10">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Available for Freelance</span>
              </div>

              {/* Image 1 Style: Electric Blue "Python + PHP + React" */}
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[#60A5FA] text-xs sm:text-sm font-semibold tracking-wide shadow-sm shadow-blue-500/10">
                <span>Python + PHP + React</span>
              </div>

              {/* Live Rajshahi Time Zone Widget (GMT+6) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131D31] border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium shadow-sm">
                <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span className="font-mono text-cyan-200">{currentTime || '11:45:00 AM'}</span>
                <span className="text-[11px] text-slate-400 font-semibold">(Rajshahi • GMT+6)</span>
              </div>

            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-medium text-slate-300 flex items-center justify-center lg:justify-start gap-2">
                <span>Hello world, I'm</span>
                <span className="inline-block animate-bounce">👋</span>
              </h2>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-tight">
                {profile?.name || "Imran Najir Sohan"}
              </h1>
            </div>

            {/* Dynamic Animated Typewriter Line (Blue to Mint Gradient) */}
            <div className="min-h-[48px] flex items-center justify-center lg:justify-start text-xl sm:text-3xl lg:text-4xl font-bold">
              <span className="text-slate-300 mr-2">I am a</span>
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#38BDF8] to-[#34D399] bg-clip-text text-transparent underline decoration-cyan-400/50 decoration-wavy decoration-2">
                {displayText}
              </span>
              <span className="animate-pulse ml-1 text-cyan-400 font-normal">|</span>
            </div>

            {/* Short Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {profile?.short_bio || "Versatile Full-Stack Engineer based in Rajshahi, Bangladesh. Mastering both Python/Django and PHP/Laravel ecosystems, paired with modern React frontends and high-performance MySQL databases."}
            </p>

            {/* Dual Tech Capability Badges (Blue & Mint) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#131D31] border border-blue-500/25 text-xs text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                <span className="font-bold text-white">Python & Django</span>
                <span className="text-slate-400">APIs & Microservices</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#131D31] border border-emerald-500/25 text-xs text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                <span className="font-bold text-white">PHP & Laravel</span>
                <span className="text-slate-400">SaaS & Enterprise</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#131D31] border border-cyan-500/25 text-xs text-slate-200">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span className="font-bold text-white">React & Tailwind</span>
                <span className="text-slate-400">Modern Frontend</span>
              </div>
            </div>

            {/* Action Buttons: Blue-Emerald Gradient */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-[#131D31] hover:bg-[#1A2640] border border-blue-500/25 hover:border-cyan-400 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Hire Me / Contact</span>
              </a>

              {profile?.resume_display_url && profile.resume_display_url !== "#" && (
                <a
                  href={profile.resume_display_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white bg-[#131D31]/80 hover:bg-[#1A2640] border border-slate-700 transition-all"
                  title="Download Resume"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold">Resume CV</span>
                </a>
              )}
            </div>

            {/* Social Links & Trust Badges */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-4 text-slate-400">
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#131D31] border border-blue-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#131D31] border border-blue-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              <div className="h-4 w-px bg-slate-700 mx-2" />
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Based in Rajshahi • Remote Worldwide</span>
              </div>
            </div>

          </div>

          {/* Right Column: Code Card with Photo & Interactive Terminal */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Refined Glowing Ring in Blue & Emerald */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] opacity-30 blur-xl animate-pulse-slow" />
              
              {/* Card Container */}
              <div className="relative rounded-3xl bg-[#0F172A] border border-blue-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
                
                {/* Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/25">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span>engineer.py / .php</span>
                  </div>
                </div>

                {/* Profile Avatar with Blue-to-Emerald Gradient Border */}
                <div className="mt-5 relative group flex justify-center">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-1 bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src={profile?.avatar_display_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"}
                      alt={profile?.name || "Sohan"}
                      className="w-full h-full object-cover object-top rounded-[14px]"
                    />
                  </div>
                </div>

                {/* Live Code Snippet Displaying Both Python & PHP */}
                <div className="mt-5 bg-[#0A0F1D] rounded-2xl p-4 border border-blue-500/20 font-mono text-xs leading-relaxed space-y-1">
                  <p className="text-slate-400">
                    <span className="text-cyan-400"># Location & Timezone</span>
                  </p>
                  <p className="text-slate-300">
                    location = <span className="text-emerald-400">"Rajshahi, Bangladesh"</span>
                  </p>
                  <p className="text-slate-300">
                    timezone = <span className="text-cyan-300">"Asia/Dhaka (GMT+6)"</span>
                  </p>
                  
                  <div className="pt-1.5 border-t border-slate-800" />
                  
                  <p className="text-slate-400">
                    <span className="text-emerald-400">// Core Web Stack</span>
                  </p>
                  <p className="text-slate-300">
                    stack = [<span className="text-blue-400">"Django"</span>, <span className="text-emerald-400">"Laravel"</span>, <span className="text-cyan-300">"React"</span>]
                  </p>
                  
                  <p className="text-emerald-400 flex items-center gap-1.5 pt-2 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>status: Active in Rajshahi Time Zone</span>
                  </p>
                </div>

                {/* Floating Metric Badges */}
                <div className="mt-5 grid grid-cols-3 gap-2.5 pt-1 text-center">
                  <div className="bg-[#131D31] p-2.5 rounded-xl border border-blue-500/20">
                    <div className="text-lg sm:text-xl font-extrabold text-blue-400">
                      {profile?.years_of_experience || 3}+
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Years Exp</div>
                  </div>
                  <div className="bg-[#131D31] p-2.5 rounded-xl border border-blue-500/20">
                    <div className="text-lg sm:text-xl font-extrabold text-cyan-400">
                      {profile?.completed_projects || 32}+
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Projects</div>
                  </div>
                  <div className="bg-[#131D31] p-2.5 rounded-xl border border-blue-500/20">
                    <div className="text-lg sm:text-xl font-extrabold text-emerald-400">
                      {profile?.satisfied_clients || 22}+
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Clients</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
