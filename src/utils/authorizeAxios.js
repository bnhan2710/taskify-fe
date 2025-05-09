import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatter'
import { refreshTokenAPI } from '~/apis'

const authorizedAxiosInstance = axios.create({
  timeout: 600000,
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

  if (config.url.includes('/login') || config.url.includes('/auth/login')) {
    return config
  }

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
    const config = error.config
    if (config.url.includes('/login') || config.url.includes('/auth/login')) {
      return config
    }
    interceptorLoadingElements(false)
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry && error.response?.data.status === 'TokenExpired') {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        try {
          const { accessToken } = await refreshTokenAPI()
          const newAccessToken = accessToken
          localStorage.setItem('accessToken', newAccessToken)
          isRefreshing = false
          onTokenRefreshed(newAccessToken)
          return authorizedAxiosInstance(originalRequest)
        } catch (refreshError) {
          isRefreshing = false
          toast.error('Session expired. Please log in again.')
          localStorage.removeItem('accessToken')
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
    //handle token notfound error
    if (error.response?.status === 401 && error.response?.data.status === 'Unauthorized') {
      toast.error('Session expired. Please log in again.')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('persist:root')
      window.location.href = '/login'

    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance