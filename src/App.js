import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

import StarField from './components/StarField';
import Header from './components/Header';
import TableContainer from './containers/TableContainer';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StarField />
      <Header />
      <TableContainer />
    </ThemeProvider>
  );
};

export default App;
