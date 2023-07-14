const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents, theme }) {
  const components = {
    /**
     * Base megamenu class
     */

    ".top-level-link": {
      "@apply select-none whitespace-nowrap flex items-center text-gray-700 text-sm py-3 px-4 w-full font-semibold": {},
      "--tab-variant": theme("colors.gray.300"),
      "--tab-on-variant": theme("colors.gray.100"),
      ".dark &": {
        "@apply text-gray-100": {},
        "--tab-variant": theme("colors.gray.100"),
        "--tab-on-variant": theme("colors.gray.900"),
      },
      ".dark &:not([class*=top-level-link-])": {
        "@apply text-gray-100": {},
        "--tab-variant": theme("colors.gray.100"),
        "--tab-on-variant": theme("colors.gray.900"),
      },
    },

    /**
     * Color variants
     */

    ".top-level-link-light": {
      "@apply text-gray-700": {},
      "--tab-variant": theme("colors.gray.200"),
      "--tab-on-variant": theme("colors.gray.900"),

      ".dark &": {
        "@apply text-gray-700": {},
        "--tab-variant": theme("colors.gray.100"),
        "--tab-on-variant": theme("colors.gray.900"),
      },
    },

    ".top-level-link-dark": {
      "@apply text-gray-300": {},
      "--tab-variant": theme("colors.gray.800"),
      "--tab-on-variant": theme("colors.gray.100"),

      ".dark &": {
        "@apply text-gray-300": {},
        "--tab-variant": theme("colors.gray.700"),
        "--tab-on-variant": theme("colors.gray.100"),
      },
    },

    ".top-level-link-white": {
      "--tab-variant": theme("colors.white"),
      "--tab-on-variant": theme("colors.gray.900"),
    },

    ".top-level-link-black": {
      "--tab-variant": theme("colors.black"),
      "--tab-on-variant": theme("colors.gray.100"),
    },

    ".top-level-link-blue, .top-level-link-primary": {
      "--tab-variant": theme("colors.blue.600"),
      "--tab-on-variant": theme("colors.white"),
      ".dark &": {
        "--tab-variant": theme("colors.blue.400"),
      }
    },

    ".top-level-link-green, .top-level-link-success": {
      "--tab-variant": theme("colors.green.500"),
      "--tab-on-variant": theme("colors.white"),
      ".dark &": {
        "--tab-variant": theme("colors.green.400"),
      }
    },

    ".top-level-link-indigo": {
      "--tab-variant": theme("colors.indigo.500"),
      "--tab-on-variant": theme("colors.white"),
      ".dark &": {
        "--tab-variant": theme("colors.indigo.400"),
      }
    },

    ".top-level-link-orange, .top-level-link-warning": {
      "--tab-variant": theme("colors.orange.500"),
      "--tab-on-variant": theme("colors.black"),
      ".dark &": {
        "--tab-variant": theme("colors.orange.700"),
      }
    },

    ".top-level-link-pink": {
      "--tab-variant": theme("colors.pink.700"),
      "--tab-on-variant": theme("colors.white"),
      ".dark &": {
        "--tab-variant": theme("colors.pink.400"),
      }
    },

    ".top-level-link-purple": {
      "--tab-variant": theme("colors.purple.500"),
      "--tab-on-variant": theme("colors.white"),
      ".dark &": {
        "--tab-variant": theme("colors.purple.400"),
      }
    },

    ".top-level-link-red, .top-level-link-danger": {
      "--tab-variant": theme("colors.red.500"),
      "--tab-on-variant": theme("colors.white"),
      ".dark &": {
        "--tab-dark-variant": theme("colors.red.300"),
        "--tab-variant": theme("colors.red.800"),
        "--tab-on-variant": theme("colors.white"),
      }
    },

    ".top-level-link-teal, .top-level-link-info": {
      "--tab-variant": theme("colors.teal.500"),
      "--tab-on-variant": theme("colors.white"),
      ".dark &": {
        "--tab-variant": theme("colors.teal.400"),
      }
    },

    ".top-level-link-yellow": {
      "--tab-variant": theme("colors.yellow.900"),
      "--tab-on-variant": theme("colors.black"),
      ".dark &": {
        "--tab-variant": theme("colors.yellow.800"),
      }
    },

    /**
     * Core styles
     */

    ".top-level-link:hover, .top-level-link:active": {
      color: "var(--tab-dark-variant, --tab-variant)",
    },

    ".top-level-link:active": {
      "filter": "brightness(90%)",
    },

    ".top-level-link.active": {
      color: "var(--tab-dark-variant, --tab-variant)",
    },

    ".top-level-link.disabled, .top-level-link[disabled]": {
      "@apply opacity-50 pointer-events-none": {},
    },

    ".top-level-link:not([class*=top-level-link-]):hover, .top-level-link:not([class*=top-level-link-]):active": {
      "@apply text-gray-900": {},
      ".dark &": {
        "@apply text-white": {},
      },
    },

    ".top-level-link:not([class*=top-level-link-]).active": {
      "@apply text-gray-900": {},
      ".dark &": {
        "@apply text-gray-100": {},
      },
    },

    /**
     * Types
     */

    /* Underline type */

    ".top-level-link-underline": {
      "@apply pt-3 pb-2 border-b-2 border-transparent rounded-none": {},
      color: "var(--tab-variant)",
      ".dark &": {
        color: "var(--tab-dark-variant, --tab-variant)",
      }
    },

    ".top-level-link-underline:hover, .top-level-link-underline:active": {
      "@apply text-gray-900 border-gray-900 dark:text-gray-100 dark:border-gray-100": {},
    },

    ".top-level-link-underline.active": {
      "@apply text-gray-900 border-gray-900 dark:text-gray-100 dark:border-gray-100": {},
    },

    /* Overline type */

    ".top-level-link-overline": {
      "@apply pt-2 pb-3 border-t-2 border-transparent rounded-none": {},
      color: "var(--tab-variant)",
      ".dark &": {
        color: "var(--tab-variant)",
      }
    },

    ".top-level-link-overline:hover, .top-level-link-overline:active": {
      "@apply text-gray-900 border-gray-900 dark:text-gray-100 dark:border-gray-100": {},
    },

    ".top-level-link-overline.active": {
      "@apply text-gray-900 border-gray-900 dark:text-gray-100 dark:border-gray-100": {},
    },

    /* Pill type */

    ".top-level-link-pill:hover, .top-level-link-pill:active": {
      "@apply rounded": {},
      color: "var(--tab-on-variant)",
      backgroundColor: "var(--tab-variant)",
    },

    ".top-level-link-pill.active": {
      "@apply rounded": {},
      color: "var(--tab-on-variant)",
      backgroundColor: "var(--tab-variant)",
    },

    /* Block type */

    ".top-level-link-block:hover, .top-level-link-block:active": {
      "@apply rounded-none": {},
      color: "var(--tab-on-variant)",
      backgroundColor: "var(--tab-variant)",
    },

    ".top-level-link-block.active": {
      "@apply rounded-none": {},
      color: "var(--tab-on-variant)",
      backgroundColor: "var(--tab-variant)",
    },

    /**
     * tab groups
     */

    ".top-level-link-group": {
      "@apply grid grid-flow-col": {},
      gridAutoColumns: "min-content",
    },
  };

  addComponents(components);
});
