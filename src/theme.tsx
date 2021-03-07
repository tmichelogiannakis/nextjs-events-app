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

const theme = extendTheme({
  fonts,
  breakpoints
});

export default theme;
