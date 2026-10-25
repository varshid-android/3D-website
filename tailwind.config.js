/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07090e',
        'background-alt': '#0c0f18',
        surface: {
          DEFAULT: '#0f1422',
          muted: '#0b0e17',
          card: '#121829',
          hover: '#182138',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-focus': 'rgba(0, 245, 212, 0.4)',
        },
        accent: {
          DEFAULT: '#00f5d4', // Cyber Cyan
          hover: '#05e0c3',
          secondary: '#38bdf8', // Electric Sky
          purple: '#a855f7',
          pink: '#f43f5e',
          amber: '#fbbf24',
          emerald: '#10b981',
          glow: 'rgba(0, 245, 212, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 245, 212, 0.15) 0%, transparent 60%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.85' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
