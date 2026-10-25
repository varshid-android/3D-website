import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Awards } from './components/sections/Awards';
import { Contact } from './components/sections/Contact';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'skills', 'projects', 'awards', 'contact'];
    
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-accent/30 selection:text-white relative bg-grid-pattern">
      {/* Top ambient radial glow */}
      <div className="ambient-glow-top" />

      {/* Fixed Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Awards />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;
