import axios from 'axios'
import { API_URL } from '~/utils/constants'

export const FetchBoardDetailsAPI = async (boardId) => {

  const response = await axios.get(`${API_URL}/boards/${boardId}`)
  let board = response.data.data
  board.lists = board.lists.map(list => ({ ...list, boardId: board.id }))
  for (let list of board.lists) {
    list.cards = list.cards.map(card => ({ ...card, listId: list.id }))
  }
  return board
}

export const addListAPI = async (newListDto) => {

  const response = await axios.post(`${API_URL}/lists`, newListDto)
  return response.data

}

export const addCardAPI = async (newCardDto) => {

  const response = await axios.post(`${API_URL}/cards`, newCardDto)
  return response.data

}