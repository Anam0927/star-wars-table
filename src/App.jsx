import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

import StarField from './components/StarField';
import Header from './components/Header';
import TableContainer from './containers/TableContainer';

const App = () => {
  const [logoAnimDone, setLogoAnimDone] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StarField />
      <Header logoAnimDone={logoAnimDone} setLogoAnimDone={setLogoAnimDone} />
      <TableContainer logoAnimDone={logoAnimDone} />
    </ThemeProvider>
  );
};

export default App;
