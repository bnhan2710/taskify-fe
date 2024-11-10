import Box from '@mui/material/Box'
import ColumnLists from './ColumnLists/ColumnsLists'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import List from './ColumnLists/List/List'
import Card from './ColumnLists/List/ListCards/Card/Card'
import { cloneDeep } from 'lodash'
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

  const [orderedLists, setOrderedLists] = useState([])

  //only 1 item can be dragged at a time
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedLists(mapOrder( board?.lists, board?.listOrderIds, 'id'))
  }, [board])

  const findListByCardId = (cardId) => {
    return orderedLists.find(list => list?.cards?.some(card => card.id === cardId))
  }
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current.listId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.LIST)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event) => {
    //if dragging list, do nothing
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.LIST) return
    //if dragging card
    const { active, over } = event
    if (!active || !over) return
    //active is the card being dragged
    const { id: activeDragingCardId, data : { current: activeDraggingCardData } } = active
    //over is the card under the dragged card
    const { id: overCardId } = over
    //find 2 lists that contain cardId and overCardId
    const activeList = findListByCardId(activeDragingCardId)
    const overList = findListByCardId(overCardId)

    if (!overList || !activeList) return

    if (activeList.id !== overList.id) {
      setOrderedLists(prevList => {
        //find index of overCardId in overList
        const overCardIndex = overList.cards.findIndex(card => card.id === overCardId)

        let newCardIndex
        //check if active card is dragged bellow or above overCard
        const isBellowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBellowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overList?.cards?.length + 1
        //clone the previous list
        const nextLists = cloneDeep(prevList)
        const nextActiveList = nextLists.find(list => list.id === activeList.id)
        const nextOverList = nextLists.find(list => list.id === overList.id)
        //lu qua

        if (nextActiveList) {
          nextActiveList.cards = nextActiveList.cards.filter(card => card.id !== activeDragingCardId)
          //update cardOrderIds of active list
          nextActiveList.cardOrderIds = nextActiveList.cards.map(card => card.id)
        }
        //update cardOrderIds of over list
        if (nextOverList) {
          //check if overCardId is not in the same list as activeCardId
          nextOverList.cards = nextOverList.cards.filter(card => card.id !== activeDragingCardId)
          //add activeCardId to overList with new index
          nextOverList.cards = nextOverList.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          //update cardOrderIds of nextOverList
          nextOverList.cardOrderIds = nextOverList.cards.map(card => card.id)
        }
        console.log('nextLists', nextLists)

        return nextLists
      })
    }
  }
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Drag and drop card')
      return
    }
    const { active, over } = event
    if (!active || !over) return
    if (active.id !== over.id) {
      const oldIndex = orderedLists.findIndex(list => list.id === active.id)
      const newIndex = orderedLists.findIndex(list => list.id === over.id)

      const dndOrderedLists = arrayMove(orderedLists, oldIndex, newIndex)
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
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
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
        <ColumnLists lists = {orderedLists} />
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
