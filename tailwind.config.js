/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Navy-forward, on-brand (logo is navy/steel). Warm bone ground + restrained bronze.
        bone: "#F4F1EA",
        "bone-dim": "#E7E2D6",
        ink: "#13181D",
        navy: {
          DEFAULT: "#14242F",
          deep: "#0D1A23",
          soft: "#1D3140",
          line: "#2B4254",
        },
        bronze: {
          DEFAULT: "#B6864B", // warm, restrained; used in hairlines/labels/hover, never gaudy
          soft: "#C9A26A",
        },
        steel: "#8C9AA5",
      },
      fontFamily: {
        // High-contrast display serif with clean f/g; body grotesque.
        display: ['"DM Serif Display"', "serif"],
        sans: ['"Hanken Grotesk"', "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
      boxShadow: {
        // warm, navy-tinted (not default cool gray) so lift feels native to the bone ground
        card: "0 1px 3px rgba(19,24,29,0.04), 0 14px 30px -16px rgba(19,24,29,0.14)",
        "card-hover": "0 6px 14px rgba(19,24,29,0.06), 0 28px 50px -20px rgba(20,36,48,0.30)",
      },
    },
  },
  plugins: [],
};
