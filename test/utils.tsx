import { FC } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

export const ThemeWrapper: FC = ({ children }) => (
  <ChakraProvider resetCSS>
    <ColorModeScript />({children}
  </ChakraProvider>
);
