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
        accent: 'rgb(184, 43, 12)',
        // The one muted text colour: captions, labels, dates
        muted: 'rgb(19 17 16 / 0.6)'
      },
      // Two text sizes besides the headings: body for reading, small for captions and labels
      fontSize: {
        body: ['1rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }]
      },
      fontFamily: {
        display: ['"Major Mono Display"', 'monospace'],
        mono: ['"Roboto Mono"', 'monospace']
      }
    }
  },
  plugins: []
}
