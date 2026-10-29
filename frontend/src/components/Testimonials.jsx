import React from 'react';
import { MessageSquareQuote, Star, Quote } from 'lucide-react';

/**
 * Testimonials Component (Electric Blue & Neon Mint Theme)
 */
export default function Testimonials({ testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0F1D]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5 text-blue-400" />
            <span>Client Feedback & Recommendations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            What Leaders Say <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">About My Engineering</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Delivering excellence across complex Django APIs and Laravel full-stack web applications.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="glow-card relative p-8 rounded-3xl bg-[#131D31]/90 border border-blue-500/20 hover:border-cyan-400/50 backdrop-blur-md flex flex-col justify-between transition-all duration-300"
            >
              <div className="relative">
                <Quote className="w-10 h-10 text-blue-500/15 absolute -top-2 -left-2 -z-0" />
                
                {/* 5-Star Rating Icons */}
                <div className="flex items-center gap-1 text-amber-400 mb-4 relative z-10">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-200 text-base leading-relaxed relative z-10 mb-6 italic">
                  "{t.feedback}"
                </p>
              </div>

              {/* Client Profile Details */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-700/80">
                <img
                  src={t.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={t.client_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                />
                <div>
                  <h4 className="font-bold text-white text-base">{t.client_name}</h4>
                  <p className="text-xs text-slate-400">
                    {t.client_role} {t.company && `• ${t.company}`}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
