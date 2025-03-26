import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { update } from 'lodash'
import authorziedAxiosInstance from '~/utils/authorizeAxios'
import { API_URL } from '~/utils/constants'

const initialState = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (loginDto, { rejectWithValue }) => {
    try {
      const response = await authorziedAxiosInstance.post(`${API_URL}/auth/login`, loginDto)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed')
    }
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorziedAxiosInstance.delete(`${API_URL}/auth/logout`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Logout failed')
    }
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (updateDto, { rejectWithValue }) => {
    try {
      const response = await authorziedAxiosInstance.put(`${API_URL}/users/${updateDto.userId}`, {
        displayName: updateDto.displayName,
        age: updateDto.age,
        gender: updateDto.gender
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Update failed')
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUserAPI.fulfilled, (state, action) => {
        const user = action.payload
        const accessToken = action.payload.data.accessToken
        localStorage.setItem('accessToken', accessToken)
        state.currentUser = user.data
      })
    builder
      .addCase(logoutUserAPI.fulfilled, (state, action) => {
        localStorage.removeItem('accessToken')
        state.currentUser = null
      })
    // Update user profile cases
    builder
      .addCase(updateUserAPI.fulfilled, (state, action) => {
        // Removed duplicate assignment
        console.log('action.payload.data: ', action.payload)
        const { displayName, age, gender } = action.payload.data
        state.currentUser.displayName = displayName
        state.currentUser.age = age
        state.currentUser.gender = gender
      })
  }
})

// Selector for current user
export const selectCurrentUser = (state) => state.user.currentUser

// Export reducer
export const userReducer = userSlice.reducer