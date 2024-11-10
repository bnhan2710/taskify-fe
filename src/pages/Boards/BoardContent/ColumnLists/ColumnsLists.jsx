import Box from '@mui/material/Box'
import List from './List/List'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
function ColumnLists({ lists }) {
  // SortableContet require items is array with form ['id-1', 'id-2', 'id-3', ...]
  // if wrong format we can drag and drop but not don't see the animation

  return (
    <SortableContext items={lists?.map(list => list.id)} strategy={horizontalListSortingStrategy} >
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
        { lists?.map( list =>
          <List key={list.id} list={list}/>
        )}

        {/* add new List Button */}
        <Box sx ={{
          minWidth:'200px',
          maxWidth:'300px',
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
    </SortableContext>
  )
}

export default ColumnLists
