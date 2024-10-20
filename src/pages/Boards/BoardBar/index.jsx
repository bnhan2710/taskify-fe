import Box from '@mui/material/Box'
function BoardBard() {
  return (
    <Box sx = {{
      backgroundColor: 'primary.dark',
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
              Boad Bar
    </Box>
  )
}

export default BoardBard