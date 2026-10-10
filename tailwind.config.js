/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--bg-primary)',
          surface: 'var(--bg-secondary)',
          card: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
          text: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
          subtle: 'var(--text-muted)',
          border: 'var(--border-color)',
          borderSubtle: 'var(--border-subtle)',
          accent: 'var(--accent-color)',
          accentHover: 'var(--accent-hover)',
          accentLight: 'var(--accent-light)',
          accentGlow: 'var(--accent-glow)'
        },
        navy: {
          950: '#040d18',
          900: '#071526',
          800: '#0B1F3A',
          700: '#142C4F',
          600: '#1F3F6D',
        },
        teal: {
          900: '#064239',
          800: '#095E51',
          700: '#0E7C6B',
          600: '#149B86',
          500: '#1AB59D',
          100: '#D5F2EC',
          50: '#EBF9F6',
        },
        gold: {
          600: '#C98A20',
          500: '#E8A838',
          400: '#F0BC5E',
          100: '#FCF3DE',
          50: '#FDF9EF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
