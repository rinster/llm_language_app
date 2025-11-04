import axios, { type AxiosResponse } from "axios";
import { getAuthToken } from "./AuthService";

const REST_API_BASE_URL = "http://localhost:8080/api/users";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
}

// Create axios instance with auth token
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const listUsers = (): Promise<AxiosResponse<User[]>> => 
  axios.get<User[]>(REST_API_BASE_URL, { headers: getAuthHeaders() });

