import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_URL } from '~/utils/constants'

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

export const createBoardAPI = async (createBoardDto) => {
  const response = await authorizedAxiosInstance.post(`${API_URL}/boards`, createBoardDto)
  return response.data.data
}

export const updateCardAPI = async (cardId, updateCardDto) => {
  const response = await authorizedAxiosInstance.put(`${API_URL}/cards/${cardId}`, updateCardDto)
  return response.data.data
}

export const updateUserAPI = async (updateUserDto, userId) => {
  const response = await authorizedAxiosInstance.put(`${API_URL}/users/${userId}`, updateUserDto)
  return response.data.data
}

export const commentCardAPI = async (commentDto) => {
  const response = await authorizedAxiosInstance.post(`${API_URL}/comments`, commentDto)
  return response.data.data
}

export const inviteUserToBoardAPI = async (email, boardId) => {
  const response = await authorizedAxiosInstance.post(`${API_URL}/boards/${boardId}/add`, email)
  toast.success('Invite user successfully!')
  return response.data.data
}

export const addCardMemberAPI = async (cardId, memberId) => {
  const response = await authorizedAxiosInstance.post(`${API_URL}/cards/${cardId}/member/add`, memberId)
  return response.data.data
}

export const channgePasswordAPI = async ( changePassword ) => {
  const response = await authorizedAxiosInstance.put(`${API_URL}/auth/change-password`, changePassword)
  return response.data.data
}

export const uploadAvatarAPI = async (formData) => {
  const response = await authorizedAxiosInstance.post(`${API_URL}/upload/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

