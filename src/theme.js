import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
      // },
      // test components MuiCSSBaseline
      // components:{
      //   MuiCssBaseline: {
      //     styleOverrides: `
      //       div {
      //         color: grey;
      //       }
      //     `
      //   }
      // }

      // test spacing
      // spacing: (factor) => `${0.25 * factor}rem`
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
      // spacing: (factor) => `${0.25 * factor}rem`
    }
  }
  // ...other properties
})

export default theme