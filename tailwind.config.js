/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'bounce-once': {
          '0%, 100%': { transform: 'scale(1)', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', },
          '50%': { transform: 'scale(1.2)', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', },
        },
      },
      animation: {
        'bounce-once': 'bounce-once 0.3s both',
      },
    },
  },
  plugins: [],
}

