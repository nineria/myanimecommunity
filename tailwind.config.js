module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: ({ opacityVariable }) =>
          `rgba(var(--accent) / var(${opacityVariable}))`,
        title: ({ opacityVariable }) =>
          `rgba(var(--title) / var(${opacityVariable}))`,
        content: ({ opacityVariable }) =>
          `rgba(var(--content) / var(${opacityVariable}))`,
        foreground: ({ opacityVariable }) =>
          `rgba(var(--foreground) / var(${opacityVariable}))`,
        background: ({ opacityVariable }) =>
          `rgba(var(--background) / var(${opacityVariable}))`,
        edge: ({ opacityVariable }) =>
          `rgba(var(--edge) / var(${opacityVariable}))`,
      },
    },
  },
  plugins: [],
};
