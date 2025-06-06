import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
function ListCard({ cards }) {
  return (
    <SortableContext items={cards?.map(card => card.id)} strategy={verticalListSortingStrategy} >
      <Box sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX:'hidden',
        overflowY:'auto',
        maxHeight: theme => `calc(${theme.taskify.boardContentHeight} - ${theme.spacing(5)} - ${theme.taskify.listHeaderHeight} - ${theme.taskify.listFooterHeight})`,
        '*::-webkit-scrollbar-thumb': { backgroundColor: '#9EACBA', borderRadius: '8px' },
        '*::-webkit-scrollbar-thumb:hover': { backgroundColor: '#9EACBA' }
      }}>
        {/* Card */}
        {cards?.map(card => <Card key={card.id} card = {card} />)}
      </Box>
    </SortableContext>
  )
}

export default ListCard