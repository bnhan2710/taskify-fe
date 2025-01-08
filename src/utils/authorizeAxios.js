import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatter'
import { refreshTokenAPI } from '~/apis'

const authorizedAxiosInstance = axios.create({
  timeout: 600000, // 10 minutes
  withCredentials: true
})

let isRefreshing = false
let subscribers = []

// Function to notify all waiting requests after refresh
function onTokenRefreshed(newToken) {
  subscribers.forEach(callback => callback(newToken))
  subscribers = []
}

// Function to add requests waiting for a new token
function addSubscriber(callback) {
  subscribers.push(callback)
}

authorizedAxiosInstance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  interceptorLoadingElements(true)
  return config
}, error => {
  interceptorLoadingElements(false)
  return Promise.reject(error)
})

authorizedAxiosInstance.interceptors.response.use(
  response => {
    interceptorLoadingElements(false)
    return response
  },
  async error => {
    interceptorLoadingElements(false)
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        try {
          const refreshToken = localStorage.getItem('refreshToken')
          const { data } = await refreshTokenAPI(refreshToken)
          const newAccessToken = data.accessToken

          localStorage.setItem('accessToken', newAccessToken)
          isRefreshing = false
          onTokenRefreshed(newAccessToken)
        } catch (refreshError) {
          isRefreshing = false
          toast.error('Session expired. Please log in again.')
          return Promise.reject(refreshError)
        }
      }

      return new Promise(resolve => {
        addSubscriber(newToken => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          resolve(authorizedAxiosInstance(originalRequest))
        })
      })
    }

    const errMessage = error.response?.data?.message || error.message || 'An error occurred'
    if (error.response?.status !== 410) {
      toast.error(errMessage)
    }
    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance