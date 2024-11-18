import axios from 'axios'
import { API_URL } from '~/utils/constants'

export const FetchBoardDetailsAPI = async (boardId) => {
  const [boardResponse, listsResponse] = await Promise.all([
    axios.get(`${API_URL}/boards/${boardId}`),
    axios.get(`${API_URL}/lists/?boardId=${boardId}`)
  ])

  const board = boardResponse.data.data
  const lists = listsResponse.data.data

  board.lists = lists
  board.listOrderIds = lists.map(list => list.id)

  const listsWithCards = await Promise.all(
    lists.map(async (list) => {
      const cardsResponse = await axios.get(`${API_URL}/cards/?listId=${list.id}`)
      const cards = cardsResponse.data.data
      return {
        ...list,
        cards,
        cardOrderIds: cards.map(card => card.id)
      }
    })
  )

  board.lists = listsWithCards

  return board
}
