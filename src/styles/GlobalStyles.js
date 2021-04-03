import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    z-index:0
  }

  html, body {
    // for automatic responsiveness of font sizes
    font-size: calc(14px + (22 - 14) * ((100vw - 300px) / (1600 - 300)));
    height:100%;
    position:relative;
  }


  body {
    background-color: ${(props) => props.theme.black};
    color: ${(props) => props.theme.white};
    font-family: 'Titillium Web', sans-serif;
  }
`;
