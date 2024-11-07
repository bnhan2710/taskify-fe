import Box from '@mui/material/Box'
import List from './List/List'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
function ColumnLists() {

  return (
    <Box
      sx={{
        bgcolor:'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '*::-webkit-scrollbar-track': { m:2 }
      }}>
      {/* box01 */}
      <List />
      {/* box02 */}
      <List />
      <List />
      <List />
      <List />



      {/* add new List Button */}
      <Box sx ={{
        minWidth:'200px',
        maxWidth:'200px',
        mx:2,
        borderRadius: '6px',
        height: 'fit-content',
        bgcolor: '#ffffff5d'
      }}>
        <Button startIcon={<AddIcon/>} sx={{
          color:'white',
          width:'100%',
          justifyContent:'flex-start',
          pl:2.5,
          py:1
        }} >
            Add another list</Button>
      </Box>
    </Box>
  )
}

export default ColumnLists
