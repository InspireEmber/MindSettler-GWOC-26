/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/styles/**/*.{js,jsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        schedule: {
          purple: "#2D1B5E",
          pink: "#FF4D6D",
          softPink: "#FFD6E2",
        },
      },
      borderRadius: {
        glass: "40px",
      },
      backgroundImage: {
        "schedule-mesh":
          "radial-gradient(circle at 0% 0%, rgba(244, 114, 182, 0.45), transparent 55%)," +
          "radial-gradient(circle at 100% 0%, rgba(129, 140, 248, 0.45), transparent 55%)," +
          "radial-gradient(circle at 0% 100%, rgba(249, 168, 212, 0.5), transparent 55%)," +
          "radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.35), transparent 55%)," +
          "linear-gradient(135deg, #25164B, #4C1D95, #BE185D)",
      },
      fontFamily: {
        redhat: ["var(--font-redhat)"],
      },
    },
  },
  plugins: [],
};
