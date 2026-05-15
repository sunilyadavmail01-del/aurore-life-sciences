/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        aurore: {
          green: "#009a44",
          emerald: "#00a85a",
          deep: "#004d28",
          forest: "#063f27",
          dark: "#006b31",
          mint: "#dff5e8",
          soft: "#eef8f1",
          silver: "#dce5de",
          warm: "#fbfdf8",
          yellow: "#ffc400"
        }
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"]
      },
      boxShadow: {
        pharma: "0 24px 80px rgba(0, 77, 40, 0.14)",
        "pharma-glass": "0 22px 70px rgba(0, 77, 40, 0.18)"
      },
      backgroundImage: {
        "aurore-enterprise": "linear-gradient(135deg, #004d28 0%, #006b31 48%, #009a44 100%)",
        "aurore-atmospheric": "radial-gradient(circle at 78% 18%, rgba(255, 196, 0, 0.2), transparent 30%), linear-gradient(135deg, rgba(0, 77, 40, 0.92), rgba(0, 154, 68, 0.78))"
      }
    }
  },
  corePlugins: {
    preflight: false
  }
};
