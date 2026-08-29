/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5F259F",
          dk: "#3D1466",
          lt: "#7B3BB8",
        },
        bg: "#F4F4F6",
        card: "#FFFFFF",
        received: "#16A34A",
        paid: "#DC2626",
        lent: "#2563EB",
        borrowed: "#EA580C",
        text1: "#111827",
        text2: "#6B7280",
        border: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
        plus: "0 4px 16px rgba(95,37,159,0.4)",
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
      },
    },
  },
  plugins: [],
};
