import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

function PageLoadingSpinner() {
  return (
    <Box sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 2, width:' 100vw' }}>
      <CircularProgress/>
      <Typography variant = 'h6'>Loading...</Typography>
    </Box>
  )
}

export default PageLoadingSpinner
