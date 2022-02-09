module.exports = {
  presets: [
    require('@sds/tailwindcss-3')
  ],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /col-start-(1|2|3|4|5|6|7)/,
    },
  ]
};
