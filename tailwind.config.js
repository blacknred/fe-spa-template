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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        // sans: ['var(--font-inter)'],
        // mono: ['var(--font-roboto-mono)'],
        body: ["Inter", "sans-serif"],
				// title: ["Sora", "sans-serif"],
      },
      filter: ['hover', 'focus'],
      keyframes: ({ theme }) => ({
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
        highlight: {
          '0%': {
            background: theme('colors.vercel.pink'),
            color: theme('colors.white'),
          },
          '40%': {
            background: theme('colors.vercel.red'),
            color: theme('colors.black'),
          },
        },
        loading: {
          '0%': {
            opacity: '.2',
          },
          '20%': {
            opacity: '1',
            transform: 'translateX(1px)',
          },
          to: {
            opacity: '.2',
          },
        },
      }),
    },
  },

  plugins: [require('@tailwindcss/forms')],
};
