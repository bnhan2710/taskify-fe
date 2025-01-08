import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorziedAxiosInstance from '~/utils/authorizeAxios'
import { API_URL } from '~/utils/constants'
import { toast } from 'react-toastify'
const initialState = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (loginDto) => {
    const response = await authorziedAxiosInstance.post(`${API_URL}/auth/login`, loginDto)
    if (response.data.status === 'OK') {
      toast.success(response.data.data.message)
    }
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async () => {
    const response = await authorziedAxiosInstance.delete(`${API_URL}/auth/logout`)
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{},

  //extraReducer for handling async actions
  extraReducers: (builder) => {
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
  }
})
// action creator for the reducer, dispatch the action to the reducer
// export const {} = userSlice.actions
// selector for the reducer, get data from the reducer
export const selectCurrentUser = (state) => state.user.currentUser


// export default activeBoardSlice.reducer
export const userReducer = userSlice.reducer
