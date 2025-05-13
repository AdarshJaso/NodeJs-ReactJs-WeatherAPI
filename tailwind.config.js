import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [tailwind, autoprefixer],
};
