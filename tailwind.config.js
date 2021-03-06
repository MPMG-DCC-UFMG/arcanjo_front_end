module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)"
      },
      boxShadow: {
        'card': '0px 8px 16px rgba(0, 0, 0, 0.08)',
      },
      height: {
        'log': 'calc(100vh - 340px)'
      }
    },
  },
  plugins: [],
}
