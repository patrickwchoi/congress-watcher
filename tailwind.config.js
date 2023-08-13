/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        'sans': ['Times New Roman', 'serif'],
      },
      colors: {
        'blue-link': '#2a548c',
      },
      backgroundColor: {
        'primary': 'var(--primary-color)',
        'primary-hover': 'var(--primary-hover)',
        'secondary': 'var(--secondary-color)',
        'primary-dark': 'var(--primary-dark)',
        // 'accent': 'var(--accent-color)'
    },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
