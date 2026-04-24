/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-main)',
        'bg-header': 'var(--bg-header)',
        course: {
          'card-begin': 'var(--cc-begin)',
          'card-end': 'var(--cc-end)',
          'grid': 'var(--course-grid)',
          'grid-stroke': 'var(--course-stroke)',
        },
        text: {
          main: 'var(--text-main)',
          neg: 'var(--text-neg)',
        },
        surface2: '#F2F5FF',
        primary: {
          50: '#EAF0FF',
          100: '#D9E4FF',
          200: '#B7CBFF',
          500: '#1E4BFF',
          600: '#173FE0',
          700: '#1437C2',
        },
        success: {
          begin: 'var(--success-begin)',
          end: 'var(--success-end)',
        },
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}