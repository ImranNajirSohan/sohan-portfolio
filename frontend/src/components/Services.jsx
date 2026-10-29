import React from 'react';
import { Layers, Server, Database, Sliders, Check, Zap, ArrowUpRight } from 'lucide-react';

const serviceIconMap = {
  layers: Layers,
  server: Server,
  database: Database,
  sliders: Sliders,
  zap: Zap,
};

/**
 * Services Component (Electric Blue & Neon Mint Theme)
 */
export default function Services({ services }) {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#0F172A]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Services & Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Specialized Services For <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Startups & Enterprises</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            High-impact software engineering services spanning Django, Laravel, React, and MySQL database performance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services?.map((service, index) => {
            const Icon = serviceIconMap[service.icon_name] || Zap;
            return (
              <div
                key={service.id || index}
                className="glow-card relative rounded-3xl bg-[#131D31]/90 border border-blue-500/20 hover:border-cyan-400/60 p-8 backdrop-blur-md transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] p-0.5 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-[#0A0F1D] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
                      </div>
                    </div>
                    <span className="text-3xl font-extrabold text-slate-700 group-hover:text-cyan-500/20 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    <span>{service.title}</span>
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    {service.short_description}
                  </p>

                  {/* Features Bullet Points */}
                  {service.features_list && service.features_list.length > 0 && (
                    <div className="space-y-2.5 pt-4 border-t border-slate-700/80">
                      {service.features_list.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA Link */}
                <div className="mt-8 pt-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:text-emerald-400 transition-colors uppercase tracking-wider"
                  >
                    <span>Request This Service</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
