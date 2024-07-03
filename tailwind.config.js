/** @type {import('tailwindcss').Config} */
module.exports = {



  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {animation: {
      'road-scroll': 'roadScroll 1s linear infinite',
    },
    keyframes: {
      roadScroll: {
        '0%': { transform: 'translateY(0)' },
        '100%': { transform: 'translateY(20%)' },
      }
    }},
  },
  plugins: [],
}

