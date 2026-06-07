/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"Geist"', 'system-ui', 'sans-serif'],
      },
      colors: {
        garden: {
          bg:       '#0C0C0E',
          surface:  '#141416',
          elevated: '#1C1C20',
          border:   '#2A2A30',
          muted:    '#3A3A42',
          text:     '#E8E8E2',
          dim:      '#8A8A8E',
          amber:    '#D4A853',
          green:    '#4CAF7A',
          red:      '#E05A5A',
          blue:     '#5A9EE0',
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease forwards',
        'slide-up':   'slideUp 0.3s ease forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
      },
    },
  },
  plugins: [],
};
