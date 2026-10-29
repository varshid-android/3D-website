import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Awards } from './components/sections/Awards';
import { Process } from './components/sections/Process';
import { Contact } from './components/sections/Contact';
import { LiveBackground } from './components/ui/LiveBackground';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { ChatBot } from './components/ui/ChatBot/ChatBot';
import { useSmoothScroll } from './hooks/useScrollAnimations';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  // Initialize Lenis smooth scroller synced with GSAP
  useSmoothScroll();

  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'skills', 'projects', 'process', 'awards', 'contact'];
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 250;
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden text-slate-100 selection:bg-accent/30 selection:text-white relative">
      {/* Dynamic Interactive Live Background (Drifting Plasma, Constellation Particles & Cyber Grid) */}
      <LiveBackground />

      {/* Top ambient radial glow */}
      <div className="absolute inset-x-0 top-0 h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="ambient-glow-top" />
      </div>

      {/* Fixed Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full max-w-full overflow-x-hidden">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Process />
        <Awards />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Direct Connect Button */}
      <WhatsAppButton />

      {/* RAG-Powered AI Portfolio Assistant */}
      <ChatBot />
    </div>
  );
};

export default App;
