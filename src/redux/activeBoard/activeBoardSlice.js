import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorziedAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import { API_URL } from '~/utils/constants'
import { generatePlaceholder } from '~/utils/formatter'
import { mapOrder } from '~/utils/sorts'

const initialState = {
  currentActiveBoard: null
}

export const fetchBoardDetailAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailAPI',
  async (boardId) => {
    try {
      const response = await authorziedAxiosInstance.get(`${API_URL}/boards/${boardId}`)
      let board = response.data.data
      board.lists = board.lists.map(list => ({ ...list, boardId: board.id }))
      for (let list of board.lists) {
        const cardData = await authorziedAxiosInstance.get(`${API_URL}/cards/list/${list.id}`)
        list.cards = cardData.data.data
        list.cards = list.cards.map(card => ({ ...card, listId: list.id }))
      }
      return board
    } catch (error) {
      if (error.response.status === 403) {
        //redirect to not found page
        window.location.href = '/not-found'
      }
      throw error
    }
  }
)


export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  //Reducer where we can define actions synchronously
  reducers: {
    updatecurrentActiveBoard: (state, action) => {
      //standard puts the name data into the reducer, here we assign it to a more meaningful variable
      const board = action.payload
      //update data currentActiveBoard
      state.currentActiveBoard = board
    },
    updateCardInBoard: (state, action) => {
      const updatedCard = action.payload
      const { currentActiveBoard } = state
      const { lists } = currentActiveBoard
      for (let list of lists) {
        const cardIndex = list.cards.findIndex(card => card.id === updatedCard.id)
        if (cardIndex > -1) {
          list.cards[cardIndex] = updatedCard
          break
        }
      }
    }
  },

  //extraReducer for handling async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardDetailAPI.fulfilled, (state, action) => {
        //action.payload is the data returned from the API
        let board = action.payload
        board.lists = mapOrder(board.lists, board.listOrderIds, 'id')
        board.lists.forEach(list => {
          if (isEmpty(list.cards)) {
            list.cards = [generatePlaceholder(list)]
            list.cardOrderIds = [generatePlaceholder(list).id]
          } else {
            list.cards = mapOrder(list.cards, list.cardOrderIds, 'id')
          }
        })
        //update data currentActiveBoard
        state.currentActiveBoard = board
      })
  }
})
// action creator for the reducer, dispatch the action to the reducer
export const { updatecurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions
// selector for the reducer, get data from the reducer
export const selectcurrentActiveBoard = (state) => state.activeBoard.currentActiveBoard


// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer
