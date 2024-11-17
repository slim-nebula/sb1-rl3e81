/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B5394',
          50: '#E6EEF7',
          100: '#CCDDEF',
          200: '#99BBDF',
          300: '#6699CF',
          400: '#3377BF',
          500: '#0B5394',
          600: '#094A85',
          700: '#074176',
          800: '#053867',
          900: '#042F58'
        },
        secondary: {
          DEFAULT: '#1CC88A',
          50: '#E9F9F2',
          100: '#D3F3E5',
          200: '#A7E7CB',
          300: '#7BDBB1',
          400: '#4FCF97',
          500: '#1CC88A',
          600: '#18B37C',
          700: '#149E6E',
          800: '#108960',
          900: '#0C7452'
        },
        accent: {
          DEFAULT: '#F6C23E',
          50: '#FEF9ED',
          100: '#FDF3DB',
          200: '#FCE7B7',
          300: '#FADB93',
          400: '#F8CF6F',
          500: '#F6C23E',
          600: '#E5B02D',
          700: '#D49E1C',
          800: '#C38C0B',
          900: '#B27A00'
        }
      },
      boxShadow: {
        'primary': '0 4px 14px 0 rgba(11, 83, 148, 0.15)',
        'primary-hover': '0 6px 20px 0 rgba(11, 83, 148, 0.25)',
        'secondary': '0 4px 14px 0 rgba(28, 200, 138, 0.15)',
        'secondary-hover': '0 6px 20px 0 rgba(28, 200, 138, 0.25)',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
};