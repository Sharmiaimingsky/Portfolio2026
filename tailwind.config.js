/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#07090d',
        surface: '#0c0e12',
        card: '#111418',
        accent: '#39ff14',
        'accent-2': '#ff2d78',
        'accent-3': '#ff6b00',
        'accent-4': '#ffe000',
        muted: '#6b7685',
        border: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
