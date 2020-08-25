/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

const { colors } = require('tailwindcss/defaultTheme')

const localColors = {
  gray: {
    100: '#f2f2f2',
    400: '#c6c6c6',
  },
}

const localBoxShadow = {
  '2xl': '0 0 30px -10px rgba(0, 0, 0, .3)',
}

const localOpacity = {
  40: '0.4',
  60: '0.6',
}

const localTransitionDuration = {
  normal: 'var(--transition-duration)',
  0: '0ms',
}

const cssVarSpacing = {
  'gutter-1': 'var(--gutter-1)',
  'gutter-2': 'var(--gutter-2)',
  'gutter-3': 'var(--gutter-3)',
  'gutter-4': 'var(--gutter-4)',
}

const fractionSpacing = {
  '1/6': '16.667%',
  '1/5': '20%',
  '1/4': '25%',
  '1/3': '33.333%',
  '2/5': '40%',
  '1/2': '50%',
  '3/5': '60%',
  '2/3': '66.667%',
  '3/4': '75%',
  '4/5': '80%',
  '5/6': '83.333%',
  full: '100%',
  '5/4': '120%',
  '3/2': '150%',
}

const staticSpacing = {
  '100px': '100px',
}

const localTransitionProperty = {
  height: 'height, min-height, max-height',
  spacing: 'margin, padding',
}

module.exports = {
  experimental: {
    // https://github.com/tailwindlabs/tailwindcss/pull/2159
    applyComplexClasses: true,
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {
      screens: {
        mobile: { max: '599px' },
        tablet: { min: '600px', max: '899px' },
        desktop: { min: '900px' },
        'not-mobile': { min: '600px' },
        'not-desktop': { max: '899px' },
      },
      maxHeight: { ...fractionSpacing, ...staticSpacing },
      maxWidth: { ...fractionSpacing, ...staticSpacing },
      minWidth: { ...staticSpacing },
      spacing: {
        ...cssVarSpacing,
        ...fractionSpacing,
        ...staticSpacing,
      },
      transitionProperty: {
        ...localTransitionProperty,
      },
      transitionDuration: {
        ...localTransitionDuration,
      },
      boxShadow: {
        ...localBoxShadow,
      },
      colors: {
        gray: {
          ...colors.gray,
          ...localColors.gray,
        },
      },
      zIndex: {
        1: '1',
        '-1': '-1',
      },
      borderWidth: {
        3: '3px',
      },
      opacity: localOpacity,
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    bgColor: ['responsive', 'hover', 'focus', 'group-hover'],
    gradientColorStops: [
      'responsive',
      'hover',
      'focus',
      'active',
      'group-hover',
    ],
    animation: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
  },
}
