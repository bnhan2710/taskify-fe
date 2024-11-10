import Box from '@mui/material/Box'
import ColumnLists from './ColumnLists/ColumnsLists'
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import List from './ColumnLists/List/List'
import Card from './ColumnLists/List/ListCards/Card/Card'
const ACTIVE_DRAG_ITEM_TYPE = {
  LIST: 'ACTIVE_DRAG_ITEM_TYPE_LIST',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  const pointerSensor = useSensor(PointerSensor)
  const sensors = useSensors(pointerSensor)

  const [oderedLists, setOrderedLists] = useState([])

  //only 1 item can be dragged at a time
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedLists(mapOrder( board?.lists, board?.listOrderIds, 'id'))
  }, [board])

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current.listId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.LIST)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragEnd = (event) => {
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
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd} >
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
        <DragOverlay dropAnimation={ dropAnimation }>
          {!activeDragItemType && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.LIST) && <List list = {activeDragItemData} isPreview />}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card = {activeDragItemData} isPreview />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
