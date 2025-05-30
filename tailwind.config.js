// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "pulse-light": "pulseLight 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
        "pulse-medium": "pulseMedium 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
        "pulse-slow": "pulseSlow 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
        "float-spin": "float 8s ease-in-out infinite, spin 12s linear infinite;",
        "float-bubble": "floatBubble 6s ease-in-out infinite;",
        "fade-in-up": "fadeInUp 1s ease-out forwards;",
        "fade-in-right": "fadeInRight 1s ease-out forwards;",
        "fade-in-left": "fadeInLeft 1s ease-out forwards;",
        "slide-in-left": "slideInLeft 1s ease-out forwards;",
        "slide-in-right": "slideInRight 1s ease-out forwards;",
        "scale-in-out": "scaleInOut 4s ease-in-out infinite;"
      },
      keyframes: {
        pulseLight: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
        pulseMedium: {
          "0%, 100%": { transform: "scale(1)", opacity: 0.7 },
          "50%": { transform: "scale(1.05)", opacity: 1 },
        },
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)", opacity: 0.1 },
          "50%": { transform: "scale(1.03)", opacity: 0.15 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        floatBubble: {
            "0%, 100%": { transform: "translateY(0) scale(1)" },
            "25%": { transform: "translateY(-15px) scale(1.02)" },
            "50%": { transform: "translateY(0) scale(0.98)" },
            "75%": { transform: "translateY(15px) scale(1.02)" },
        },
        fadeInUp: {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInRight: {
            "0%": { opacity: 0, transform: "translateX(20px)" },
            "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInLeft: {
            "0%": { opacity: 0, transform: "translateX(-20px)" },
            "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideInLeft: {
            "0%": { opacity: 0, transform: "translateX(-50px)" },
            "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideInRight: {
            "0%": { opacity: 0, transform: "translateX(50px)" },
            "100%": { opacity: 1, transform: "translateX(0)" },
        },
        scaleInOut: {
            "0%, 100%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.05)" },
        }
      },
    },
  },
  plugins: [],
};