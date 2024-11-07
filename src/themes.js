import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const LIST_HEADER_HEIGHT = '50px'
const LIST_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
  taskify: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    listHeaderHeight: LIST_HEADER_HEIGHT,
    listFooterHeight: LIST_FOOTER_HEIGHT
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': { width: '8px', height: '8px' },
          '*::-webkit-scrollbar-thumb': { backgroundColor: '#dcdde1', borderRadius: '8px' },
          '*::-webkit-scrollbar-thumb:hover': { backgroundColor: 'white' }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': {
            borderWidth: '1px'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '0.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          },
          '& fieldset': { borderWidth: '1px !important' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' }
        })
      }
    }
  }
})

export default theme
