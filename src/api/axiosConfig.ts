import axios from 'axios'
import { BASE_URL } from './endpoints'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || error.message)
)

export default axiosInstance
