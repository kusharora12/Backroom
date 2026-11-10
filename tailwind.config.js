/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#080A0B',
        teal: {
          DEFAULT: '#007F73',
          light: '#35B5A3',
          dark: '#075B54',
        },
        forest: '#102B28',
        ivory: '#F6F1E7',
        cream: '#F3EDE1',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
