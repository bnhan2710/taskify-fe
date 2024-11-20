import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { FetchBoardDetailsAPI, addListAPI, addCardAPI } from '~/apis'
import { generatePlaceholder } from '~/utils/formatter'
import { isEmpty } from 'lodash'
function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = 8
    FetchBoardDetailsAPI(boardId).then((board) => {
      board.lists.forEach(list => {
        if (isEmpty(list.cards)) {
          list.cards = [generatePlaceholder(list)]
          list.cardOrderIds = [generatePlaceholder(list).id]
        }
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
  // console.log(board)
  return (
    <Container disableGutters maxWidth = {false} sx = {{ height: '100vh', backgroundColor: 'primary.main' }}>
      <AppBar/>
      <BoardBar board = {board}/>
      <BoardContent
        board = {board}
        createNewList = {createNewList}
        createNewCard = {createNewCard}
      />
    </Container>
  )
}

export default Board
