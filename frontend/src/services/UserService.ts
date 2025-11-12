import axios, { type AxiosResponse } from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/users";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
}

export const listUsers = (): Promise<AxiosResponse<User[]>> => 
  axios.get<User[]>(REST_API_BASE_URL);

export const createUser = (payload: RegisterUserRequest): Promise<AxiosResponse<User>> =>
  axios.post<User>(REST_API_BASE_URL, payload);

export const loginUser = (payload: LoginRequest): Promise<AxiosResponse<User>> =>
  axios.post<User>(`${REST_API_BASE_URL}/login`, payload);

