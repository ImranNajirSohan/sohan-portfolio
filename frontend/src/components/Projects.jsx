import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';

/**
 * Projects Component (Electric Blue & Neon Mint Theme)
 */
export default function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Full Stack', 'Backend & API', 'Frontend'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0A0F1D]/80">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Projects Built With <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Django & Laravel</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Real-world full-stack web applications featuring Laravel e-commerce, Django enterprise microservices, and React frontends.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] text-slate-950 font-bold shadow-md shadow-blue-500/20 scale-105'
                  : 'bg-[#131D31] text-slate-300 hover:text-white hover:bg-[#1A2640] border border-blue-500/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects?.map((project) => (
            <div
              key={project.id || project.title}
              className="glow-card group rounded-3xl bg-[#131D31]/90 border border-blue-500/20 hover:border-cyan-400/60 overflow-hidden backdrop-blur-md flex flex-col justify-between transition-all duration-300"
            >
              {/* Project Image Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image_display_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/40 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0A0F1D]/80 text-cyan-300 border border-blue-500/30 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-emerald-400 mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  {project.tech_stack_list && project.tech_stack_list.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack_list.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[#0A0F1D] text-cyan-200 border border-blue-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] hover:shadow-md hover:shadow-cyan-500/20 transition-all hover:scale-105"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-[#0A0F1D] border border-blue-500/20 hover:border-cyan-400 transition-all"
                      >
                        <Github className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
