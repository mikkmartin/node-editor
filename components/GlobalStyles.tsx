import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle<any>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    --highlight: #007AFF;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";;
  }
`
