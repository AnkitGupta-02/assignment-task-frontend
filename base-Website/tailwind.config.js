/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // "h-xs": { raw: "(max-height: 390px)" },
        // "h-sm": { raw: "(max-height: 600px)" }, // Small height
        // "h-md": { raw: "(max-height: 800px)" }, // Medium height
        // "w-xs": { raw: "(max-width: 450px)" },
        // "w-sm": { raw: "(max-width: 750px)" },
        // "w-md": { raw: "(min-width: 768px) and (max-width: 1025px)" }
      },
      // backgroundImage: {
      //   loginBG: "url('/login.webp')",
      //   signupBG: "url('/signup.webp')",
      // },
    },
  },
  plugins: [],
};

