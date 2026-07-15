/** @type {import('tailwindcss').Config} */
export default {
  // Wrap hover: utilities in @media (hover:hover) so taps on touch devices
  // don't leave zoomed images / lifted cards stuck in their hover state.
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Navy-forward, on-brand (logo is navy/steel). Warm bone ground + restrained bronze.
        bone: "#F4F1EA",
        "bone-dim": "#E7E2D6",
        ink: "#13181D",
        navy: {
          DEFAULT: "#102A47", // truer, deeper blue navy (was teal-leaning #14242F)
          deep: "#091526",
          soft: "#1B3A5E",
          line: "#2B4A72",
        },
        bronze: {
          DEFAULT: "#B26C3A", // copper-leaning warm metal; hairlines/dots/icons + text on navy, never gaudy
          soft: "#C68A5A",
          text: "#8F5527", // AA-safe copper for text-on-light + CTA surfaces: 5.3:1 on bone, 6.0:1 on white, 4.65:1 on bone-dim/50 blends
        },
        steel: "#8C9AA5",
      },
      fontFamily: {
        // Sturdy slab serif (Zilla Slab); body grotesque.
        display: ['"Zilla Slab"', "Georgia", "serif"],
        sans: ['"Hanken Grotesk"', "sans-serif"],
      },
      letterSpacing: {
        // Gentle tracking for the Didone display face — it crowds under heavier negative values.
        tightest: "-0.012em",
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
