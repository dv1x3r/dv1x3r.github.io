/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./layouts/**/*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Inter Variable"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'text-slide-2': 'text-slide-2 12s cubic-bezier(0.5, 0.1, 0, 1) infinite',
      },
      keyframes: {
        'text-slide-2': {
          '0%, 40%': {
            transform: 'translateY(0%)',
          },
          '50%, 90%': {
            transform: 'translateY(-50%)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addVariant }) { addVariant("glow", ".glow-capture .glow-overlay &") },
      {
        theme: {
          extend: {
            colors: {
              // https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
              glow: "color-mix(in srgb, var(--glow-color) calc(<alpha-value> * 100%), transparent)",
            },
          },
        },
      }
    ),
  ],
}

