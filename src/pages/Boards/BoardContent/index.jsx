import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx = {{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.taskify.appBarHeight} - ${theme.taskify.boardBarHeight})`,
      display: 'flex',
      alignItems: 'center'
    }}>
              Board Content
    </Box>
  )
}

export default BoardContent