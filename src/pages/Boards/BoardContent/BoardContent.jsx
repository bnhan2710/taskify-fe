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
import { generatePlaceholder } from '~/utils/formatter'
const ACTIVE_DRAG_ITEM_TYPE = {
  LIST: 'ACTIVE_DRAG_ITEM_TYPE_LIST',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({
  board,
  createNewList,
  createNewCard,
  moveList,
  moveCardInTheSameList,
  moveCardToAnotherList,
  deleteList
}) {
  const moveCardBetweenDiffList = (
    overList,
    overCardId,
    active,
    over,
    activeList,
    activeDragingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
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
        //if is last card in list, add placeholder to the end of list
        if (nextActiveList.cards.length === 0) {
          nextActiveList.cards = [generatePlaceholder(nextActiveList)]
        }
      }
      //update cardOrderIds of over list
      if (nextOverList) {
        //check if overCardId is not in the same list as activeCardId
        nextOverList.cards = nextOverList.cards.filter(card => card.id !== activeDragingCardId)

        //add activeCardId to overList with new index , update data of card when drag and drop to another list
        nextOverList.cards = nextOverList.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          listId: overList.id
        })

        //delete placeholder if exist
        nextOverList.cards = nextOverList.cards.filter(card => !card.FE_Placeholder)

        //update cardOrderIds of nextOverList
        nextOverList.cardOrderIds = nextOverList.cards.map(card => card.id)
      }
      //if trigger from handleDragEnd, return new state with correct position of cards
      if (triggerFrom === 'handleDragEnd') {
        moveCardToAnotherList( activeDragingCardId,
          oldListDragging.id,
          nextOverList.id,
          nextLists)
        return nextLists
      }
      return nextLists
    })
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const sensors = useSensors(pointerSensor)

  const [orderedLists, setOrderedLists] = useState([])

  //only 1 item can be dragged at a time
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldListDragging, setOldListDragging] = useState(null)


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
    //if dragging card, find the list that contains the card
    if (event?.active?.data?.current.listId) {
      setOldListDragging(findListByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    //if dragging list, do nothing
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.LIST) return
    //if dragging card
    const { active, over } = event
    if (!active || !over) return
    // console.log ('Card is dragging', active)
    //active is the card being dragged
    const { id: activeDragingCardId, data : { current: activeDraggingCardData } } = active
    //over is the card under the dragged card
    const { id: overCardId } = over
    //find 2 lists that contain cardId and overCardId
    const activeList = findListByCardId(activeDragingCardId)
    const overList = findListByCardId(overCardId)
    if (!overList || !activeList) return
    if (activeList.id !== overList.id) {
      moveCardBetweenDiffList(
        overList,
        overCardId,
        active,
        over,
        activeList,
        activeDragingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd', event)
    const { active, over } = event
    if (!active || !over) return

    //handle drag and drop card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //active is the card being dragged
      const { id: activeDragingCardId, data : { current: activeDraggingCardData } } = active
      //over is the card under the dragged card
      const { id: overCardId } = over
      //find 2 lists that contain cardId and overCardId
      const activeList = findListByCardId(activeDragingCardId)
      const overList = findListByCardId(overCardId)
      //if overList or activeList is not found, do nothing
      if (!overList || !activeList) return


      //if drag and drop card to another list
      if (oldListDragging.id !== overList.id) {
        moveCardBetweenDiffList(
          overList,
          overCardId,
          active,
          over,
          activeList,
          activeDragingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        const oldCardIndex = oldListDragging?.cards?.findIndex(c => c.id === activeDragItemId)

        const newCardIndex = overList?.cards?.findIndex(c => c.id === overCardId)
        //using Array move to reorder cards
        const dndOrderedCards = arrayMove(oldListDragging?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardsIds = dndOrderedCards.map(card => card.id)

        setOrderedLists(prevLists => {
          const nextLists = cloneDeep(prevLists)
          const targetList = nextLists.find(list => list.id === overList.id)
          if (targetList) {
            targetList.cards = dndOrderedCards
            dndOrderedCardsIds
          }
          //return new state with correct position of cards
          return nextLists
        })
        moveCardInTheSameList(dndOrderedCards, dndOrderedCardsIds, oldListDragging.id)
      }
    }
    //handle drag and drop list
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.LIST) {
      if (active.id !== over.id) {
        const oldListIndex = orderedLists.findIndex(list => list.id === active.id)
        const newListIndex = orderedLists.findIndex(list => list.id === over.id)

        const dndOrderedLists = arrayMove(orderedLists, oldListIndex, newListIndex)
        // using for backend save new order to database
        moveList(dndOrderedLists)
        setOrderedLists(dndOrderedLists)
      }

    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldListDragging(null)
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
        <ColumnLists
          lists = {orderedLists}
          createNewList = {createNewList}
          createNewCard = {createNewCard}
          deleteList = {deleteList}
        />
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
