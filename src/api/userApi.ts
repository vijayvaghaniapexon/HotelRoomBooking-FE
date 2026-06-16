import axiosInstance from './axiosConfig'
import { API_ENDPOINTS } from './endpoints'

export interface AssignableManager {
  id: string
  name: string
  email: string
  role: string
}

export const getAssignableManagers = async (): Promise<AssignableManager[]> => {
  const response = await axiosInstance.get(API_ENDPOINTS.USER.ASSIGNABLE_MANAGERS)
  return response.data
}
