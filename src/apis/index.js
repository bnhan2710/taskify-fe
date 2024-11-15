import axios from 'axios'
import { API_URL } from '~/utils/constants'

export const FetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_URL}/boards/${boardId}`)
  return response.data
}