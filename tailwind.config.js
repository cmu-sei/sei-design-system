module.exports = {
  presets: [
    require('@sds/tailwindcss-2')
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit'
};
