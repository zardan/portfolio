module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(229, 224, 216)',
        ink: 'rgb(19, 17, 16)',
        accent: 'rgb(184, 43, 12)'
      },
      fontFamily: {
        display: ['"Major Mono Display"', 'monospace'],
        mono: ['"Roboto Mono"', 'monospace']
      }
    }
  },
  plugins: []
}
