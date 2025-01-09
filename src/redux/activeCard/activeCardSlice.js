import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorziedAxiosInstance from '~/utils/authorizeAxios'
import { API_URL } from '~/utils/constants'
const initialState = {
  currentActiveCard: null
}

export const fetchCardDetailAPI = createAsyncThunk(
  'activeCard/fetchCardDetailAPI',
  async (cardId) => {
    const response = await authorziedAxiosInstance.get(`${API_URL}/cards/${cardId}`)
    return response.data.data
  }
)

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },

    updateCurrentActiveCard: (state, action) => {
      state.currentActiveCard = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardDetailAPI.fulfilled, (state, action) => {
        state.currentActiveCard = action.payload
      })
  }
})

export const { clearCurrentActiveCard, updateCurrentActiveCard } = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard

export const activeCardReducer = activeCardSlice.reducer