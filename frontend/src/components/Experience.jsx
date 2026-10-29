import React, { useState } from 'react';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

/**
 * Experience Component (Electric Blue & Neon Mint Theme)
 */
export default function Experience({ experiences }) {
  const [activeTab, setActiveTab] = useState('experience');

  const filteredItems = experiences?.filter(item => item.category === activeTab) || [];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0F172A]/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            <span>Career & Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Professional <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Track Record</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A demonstrated history of architecting scalable applications in both Python Django and PHP Laravel.
          </p>
        </div>

        {/* Tab Toggle: Experience vs Education */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#131D31] border border-blue-500/25">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] text-slate-950 font-bold shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] text-slate-950 font-bold shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-blue-500/30 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-8">
          {filteredItems.map((item, idx) => (
            <div key={item.id || idx} className="relative group">
              
              {/* Glowing Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#0A0F1D] border-2 border-[#3B82F6] flex items-center justify-center group-hover:border-emerald-400 group-hover:scale-125 transition-all shadow-md shadow-blue-500/50">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Date Tag on Left for Wide Screens */}
              <div className="sm:absolute sm:-left-36 sm:top-1 sm:text-right text-xs font-mono font-bold text-cyan-400 mb-2 sm:mb-0">
                <span>{item.start_date} – {item.end_date}</span>
              </div>

              {/* Card Container */}
              <div className="glow-card p-6 sm:p-7 rounded-2xl bg-[#131D31]/90 border border-blue-500/20 group-hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.role_or_degree}
                  </h3>
                  {item.is_current && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
                  <span className="font-semibold text-cyan-400">
                    {item.company_or_institution}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
