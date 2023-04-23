/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    },
    extend: {
      fontSize: {
        "tiny": "0.7rem",
        "sm": "0.9rem",
        "base": "1rem",
        "md": "1.2rem",
        "xl": "1.4rem",
        "2xl": "1.6rem",
        "heading": "1.5rem",
        "sub-heading": "1.25rem"
      },
      textColor: {
        "primary-white": "#E5E7E6",
        "primary-grey": "#B7B5B3",
        "primary-red": "#B80C09",
        "primary-brown": "#6B2B06",
        "primary-black": "#141301"
      },
      colors: {
        "primary-bg-black": "#141301",
        "primary-bg-white": "#E5E7E6",
      }
    },
  },
  plugins: [],
}
