
import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
        // Add other palette properties here
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
        // Add other palette properties here
      }
    }
  }

})
export default theme