/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        aurore: {
          green: "#009a44",
          deep: "#004d28",
          dark: "#006b31",
          soft: "#eef8f1",
          yellow: "#ffc400"
        }
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        pharma: "0 24px 80px rgba(0, 77, 40, 0.14)"
      }
    }
  },
  corePlugins: {
    preflight: false
  }
};
