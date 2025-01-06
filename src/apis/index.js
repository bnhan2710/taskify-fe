import axios from 'axios'
import { API_URL } from '~/utils/constants'

// export const FetchBoardDetailsAPI = async (boardId) => {

//   const response = await axios.get(`${API_URL}/boards/${boardId}`)
//   let board = response.data.data
//   board.lists = board.lists.map(list => ({ ...list, boardId: board.id }))
//   for (let list of board.lists) {
//     list.cards = list.cards.map(card => ({ ...card, listId: list.id }))
//   }
//   return board
// }

export const addListAPI = async (newListDto) => {

  const response = await axios.post(`${API_URL}/lists`, newListDto)
  return response.data.data

}

export const addCardAPI = async (newCardDto) => {

  const response = await axios.post(`${API_URL}/cards`, newCardDto)
  return response.data.data

}

export const updateBoard = async (boardId, updateBoardDto) => {
  const response = await axios.put(`${API_URL}/boards/${boardId}`, updateBoardDto)
  return response.data.data
}

export const updateList = async (listId, updateListDto) => {
  const response = await axios.put(`${API_URL}/lists/${listId}`, updateListDto)
  return response.data.data
}

export const updateCard = async (cardId, updateCardDto) => {
  const response = await axios.put(`${API_URL}/cards/${cardId}`, updateCardDto)
  return response.data.data
}

export const removeListAPI = async (listId) => {
  const response = await axios.delete(`${API_URL}/lists/${listId}`)
  return response.data
}
