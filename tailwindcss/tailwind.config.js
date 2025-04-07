import typography from './config/tailwindcss-typography'

export default {
  // important set to true so the
  // @tailwindcss/typography plugin
  // can be overridden with utility
  // classes
  important: true,
  theme: {
    extend: {
      typography
    },
  }
};
