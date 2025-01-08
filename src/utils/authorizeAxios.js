import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatter'
//init Axios instance (authorziedAxiosInstance) using for custom and default config
const authorziedAxiosInstance = axios.create()

//Time limit for request: 10 minutes
authorziedAxiosInstance.defaults.timeout = 600000

//withCredentials: true - to send cookies and other data with request
authorziedAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorziedAxiosInstance.interceptors.request.use(function (config) {
  //block spam click
  interceptorLoadingElements(true)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
authorziedAxiosInstance.interceptors.response.use(function (response) {
  interceptorLoadingElements(false)
  return response
}, function (error) {
  interceptorLoadingElements(false)
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  //all http status without 200-299 will be handled here
  console.log('error', error)
  let errMessage = error?.message
  if (error.response?.data?.message) {
    errMessage = error.response?.data?.message
  }

  if (error.response?.status !== 401) {
    toast.error(errMessage)
  }
  return Promise.reject(error)
})

export default authorziedAxiosInstance

