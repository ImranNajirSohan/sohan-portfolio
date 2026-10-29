import React from 'react';
import { User, MapPin, Mail, Phone, CheckCircle2, Zap, Code, Layers, Cpu } from 'lucide-react';

/**
 * About Component (Electric Blue & Neon Mint Theme)
 */
export default function About({ profile }) {
  const highlights = [
    { 
      title: "Django & Python Specialist", 
      desc: "Robust REST APIs with Django REST Framework, ORM query tuning, background tasks, and enterprise microservices.", 
      icon: Code 
    },
    { 
      title: "Laravel & PHP Expert", 
      desc: "Full-scale SaaS architectures, Eloquent ORM, Laravel Sanctum authentication, job queues, and third-party integrations.", 
      icon: Layers 
    },
    { 
      title: "React & Modern UI Engineering", 
      desc: "High-speed, responsive frontend experiences built with React, modular component patterns, and Tailwind CSS.", 
      icon: Zap 
    },
    { 
      title: "Database & MySQL Architecture", 
      desc: "Relational schema design, ACID transactions, query indexing, and caching pipelines for high concurrency.", 
      icon: Cpu 
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0F172A]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>About Me & Why Hire Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Dual Backend Mastery: <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Django + Laravel</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A software engineer who can jump into Python or PHP backends and connect them seamlessly with modern React interfaces.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Bio Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 rounded-3xl bg-[#131D31]/90 border border-blue-500/20 backdrop-blur-md shadow-xl space-y-5">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Versatile Full-Stack Engineer</span>
                <span className="text-emerald-400">_</span>
              </h3>
              
              <p className="text-slate-300 leading-relaxed text-base">
                {profile?.full_bio || "I am a full-stack engineer driven by solving real-world challenges through elegant, maintainable code. With an emphasis on Django, Laravel, and React, I love designing scalable systems that are both resilient under load and enjoyable for users."}
              </p>

              <blockquote className="p-4 rounded-xl bg-[#0A0F1D] border-l-4 border-cyan-400 italic text-slate-300 text-sm">
                "{profile?.hero_quote || "Bridging Python Django and PHP Laravel to build reliable, high-speed software that clients love."}"
              </blockquote>

              {/* Personal Details Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0A0F1D] border border-blue-500/15 text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{profile?.location || "Rajshahi, Bangladesh"}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0A0F1D] border border-blue-500/15 text-sm text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">{profile?.email || "sohanuddin404@gmail.com"}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0A0F1D] border border-blue-500/15 text-sm text-slate-300">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{profile?.phone || "+880 1712-345678"}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0A0F1D] border border-emerald-500/25 text-sm text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Available for Freelance & Full-time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Principles / Why Hire Cards */}
          <div className="lg:col-span-6 space-y-4">
            {highlights.map((h, idx) => {
              const Icon = h.icon;
              return (
                <div
                  key={idx}
                  className="glow-card p-5 sm:p-6 rounded-2xl bg-[#131D31]/90 border border-blue-500/20 hover:border-cyan-400/50 flex items-start gap-4 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] p-0.5 shrink-0 shadow-md shadow-blue-500/20">
                    <div className="w-full h-full bg-[#0A0F1D] rounded-[10px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-1">{h.title}</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
