import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare, Clock, Globe } from 'lucide-react';
import { sendContactMessage } from '../services/api';

/**
 * Contact Component with Interactive Rajshahi Map & Live Timezone
 * ----------------------------------------------------------------
 * - Displays direct contact info cards (Email, Phone, Rajshahi Location).
 * - Live synchronized clock for Rajshahi (Asia/Dhaka, GMT+6).
 * - High-definition embedded Google Map for Rajshahi, Bangladesh.
 * - Interactive form sending messages directly to the Django MySQL backend.
 */
export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const [rajshahiTime, setRajshahiTime] = useState('');

  // Live clock in Asia/Dhaka timezone (GMT+6)
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setRajshahiTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    const result = await sendContactMessage(formData);
    if (result.success) {
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 7000);
    } else {
      setStatus({ submitting: false, success: false, error: result.error });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0F172A]/70">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-gradient-to-t from-blue-600/10 via-cyan-500/8 to-emerald-500/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>Get In Touch / Hire</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Build Your <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Next Big Product?</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Based in Rajshahi, Bangladesh • Available for remote full-time & freelance projects worldwide.
          </p>
        </div>

        {/* Content Grid: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14">
          
          {/* Left Column: Direct Info Cards & Live Timezone */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-8 rounded-3xl bg-[#131D31]/90 border border-blue-500/20 backdrop-blur-md shadow-xl space-y-6">
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Contact Information
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  I am actively taking on new freelance contracts, consulting engagements, and full-time software engineering roles. Send a note, and I will reply within 24 hours.
                </p>
              </div>

              {/* Live Timezone & Local Time Card */}
              <div className="p-4 rounded-2xl bg-[#0A0F1D] border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Rajshahi Local Time</span>
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Active Now</span>
                  </span>
                </div>
                
                <div className="flex items-baseline justify-between pt-1">
                  <div className="text-2xl font-mono font-extrabold text-white tracking-tight">
                    {rajshahiTime || '11:45:00 AM'}
                  </div>
                  <div className="text-xs font-semibold text-slate-400">
                    GMT+6 (Asia/Dhaka)
                  </div>
                </div>
              </div>

              {/* Contact Detail Rows */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#0A0F1D] border border-blue-500/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] p-0.5 shrink-0">
                    <div className="w-full h-full bg-[#0A0F1D] rounded-[10px] flex items-center justify-center">
                      <Mail className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Email</div>
                    <a href={`mailto:${profile?.email || 'sohanuddin404@gmail.com'}`} className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                      {profile?.email || 'sohanuddin404@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#0A0F1D] border border-blue-500/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] p-0.5 shrink-0">
                    <div className="w-full h-full bg-[#0A0F1D] rounded-[10px] flex items-center justify-center">
                      <Phone className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Phone / WhatsApp</div>
                    <a href={`tel:${profile?.phone || '+8801712345678'}`} className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                      {profile?.phone || '+880 1712-345678'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#0A0F1D] border border-blue-500/20">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] p-0.5 shrink-0">
                    <div className="w-full h-full bg-[#0A0F1D] rounded-[10px] flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-semibold uppercase">Location</div>
                    <div className="text-sm font-bold text-white">
                      {profile?.location || 'Rajshahi, Bangladesh'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy assurance */}
              <div className="p-3.5 rounded-xl bg-[#0A0F1D] border border-blue-500/20 text-xs text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct communication guaranteed. I respect your privacy and will respond promptly.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#131D31]/90 border border-blue-500/25 backdrop-blur-md shadow-2xl relative">
              
              <h3 className="text-2xl font-bold text-white mb-6">
                Send a Message
              </h3>

              {status.success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Thank you! Your message has been sent successfully. I will get back to you shortly.</span>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0F1D] border border-blue-500/25 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0F1D] border border-blue-500/25 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry (Django, Laravel, or Full-Stack)"
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0F1D] border border-blue-500/25 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, tech requirements..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0F1D] border border-blue-500/25 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#10B981] hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status.submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

        {/* Rajshahi Interactive Map Section */}
        <div className="rounded-3xl bg-[#131D31]/90 border border-blue-500/25 p-6 sm:p-8 backdrop-blur-md shadow-2xl overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30 mb-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Base Location & Region</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Rajshahi, Bangladesh
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Operating in Bangladesh Standard Time (GMT+6) • Communicating smoothly with clients in US, Europe, and Asia.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-[#0A0F1D] px-3.5 py-2 rounded-xl border border-blue-500/20">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Available for Remote Work Worldwide</span>
            </div>
          </div>

          {/* Google Maps Embed Frame */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-blue-500/20 shadow-inner">
            <iframe
              title="Rajshahi Bangladesh Location Map"
              src="https://maps.google.com/maps?q=Rajshahi,%20Bangladesh&t=&z=12&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter contrast-105"
              loading="lazy"
              allowFullScreen
            />
          </div>

        </div>

      </div>
    </section>
  );
}
