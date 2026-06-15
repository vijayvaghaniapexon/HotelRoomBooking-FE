import axiosInstance from "./axiosConfig";
import { API_ENDPOINTS } from "./endpoints";

export const login = async (params: { email: string; password: string }) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, params)
  return response.data;
};

export const verifyOtp = async (params: { email: string; otp: string }) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.VERIFY_OTP, params)
  return response.data;
};

export const register = async (params: { name: string; email: string; password: string }) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, params)
  return response.data;
};

export const resendOtp = async (params: { email: string }) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.RESEND_OTP, params)
  return response.data;
};

export const forgotPassword = async (params: { email: string }) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, params)
  return response.data;
};

export const resetPassword = async (params: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, params)
  return response.data;
};