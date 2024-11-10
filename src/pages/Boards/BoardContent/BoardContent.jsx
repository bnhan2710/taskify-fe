import Box from '@mui/material/Box'
import ColumnLists from './ColumnLists/ColumnsLists'
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {

  const pointerSensor = useSensor(PointerSensor)
  const sensors = useSensors(pointerSensor)

  const [oderedLists, setOrderedLists] = useState([])

  useEffect(() => {
    setOrderedLists(mapOrder( board?.lists, board?.listOrderIds, 'id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('handleDragEnd', event)
    const { active, over } = event
    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = oderedLists.findIndex(list => list.id === active.id)
      const newIndex = oderedLists.findIndex(list => list.id === over.id)

      const dndOrderedLists = arrayMove(oderedLists, oldIndex, newIndex)
      // using for backend save new order to database
      // const dndOrderedListsIds = dndOrderedLists.map(list => list.id)

      // console.log('dndOrderedLists', dndOrderedLists)
      // console.log('dndOrderedListsIds', dndOrderedListsIds)

      setOrderedLists(dndOrderedLists)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} >
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#0093E9' : '#1976d2'),
          background:(themes) => themes.palette.mode === 'dark' ? 'linear-gradient(160deg, #0b3e76 0%, #10559a 10%, #125998 20%, #145b97 30%, #165f95 40%, #176294 50%, #186593 60%, #1b6891 70%, #1c6b90 80%, #1f728e 100%)' : 'linear-gradient(90deg, rgba(14,0,252,1) 0%, rgba(52,52,198,1) 0%, rgba(50,57,200,1) 34%, rgba(0,212,255,1) 100%)',
          width: '100%',
          height: (theme) => theme.taskify.boardContentHeight,
          p:'10px 0',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}>
        <ColumnLists lists = {oderedLists} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
