import plugin from 'tailwindcss/plugin'

export default plugin(function ({ addUtilities, addVariant, theme }) {
  const newUtilities = {
    ".table-prose": {
      width: '100%',
      tableLayout: 'auto',
      textAlign: 'left',
      // regular
      '--table-prose-thead-border-color': theme('colors.gray.100'),
      '--table-prose-thead-th-color': theme('colors.gray.600'),
      '--table-prose-thead-th-bg-color': theme('colors.gray.25'),
      '--table-prose-tbody-tr-border-color': theme('colors.gray.100'),
      '--table-prose-tbody-tr-bg-color': theme('colors.white'),
      // invert
      '--table-prose-invert-thead-border-color': theme('colors.gray.700'),
      '--table-prose-invert-thead-th-color': theme('colors.gray.400'),
      '--table-prose-invert-thead-th-bg-color': 'theme(colors.gray.800 / 30%)',
      '--table-prose-invert-tbody-tr-border-color': theme('colors.gray.800'),
      '--table-prose-invert-tbody-tr-bg-color': theme('colors.gray.900'),
    },
    ".table-prose thead": {
      borderTopWidth: '1px',
      borderTopColor: 'var(--table-prose-thead-border-color)',
      borderBottomWidth: '1px',
      borderBottomColor: 'var(--table-prose-thead-border-color)',
    },
    '.table-prose thead th': {
      color: 'var(--table-prose-thead-th-color)',
      backgroundColor: 'var(--table-prose-thead-th-bg-color)',
      fontWeight: theme('fontWeight.bold'),
      fontSize: theme('fontSize.sm'),
      verticalAlign: 'bottom',
      padding: theme('padding.2'),
      position: 'relative',
      userSelect: 'none',
    },
    '.table-prose tbody tr': {
      backgroundColor: 'var(--table-prose-tbody-tr-bg-color)',
      borderBottomWidth: '1px',
      borderBottomColor: 'var(--table-prose-tbody-tr-border-color)',
    },
    '.table-prose tbody tr:last-child': {
      borderBottomWidth: '0',
    },
    '.table-prose tbody td': {
      verticalAlign: 'top',
      padding: theme('padding.2'),
      position: 'relative',
    },
    // lg
    '.table-prose-lg thead th': {
      fontSize: theme('fontSize.sm'),
      padding: theme('padding.4'),
    },
    '.table-prose-lg tbody td': {
      padding: theme('padding.4'),
    },
    // invert
    ".table-prose-invert thead": {
      borderTopColor: 'var(--table-prose-invert-thead-border-color)',
      borderBottomColor: 'var(--table-prose-invert-thead-border-color)',
    },
    '.table-prose-invert thead th': {
      color: 'var(--table-prose-invert-thead-th-color)',
      backgroundColor: 'var(--table-prose-invert-thead-th-bg-color)',
    },
    '.table-prose-invert tbody tr': {
      backgroundColor: 'var(--table-prose-invert-tbody-tr-bg-color)',
      borderBottomColor: 'var(--table-prose-invert-tbody-tr-border-color)',
    },
  };

  addVariant(`table-prose-th`, `:is(& th, & thead th)`)
  addVariant(`table-prose-td`, `:is(& td, & tbody td)`)

  addUtilities(newUtilities, ['dark', 'responsive']);
});
