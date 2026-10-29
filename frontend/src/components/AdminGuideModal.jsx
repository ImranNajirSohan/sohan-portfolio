import React, { useState } from 'react';
import { X, Shield, ExternalLink, Key, Check, BookOpen, Layers, Database, Sparkles, Server } from 'lucide-react';

/**
 * AdminGuideModal Component (Blue & Mint Theme)
 */
export default function AdminGuideModal({ isOpen, onClose, isLive }) {
  const [copied, setCopied] = useState('');
  const [activeTab, setActiveTab] = useState('access');

  if (!isOpen) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#0F172A] border border-blue-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#131D31] border-b border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] p-0.5">
              <div className="w-full h-full bg-[#0A0F1D] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Django Backend Control Center</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isLive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {isLive ? 'API LIVE' : 'OFFLINE / FALLBACK'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Manage all portfolio content dynamically from Django Admin & MySQL
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1A2640] hover:bg-[#203050] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-blue-500/20 bg-[#0A0F1D] px-6 pt-2">
          <button
            onClick={() => setActiveTab('access')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'access'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Admin Login & Access</span>
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'learning'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Learning Guide (Step-by-Step)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-300">
          
          {activeTab === 'access' && (
            <div className="space-y-6">
              
              {/* Credentials Box */}
              <div className="p-5 rounded-2xl bg-[#131D31] border border-blue-500/25 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-base flex items-center gap-2">
                    <Key className="w-4 h-4 text-cyan-400" />
                    <span>Django Superuser Credentials</span>
                  </h4>
                  <a
                    href="http://localhost:8000/admin/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-[#3B82F6] to-[#10B981] hover:scale-105 transition-all shadow-md shadow-cyan-500/20"
                  >
                    <span>Open /admin</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#0A0F1D] border border-blue-500/20 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Username</div>
                      <div className="font-mono font-bold text-cyan-300 text-sm">admin</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard('admin', 'user')}
                      className="px-2.5 py-1 rounded bg-[#1A2640] text-xs text-slate-300 hover:text-white"
                    >
                      {copied === 'user' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Copy'}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0A0F1D] border border-blue-500/20 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Password</div>
                      <div className="font-mono font-bold text-cyan-300 text-sm">admin123</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard('admin123', 'pass')}
                      className="px-2.5 py-1 rounded bg-[#1A2640] text-xs text-slate-300 hover:text-white"
                    >
                      {copied === 'pass' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Copy'}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-400">
                  Django Admin URL: <a href="http://localhost:8000/admin/" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-mono">http://localhost:8000/admin/</a>
                </p>
              </div>

              {/* What you can handle from Django Admin */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-base">
                  What You Can Manage in Django Admin:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#131D31] border border-blue-500/20">
                    <span className="font-bold text-cyan-300">1. Personal Profile:</span>
                    <p className="text-slate-400 mt-1">Edit your name, taglines, typewriter roles, email, phone, location, avatar, and resume.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#131D31] border border-blue-500/20">
                    <span className="font-bold text-emerald-400">2. Projects & Portfolio:</span>
                    <p className="text-slate-400 mt-1">Add, update, or remove projects, live links, github links, category tags, and screenshots.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#131D31] border border-blue-500/20">
                    <span className="font-bold text-blue-300">3. Skills & Proficiency:</span>
                    <p className="text-slate-400 mt-1">Change skill percentages, categories (Backend/Frontend/DevOps), and icon styles.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#131D31] border border-blue-500/20">
                    <span className="font-bold text-emerald-400">4. Contact Messages:</span>
                    <p className="text-slate-400 mt-1">Read messages submitted through the React contact form, mark as read, or add reply notes.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#131D31] border border-blue-500/20">
                    <span className="font-bold text-cyan-300">5. Services & Solutions:</span>
                    <p className="text-slate-400 mt-1">Modify services offered, descriptions, bulleted features, and activation status.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#131D31] border border-blue-500/20">
                    <span className="font-bold text-emerald-400">6. Experience & Education:</span>
                    <p className="text-slate-400 mt-1">Update jobs, internships, degrees, start/end dates, and accomplishments.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'learning' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#131D31] border border-blue-500/25 text-xs text-cyan-300">
                <Sparkles className="w-4 h-4 inline mr-1 text-emerald-400" />
                <span>এখানে আপনি শিখতে পারবেন কীভাবে Django এবং React ব্যাকএন্ড ও ফ্রন্টএন্ড হিসেবে একত্রে কাজ করে:</span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                
                {/* Step 1 */}
                <div className="p-4 rounded-2xl bg-[#131D31] border border-blue-500/20 space-y-2">
                  <div className="font-bold text-cyan-400 flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>ধাপ ১: Django Models (MySQL ডাটাবেজ আর্কিটেকচার)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">backend/api/models.py</code> ফাইলে Profile, Skill, Project, ContactMessage ইত্যাদি মডেল তৈরি করা হয়েছে। Django ও PyMySQL-এর মাধ্যমে <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">sohan_portfolio_db</code> নামক MySQL ডাটাবেজে সমস্ত টেবিল স্বয়ংক্রিয়ভাবে তৈরি হয়েছে।
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-2xl bg-[#131D31] border border-blue-500/20 space-y-2">
                  <div className="font-bold text-cyan-400 flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>ধাপ ২: Django REST Framework (API তৈরির পদ্ধতি)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">backend/api/serializers.py</code> ডাটাবেজের মডেলগুলোকে JSON ফরম্যাটে রূপান্তর করে। আর <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">views.py</code> দিয়ে আমরা <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">/api/portfolio/</code> এবং <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">/api/contact/</code> এন্ডপয়েন্ট তৈরি করেছি।
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-2xl bg-[#131D31] border border-blue-500/20 space-y-2">
                  <div className="font-bold text-cyan-400 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>ধাপ ৩: React Frontend (ইউজার ইন্টারফেস ও API কল)</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    React-এ <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">axios</code> দিয়ে <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">src/services/api.js</code> ফাইলে ব্যাকএন্ডের API কল করা হয়। ব্যাকএন্ডে আপনি যা পরিবর্তন করবেন, ফ্রন্টএন্ড স্বয়ংক্রিয়ভাবে সেই ডাটা ফেচ করে চমৎকার ইলেকট্রিক ব্লু ও নিয়ন মিন্ট ডিজাইনে প্রদর্শন করে।
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-2xl bg-[#131D31] border border-blue-500/20 space-y-2">
                  <div className="font-bold text-cyan-400 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>ধাপ ৪: Django Admin দিয়ে সম্পূর্ণ সাইট নিয়ন্ত্রণ</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded font-mono">http://localhost:8000/admin/</code>-এ গিয়ে ইউজারনেম <code className="text-cyan-300">admin</code> এবং পাসওয়ার্ড <code className="text-cyan-300">admin123</code> দিয়ে লগইন করলেই আপনি সমস্ত কনটেন্ট হ্যান্ডেল করতে পারবেন। কোড না ছুঁয়েই প্রজেক্ট, স্কিল বা যেকোনো তথ্য আপডেট করা সম্ভব!
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0A0F1D] border-t border-blue-500/20 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Python 3.14 + Django 6 + MySQL + React
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#3B82F6] to-[#10B981] hover:scale-105 transition-transform"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
}
