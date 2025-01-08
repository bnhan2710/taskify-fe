import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorziedAxiosInstance from '~/utils/authorizeAxios'
import { API_URL } from '~/utils/constants'

const initialState = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (loginDto) => {
    const response = await authorziedAxiosInstance.post(`${API_URL}/auth/login`, loginDto)
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
        // const accessToken = action.payload.data.accessToken
        // localStorage.setItem('accessToken', accessToken)
        state.currentUser = user
      })
  }
})
// action creator for the reducer, dispatch the action to the reducer
// export const {} = userSlice.actions
// selector for the reducer, get data from the reducer
export const selectCurrentUser = (state) => state.user.currentUser


// export default activeBoardSlice.reducer
export const userReducer = userSlice.reducer
