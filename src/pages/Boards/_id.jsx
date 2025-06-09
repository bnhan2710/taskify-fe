import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import {
  fetchBoardDetailAPI,
  updatecurrentActiveBoard,
  selectcurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import {
  updateBoard,
  updateList,
  updateCard
} from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import { useParams } from 'react-router-dom'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice'
import { Box } from '@mui/material'

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectcurrentActiveBoard)
  const activeCard = useSelector(selectCurrentActiveCard)
  const { boardId } = useParams()
  useEffect(() => {

    dispatch(fetchBoardDetailAPI(boardId))
  }, [dispatch, boardId])


  const moveList = async (dndOrderedLists) => {
    const dndOrderedListsIds = dndOrderedLists.map(list => String(list.id))
    //update board state
    const newBoard = { ...board, listOrderIds: dndOrderedListsIds }
    dispatch(updatecurrentActiveBoard(newBoard))
    updateBoard(board.id, { listOrderIds: dndOrderedListsIds })
  }

  const moveCardInTheSameList = (dndOrderedCards, dndOrderedCardsIds, listId ) => {
    //update state board
    const newBoard = cloneDeep(board)
    const list = newBoard.lists.find(list => list.id === listId)
    list.cardOrderIds = dndOrderedCardsIds
    list.cards = dndOrderedCards
    dispatch(updatecurrentActiveBoard(newBoard))
    //call api update list
    updateList(listId, { cardOrderIds: dndOrderedCardsIds })
  }

  const moveCardToAnotherList = ( currentCardId, prevListId, nextListId, dndOrderedLists ) => {
    //update state board
    const newBoard = cloneDeep(board)
    const prevList = newBoard.lists.find(list => list.id === prevListId)
    const nextList = newBoard.lists.find(list => list.id === nextListId)
    //remove card from prevList
    prevList.cards = prevList.cards.filter(card => card.id !== currentCardId)
    prevList.cardOrderIds = prevList.cardOrderIds.filter(cardId => cardId !== currentCardId)
    //add card to nextList
    nextList.cards = dndOrderedLists.find(list => list.id === nextListId).cards
    nextList.cardOrderIds = dndOrderedLists.find(list => list.id === nextListId).cardOrderIds
    dispatch(updatecurrentActiveBoard(newBoard))
    //call api update card
    updateCard(currentCardId, { listId: nextListId })
    //call api update list
    updateList(prevListId, { cardOrderIds: prevList.cardOrderIds })
    updateList(nextListId, { cardOrderIds: nextList.cardOrderIds })
  }

  if (!board) {
    return (
      <PageLoadingSpinner/>
    )
  }

  return (
    <Container disableGutters maxWidth = {false} sx = {{ height: '100vh', backgroundColor: 'primary.main' }}>
      {activeCard && <ActiveCard/>}
      <AppBar/>
      <Box sx={{
        position: 'relative',
        height: 'calc(100vh - 58px)',
        overflow: 'hidden'
      }}>
        <BoardBar board={board}/>
        <BoardContent
          board={board}
          moveList={moveList}
          moveCardInTheSameList={moveCardInTheSameList}
          moveCardToAnotherList={moveCardToAnotherList}
        />
      </Box>
    </Container>
  )
}

export default Board
