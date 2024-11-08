import Box from '@mui/material/Box'
import ColumnLists from './ColumnLists/ColumnsLists'
function BoardContent({ board }) {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0093E9' : '#1976d2'),
        background:(themes) => themes.palette.mode === 'dark' ? 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' : 'linear-gradient(90deg, rgba(14,0,252,1) 0%, rgba(52,52,198,1) 0%, rgba(50,57,200,1) 34%, rgba(0,212,255,1) 100%)',
        width: '100%',
        height: (theme) => theme.taskify.boardContentHeight,
        p:'10px 0',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}
    >
      <ColumnLists lists = {board?.lists} />
    </Box>
  )
}

export default BoardContent
