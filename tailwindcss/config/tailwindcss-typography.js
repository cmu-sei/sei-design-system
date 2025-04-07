export default (theme) => ({
  DEFAULT: {
    css: {
      // regular
      '--tw-prose-body': theme("colors.gray.900"),
      '--tw-prose-headings': theme("colors.gray.800"),
      '--tw-prose-links': theme("colors.gray.700"),
      '--tw-prose-lead': theme("colors.gray.500"),
      '--tw-prose-bold': theme("colors.gray.900"),
      '--tw-prose-counters': theme("colors.gray.900"),
      '--tw-prose-bullets': theme("colors.gray.900"),
      '--tw-prose-hr': theme("colors.gray.300"),
      '--tw-prose-quotes': theme("colors.gray.900"),
      '--tw-prose-quote-borders': theme("colors.gray.300"),
      '--tw-prose-captions': theme("colors.gray.900"),
      '--tw-prose-code': theme("colors.black"),
      '--tw-prose-pre-code': theme("colors.black"),
      '--tw-prose-pre-bg': theme("colors.gray.100"),
      '--tw-prose-th-borders': theme("colors.gray.200"),
      '--tw-prose-td-borders': theme("colors.gray.100"),
      // invert
      '--tw-prose-invert-body': theme("colors.gray.100"),
      '--tw-prose-invert-headings': theme("colors.gray.200"),
      '--tw-prose-invert-links': theme("colors.gray.300"),
      '--tw-prose-invert-lead': theme("colors.gray.400"),
      '--tw-prose-invert-bold': theme("colors.gray.100"),
      '--tw-prose-invert-counters': theme("colors.gray.100"),
      '--tw-prose-invert-bullets': theme("colors.gray.100"),
      '--tw-prose-invert-hr': theme("colors.gray.700"),
      '--tw-prose-invert-quotes': theme("colors.gray.100"),
      '--tw-prose-invert-quote-borders': theme("colors.gray.700"),
      '--tw-prose-invert-captions': theme("colors.gray.100"),
      '--tw-prose-invert-code': theme("colors.white"),
      '--tw-prose-invert-pre-code': theme("colors.white"),
      '--tw-prose-invert-pre-bg': theme("colors.gray.800"),
      '--tw-prose-invert-th-borders': theme("colors.gray.200"),
      '--tw-prose-invert-td-borders': theme("colors.gray.800"),
      h1: {
        fontSize: '2.44rem',
        lineHeight: '2.8rem',
        marginTop: '0',
        marginBottom: '1rem',
        fontWeight: '700',
        letterSpacing: '-0.2px',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '700',
        }
      },
      h2: {
        fontSize: '1.7rem',
        lineHeight: '2.1rem',
        marginTop: '2.5rem',
        marginBottom: '0.7rem',
        fontWeight: '700',
        letterSpacing: '-0.18px',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '700',
        }
      },
      h3: {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        marginTop: '2rem',
        marginBottom: '0.5rem',
        fontWeight: '700',
        letterSpacing: '-0.18px',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '700',
        }
      },
      'h2 + h3': {
        marginTop: '1.5rem'
      },
      h4: {
        fontSize: '1rem',
        lineHeight: '1.38rem',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '600',
        }
      },
      'h3 + h4': {
        marginTop: '1.5rem'
      },
      h5: {
        fontSize: '0.8rem',
        lineHeight: '1.13rem',
        marginTop: '1.4rem',
        marginBottom: '0.5rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '600',
        }
      },
      'h4 + h5': {
        marginTop: '1.5rem'
      },
      p: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        fontWeight: '400'
      },
      'ul, ol': {
        margin: '0'
      },
      'li': {
        margin: '0'
      },
      'ul > li p': {
        marginTop: '0.33rem',
        marginBottom: '0.33rem',
      },
      'th': {
        fontWeight: '700'
      },
      'th, td': {
        padding: '0.5rem'
      },
      a: {
        '@apply hover:text-gray-900 dark:hover:text-gray-200': {}
      },
    },
  },
  base: {
    css: {
      h1: {
        fontSize: '2.44rem',
        lineHeight: '2.8rem',
        marginTop: '0',
        marginBottom: '1rem',
        fontWeight: '700',
        letterSpacing: '-0.2px',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '700',
        }
      },
      h2: {
        fontSize: '1.7rem',
        lineHeight: '2.1rem',
        marginTop: '2.5rem',
        marginBottom: '0.7rem',
        fontWeight: '700',
        letterSpacing: '-0.18px',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '700',
        }
      },
      h3: {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
        marginTop: '2rem',
        marginBottom: '0.5rem',
        fontWeight: '700',
        letterSpacing: '-0.18px',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '700',
        }
      },
      'h2 + h3': {
        marginTop: '1.5rem'
      },
      h4: {
        fontSize: '1rem',
        lineHeight: '1.38rem',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '600',
        }
      },
      'h3 + h4': {
        marginTop: '1.5rem'
      },
      h5: {
        fontSize: '0.8rem',
        lineHeight: '1.13rem',
        marginTop: '1.4rem',
        marginBottom: '0.5rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        a: {
          "@apply text-current no-underline hover:underline": {},
          fontWeight: '600',
        }
      },
      'h4 + h5': {
        marginTop: '1.5rem'
      },
      p: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        fontWeight: '400'
      },
      'ul, ol': {
        margin: '0'
      },
      'li': {
        margin: '0'
      },
      'ul > li p': {
        marginTop: '0.33rem',
        marginBottom: '0.33rem',
      },
      'th': {
        fontWeight: '700'
      },
      'th, td': {
        padding: '0.5rem'
      },
      a: {
        '@apply hover:text-gray-900 dark:hover:text-gray-200': {}
      },
      'b a, strong a, a b, a strong': {
        fontWeight: '700'
      }
    }
  },
  blue: {
    css: {
      '--tw-prose-links': theme("colors.blue.600"),
      '--tw-prose-invert-links': theme("colors.blue.400"),
      a: {
        '@apply hover:text-blue-500 dark:hover:text-blue-200': {}
      },
    },
  },
  green: {
    css: {
      '--tw-prose-links': theme("colors.green.600"),
      '--tw-prose-invert-links': theme("colors.green.400"),
      a: {
        '@apply hover:text-blue-500 dark:hover:text-green-200': {}
      },
    },
  },
  teal: {
    css: {
      '--tw-prose-links': theme("colors.teal.600"),
      '--tw-prose-invert-links': theme("colors.teal.400"),
      a: {
        '@apply hover:text-blue-500 dark:hover:text-teal-200': {}
      },
    },
  },
  orange: {
    css: {
      '--tw-prose-links': theme("colors.orange.600"),
      '--tw-prose-invert-links': theme("colors.orange.400"),
      a: {
        '@apply hover:text-blue-500 dark:hover:text-orange-200': {}
      },
    },
  },
  red: {
    css: {
      '--tw-prose-links': theme("colors.red.600"),
      '--tw-prose-invert-links': theme("colors.red.300"),
      a: {
        '@apply hover:text-red-500 dark:hover:text-red-200': {}
      },
    },
  },
});
