import sdsBaseConfig from '@sds/tailwindcss-3'

export default {
  presets: [
    sdsBaseConfig
  ],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /col-start-(1|2|3|4|5|6|7)/,
    },
  ],
};
