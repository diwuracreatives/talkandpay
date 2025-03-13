/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      
    },
    fontFamily: {
     
    },
    
    extend: {
      keyframes: {
        infiniteScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      }, 
     
    },
  },
  plugins: [],
}
