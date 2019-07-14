import { createGlobalStyle } from 'styled-components'
import colors from 'constants/colors'

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: monospace;
    -webkit-app-region: drag
    height: 100%;
    overflow: hidden;
  }
  body {
    background-color: ${colors.backgroundColor};
    color: ${colors.textColor};
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0
  }
  #root {
    height: 100%;
    width: 100%;
  }
`
