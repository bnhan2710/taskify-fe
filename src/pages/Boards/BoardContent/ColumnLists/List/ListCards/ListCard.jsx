import Box from '@mui/material/Box'
import Card from './Card/Card'
function ListCard() {
  return (
    <Box sx={{
      p: '0 5px',
      m: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX:'hidden',
      overflowY:'auto',
      maxHeight:(theme) => `calc(${theme.taskify.boardContentHeight} - ${theme.spacing(5)} - ${theme.listHeaderHeight} - ${theme.listFooterHeight})`,
      '*::-webkit-scrollbar-thumb': { backgroundColor: '#9EACBA', borderRadius: '8px' },
      '*::-webkit-scrollbar-thumb:hover': { backgroundColor: '#9EACBA' }
    }}>
      {/* Card */}
      <Card/>
      <Card temporaryHideMedia/>
    </Box>
  )
}

export default ListCard