import React, { useState, useEffect } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    // Show button smoothly after mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    // Briefly show an engaging greeting badge after 2.5s, auto-dismiss after 7s
    const greetingTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 2500);

    const greetingDismissTimer = setTimeout(() => {
      setShowGreeting(false);
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearTimeout(greetingTimer);
      clearTimeout(greetingDismissTimer);
    };
  }, []);

  const whatsappUrl =
    PERSONAL_INFO.whatsappUrl ||
    `https://wa.me/918000849533?text=${encodeURIComponent(
      "Hi Varshid, I came across your portfolio and would like to connect!"
    )}`;

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-3 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {/* Greeting Bubble / Hover Tooltip */}
      <div
        className={`hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full apple-glass-sheet border border-emerald-500/30 text-xs text-white shadow-2xl transition-all duration-300 pointer-events-none select-none ${
          showGreeting ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-medium">
          Chat on <span className="text-[#25D366] font-semibold">WhatsApp</span>
        </span>
      </div>

      {/* Floating Action WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${PERSONAL_INFO.name} on WhatsApp`}
        onMouseEnter={() => setShowGreeting(true)}
        onMouseLeave={() => setShowGreeting(false)}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#1ea952] to-[#25D366] text-white shadow-lg shadow-[#25D366]/35 hover:shadow-2xl hover:shadow-[#25D366]/60 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-black"
      >
        {/* Subtle breathing ping pulse */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md transition-transform duration-300 group-hover:rotate-6" />

        {/* Online Status Badge Dot */}
        <span className="absolute top-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border-2 border-black" />
        </span>
      </a>
    </div>
  );
};

