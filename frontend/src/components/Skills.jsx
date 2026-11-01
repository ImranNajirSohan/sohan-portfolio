import React, { useState } from 'react';
import { Cpu, Terminal, Database, Code, Palette, Server, Globe, GitBranch, Box, Shield, Zap, Sparkles, Layers, Smartphone } from 'lucide-react';

const iconMap = {
  terminal: Terminal,
  database: Database,
  code: Code,
  palette: Palette,
  server: Server,
  globe: Globe,
  'git-branch': GitBranch,
  box: Box,
  shield: Shield,
  cpu: Cpu,
  zap: Zap,
  sparkles: Sparkles,
  layers: Layers,
  smartphone: Smartphone,
};

/**
 * Skills Component (Electric Blue & Neon Mint Theme)
 */
export default function Skills({ skills }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Backend', 'Frontend', 'Database', 'DevOps & Cloud', 'Tools & Others'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0A0F1D]/80">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Tech Stack & Proficiency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Skills Across <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Django & Laravel Stacks</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A comprehensive developer toolkit covering modern Python, PHP, React frontend, and MySQL database engineering.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] text-slate-950 font-bold shadow-md shadow-blue-500/20 scale-105'
                  : 'bg-[#131D31] text-slate-300 hover:text-white hover:bg-[#1A2640] border border-blue-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills?.map((skill) => {
            const IconComponent = iconMap[skill.icon_name] || Code;
            return (
              <div
                key={skill.id || skill.name}
                className="glow-card p-5 rounded-2xl bg-[#131D31]/90 border border-blue-500/20 hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0A0F1D] group-hover:bg-gradient-to-tr group-hover:from-blue-500/20 group-hover:to-emerald-500/20 flex items-center justify-center border border-blue-500/25 text-cyan-400 group-hover:text-emerald-400 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-cyan-400">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress Bar with Blue to Emerald Gradient */}
                <div className="w-full bg-[#0A0F1D] rounded-full h-2.5 overflow-hidden p-0.5 border border-blue-500/20">
                  <div
                    className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] h-full rounded-full transition-all duration-700 ease-out shadow-sm shadow-cyan-500/50"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
