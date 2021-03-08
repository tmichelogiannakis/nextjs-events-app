import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = {
  body: 'Roboto, "sans-serif"',
  heading: 'Roboto, "sans-serif"'
};

const breakpoints = createBreakpoints({
  sm: '37.5em',
  md: '52.5em',
  lg: '64em',
  xl: '80em'
});

const colors = {
  primary: {
    '50': '#E6FFFA',
    '100': '#B2F5EA',
    '200': '#81E6D9',
    '300': '#4FD1C5',
    '400': '#38B2AC',
    '500': '#319795',
    '600': '#2C7A7B',
    '700': '#285E61',
    '800': '#234E52',
    '900': '#1D4044'
  }
};

const Alert = {
  baseStyle: { container: { borderRadius: 'md' } }
};

const Text = {
  baseStyle: { lineHeight: 'normal', fontSize: 'md' }
};

const components = { Alert, Text };

const theme = extendTheme({
  colors,
  fonts,
  breakpoints,
  radii: {
    md: '0.25rem'
  },
  components
});

export default theme;
