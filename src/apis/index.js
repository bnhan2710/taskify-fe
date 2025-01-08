import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_URL } from '~/utils/constants'

// export const FetchBoardDetailsAPI = async (boardId) => {

//   const response = await authorziedAxiosInstance.get(`${API_URL}/boards/${boardId}`)
//   let board = response.data.data
//   board.lists = board.lists.map(list => ({ ...list, boardId: board.id }))
//   for (let list of board.lists) {
//     list.cards = list.cards.map(card => ({ ...card, listId: list.id }))
//   }
//   return board
// }

export const addListAPI = async (newListDto) => {

  const response = await authorizedAxiosInstance.post(`${API_URL}/lists`, newListDto)
  return response.data.data

}

export const addCardAPI = async (newCardDto) => {

  const response = await authorizedAxiosInstance.post(`${API_URL}/cards`, newCardDto)
  return response.data.data

}

export const updateBoard = async (boardId, updateBoardDto) => {
  const response = await authorizedAxiosInstance.put(`${API_URL}/boards/${boardId}`, updateBoardDto)
  return response.data.data
}

export const updateList = async (listId, updateListDto) => {
  const response = await authorizedAxiosInstance.put(`${API_URL}/lists/${listId}`, updateListDto)
  return response.data.data
}

export const updateCard = async (cardId, updateCardDto) => {
  const response = await authorizedAxiosInstance.put(`${API_URL}/cards/${cardId}`, updateCardDto)
  return response.data.data
}

export const removeListAPI = async (listId) => {
  const response = await authorizedAxiosInstance.delete(`${API_URL}/lists/${listId}`)
  return response.data
}

export const registerAPI = async (registerDto) => {
  const response = await authorizedAxiosInstance.post(`${API_URL}/auth/register`, registerDto)
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_URL}/auth/refresh_token`)
  return response.data.data
}

export const getMyBoardsAPI = async (qs) => {
  const response = await authorizedAxiosInstance.get(`${API_URL}/boards/${qs}`)
  return response.data.data
}