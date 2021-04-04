import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    z-index:0
  }

  html, body {
    // -- for automatic responsiveness of font sizes
    font-size: calc(14px + (22 - 14) * ((100vw - 300px) / (1600 - 300)));
    min-height:100%;
    position:relative;
    overflow-x:hidden;
  }

  ::-webkit-appearance: none;


  body {
    background-color: ${(props) => props.theme.black};
    color: ${(props) => props.theme.white};
    font-family: 'Titillium Web', sans-serif;
    padding: 2rem 1rem;
    min-height:100vh;
  }

  body::-webkit-scrollbar{
    width:8px;
  }
  body::-webkit-scrollbar-track {
    background: transparent;
  }
  body::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
    border: none;
    transition: 0.3s;
    box-shadow: inset 0 0 6px ${(props) => props.theme.yellow};
  }
  body {
    scrollbar-width: thin;
    scrollbar-color: ${(props) => props.theme.yellow} transparent;
  }
`;
