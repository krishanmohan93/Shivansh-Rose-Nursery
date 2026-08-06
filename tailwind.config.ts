import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          container: "var(--primary-container)",
          fixed: "var(--primary-fixed)",
          on: "var(--on-primary)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          container: "var(--secondary-container)",
          on: "var(--on-secondary)",
        },
        tertiary: {
          DEFAULT: "var(--tertiary)",
          container: "var(--tertiary-container)",
          on: "var(--on-tertiary)",
        },
        background: {
          DEFAULT: "var(--background)",
          cream: "var(--background-cream)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          lowest: "var(--surface-lowest)",
          low: "var(--surface-low)",
          default: "var(--surface-default)",
          high: "var(--surface-high)",
          highest: "var(--surface-highest)",
          glass: "var(--surface-glass)",
        },
        error: {
          DEFAULT: "var(--error)",
          container: "var(--error-container)",
        },
        outline: "var(--outline)",
        "border-leaf": "var(--border-leaf)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        button: ["var(--font-poppins)", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["56px", { lineHeight: "1.15", fontWeight: "700" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.15", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "btn-label": ["15px", { lineHeight: "1.2", fontWeight: "600" }],
        "caption-sm": ["12px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        card: "1rem",
        button: "0.75rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 69, 13, 0.08)",
        "soft-lg": "0 10px 30px -4px rgba(0, 69, 13, 0.12)",
        glass: "0 8px 32px 0 rgba(0, 69, 13, 0.1)",
      },
      scale: {
        "105": "1.05",
        "108": "1.08",
      },
    },
  },
  plugins: [],
};

export default config;
