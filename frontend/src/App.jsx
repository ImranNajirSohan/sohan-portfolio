import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminGuideModal from './components/AdminGuideModal';
import { fetchPortfolioData } from './services/api';

/**
 * Root Application Component (App.jsx)
 * ------------------------------------
 * - 100% Client-Facing: No admin credentials or backend debug buttons are shown to public visitors.
 * - Dynamic data is fetched from the Django REST API in the background.
 * - Secret Developer Shortcut: Pressing [Ctrl + Shift + A] or adding `?admin_guide=true` to URL
 *   opens the backend guide only for you (the owner/developer).
 */
export default function App() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [devGuideOpen, setDevGuideOpen] = useState(false);

  // Load portfolio data from the Django backend API
  const loadData = async () => {
    try {
      const { data, isLive: liveStatus } = await fetchPortfolioData();
      setPortfolio(data);
      setIsLive(liveStatus);
    } catch (err) {
      console.error("Error loading portfolio data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    loadData();

    // Check if the developer wants to see the guide via secret URL parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin_guide') === 'true') {
      setDevGuideOpen(true);
    }

    // Secret shortcut for the owner: Ctrl + Shift + A
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setDevGuideOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Auto-detect when Django server connects
    const interval = setInterval(() => {
      fetchPortfolioData().then(({ data, isLive: liveStatus }) => {
        setIsLive(liveStatus);
        if (liveStatus) {
          setPortfolio(data);
        }
      });
    }, 15000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  // Loading Screen: shown only during the initial data load
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1D] flex flex-col items-center justify-center gap-4 text-white">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#3B82F6] via-[#06B6D4] to-[#10B981] p-1 animate-pulse">
          <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center font-black text-cyan-400 text-xl">
            ⚡
          </div>
        </div>
        <div className="text-sm font-semibold tracking-wide text-cyan-300">
          Loading Portfolio Experience...
        </div>
      </div>
    );
  }

  // De-structure dynamic sections from portfolio data
  const profile = portfolio?.profile;
  const settings = portfolio?.settings;
  const skills = portfolio?.skills || [];
  const services = portfolio?.services || [];
  const experiences = portfolio?.experiences || [];
  const projects = portfolio?.projects || [];
  const testimonials = portfolio?.testimonials || [];

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-slate-100 relative selection:bg-blue-500 selection:text-white">
      {/* Subtle modern mesh pattern in the background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* 1. Header & Navigation (Pure Client-Facing) */}
      <Navbar profile={profile} />

      {/* 2. Main Page Sections */}
      <main className="relative z-10">
        {/* Hero: Welcome banner, typewriter roles, and introduction */}
        <Hero profile={profile} settings={settings} />

        {/* About: Dual expertise (Django + Laravel) and background */}
        <About profile={profile} />

        {/* Skills: Categorized tech competencies with percentage progress bars */}
        <Skills skills={skills} />

        {/* Services: What I do & feature checklists */}
        <Services services={services} />

        {/* Projects: Filterable portfolio gallery with live links & source code */}
        <Projects projects={projects} />

        {/* Experience: Interactive career & education timeline */}
        <Experience experiences={experiences} />

        {/* Testimonials: Recommendations & client reviews */}
        <Testimonials testimonials={testimonials} />

        {/* Contact: Interactive contact form (saves to MySQL in backend) */}
        <Contact profile={profile} settings={settings} />
      </main>

      {/* 3. Footer (Pure Client-Facing) */}
      <Footer profile={profile} settings={settings} />

      {/* 4. Secret Developer Guide (Only opens via Ctrl+Shift+A or ?admin_guide=true) */}
      {devGuideOpen && (
        <AdminGuideModal
          isOpen={devGuideOpen}
          onClose={() => setDevGuideOpen(false)}
          isLive={isLive}
        />
      )}
    </div>
  );
}
