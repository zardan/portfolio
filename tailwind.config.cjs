module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#ece8e1',
        ink: '#1f1d1b',
        accent: '#e0401d'
      },
      fontFamily: {
        display: ['"Familjen Grotesk"', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace']
      }
    }
  },
  plugins: []
}
