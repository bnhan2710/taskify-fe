import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { FetchBoardDetailsAPI, addListAPI, addCardAPI, updateBoard, updateList, updateCard } from '~/apis'
import { mapOrder } from '~/utils/sorts'
import { generatePlaceholder } from '~/utils/formatter'
import { isEmpty } from 'lodash'
function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '26603603-4019-4b87-856e-acb515a20cc2'
    FetchBoardDetailsAPI(boardId).then((board) => {
      board.lists = mapOrder(board.lists, board.listOrderIds, 'id')
      board.lists.forEach(list => {
        if (isEmpty(list.cards)) {
          list.cards = [generatePlaceholder(list)]
          list.cardOrderIds = [generatePlaceholder(list).id]
        } else
          list.cards = mapOrder(list.cards, list.cardOrderIds, 'id')
      })
      setBoard(board)
    })
  }, [])

  const createNewList = async (newListDto) => {
    await addListAPI({
      ...newListDto,
      boardId: board.id
    })

    //update board state fetch board again
    const newBoard = await FetchBoardDetailsAPI(board.id)
    //handle case where list is empty
    newBoard.lists.forEach(list => {
      if (isEmpty(list.cards)) {
        list.cards = [generatePlaceholder(list)]
        list.cardOrderIds = [generatePlaceholder(list).id]
      }
    })
    setBoard(newBoard)
  }
  const createNewCard = async (newCardDto) => {
    await addCardAPI(newCardDto)
    //update board state fetch board again
    const newBoard = await FetchBoardDetailsAPI(board.id)
    setBoard(newBoard)
  }

  const moveList = async (dndOrderedLists) => {
    const dndOrderedListsIds = dndOrderedLists.map(list => String(list.id))
    //update board state
    const newBoard = { ...board, listOrderIds: dndOrderedListsIds }
    setBoard(newBoard)
    updateBoard(board.id, { listOrderIds: dndOrderedListsIds })
  }

  const moveCardInTheSameList = (dndOrderedCards, dndOrderedCardsIds, listId ) => {
    //update state board
    const newBoard = { ...board }
    const list = newBoard.lists.find(list => list.id === listId)
    list.cardOrderIds = dndOrderedCardsIds
    list.cards = dndOrderedCards
    setBoard(newBoard)
    //call api update list
    updateList(listId, { cardOrderIds: dndOrderedCardsIds })
  }

  const moveCardToAnotherList = ( currentCardId, prevListId, nextListId, dndOrderedLists ) => {
    //update state board
    const newBoard = { ...board }
    const prevList = newBoard.lists.find(list => list.id === prevListId)
    const nextList = newBoard.lists.find(list => list.id === nextListId)
    //remove card from prevList
    prevList.cards = prevList.cards.filter(card => card.id !== currentCardId)
    prevList.cardOrderIds = prevList.cardOrderIds.filter(cardId => cardId !== currentCardId)
    //add card to nextList
    nextList.cards = dndOrderedLists.find(list => list.id === nextListId).cards
    nextList.cardOrderIds = dndOrderedLists.find(list => list.id === nextListId).cardOrderIds
    setBoard(newBoard)
    //call api update card
    updateCard(currentCardId, { listId: nextListId })
    //call api update list
    updateList(prevListId, { cardOrderIds: prevList.cardOrderIds })
    updateList(nextListId, { cardOrderIds: nextList.cardOrderIds })
  }

  if (!board) {
    return (
      <Box sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: 2, width:' 100vw' }}>
        <CircularProgress/>
        <Typography variant = 'h6'>Loading...</Typography>
      </Box>

    )
  }

  return (
    <Container disableGutters maxWidth = {false} sx = {{ height: '100vh', backgroundColor: 'primary.main' }}>
      <AppBar/>
      <BoardBar board = {board}/>
      <BoardContent
        board = {board}
        createNewList = {createNewList}
        createNewCard = {createNewCard}
        moveList = {moveList}
        moveCardInTheSameList = {moveCardInTheSameList}
        moveCardToAnotherList = {moveCardToAnotherList}
      />
    </Container>
  )
}

export default Board
