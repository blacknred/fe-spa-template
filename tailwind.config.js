/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        success: colors.green[700],
        danger: colors.red[600],
      },
      fontFamily: {
        // sans: ['var(--font-inter)'],
        body: ["Inter", "sans-serif"],
      },
      filter: ['hover', 'focus'],
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        blink: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100% ': { opacity: '0.2' }
        },
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-in-out',
        carousel: 'marquee 60s linear infinite',
        blink: 'blink 1.4s both infinite',
        spin: 'spin 1s ease-in-out infinite'
      }
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
