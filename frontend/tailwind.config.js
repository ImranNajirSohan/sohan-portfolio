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
        brand: {
          // Electric Blue & Cyan (from Image 1)
          blue: '#3B82F6',
          'blue-light': '#60A5FA',
          'blue-hover': '#2563EB',
          cyan: '#06B6D4',
          'cyan-light': '#38BDF8',
          // Neon Emerald / Mint Green (from Image 2)
          emerald: '#10B981',
          'emerald-light': '#34D399',
          mint: '#00E599',
          teal: '#14B8A6',
          // Modern Slate Tech Backgrounds
          bg: '#0A0F1D',
          bgSurface: '#0F172A',
          card: '#131D31',
          cardElevated: '#1A2640',
          cardHover: '#203050',
          border: 'rgba(59, 130, 246, 0.18)',
          borderBlue: 'rgba(59, 130, 246, 0.35)',
          borderEmerald: 'rgba(16, 185, 129, 0.35)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Combination of Electric Blue + Neon Emerald/Mint (Image 1 + Image 2)
        'blue-emerald': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)',
        'blue-emerald-soft': 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
