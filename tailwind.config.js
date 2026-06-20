/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#060810",
        surface: "#0D1117",
        border: "#1C2333",
        "accent-blue": "#4F8EF7",
        "accent-purple": "#8B5CF6",
        "accent-green": "#10B981",
        "text-primary": "#F0F6FF",
        "text-secondary": "#8B9EC7",
      },
      fontFamily: {
        display: ['"Space Mono"', "monospace"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}