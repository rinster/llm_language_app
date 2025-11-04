import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Store token in localStorage
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
    // Set default authorization header for all axios requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  }
  // Dispatch custom event to notify components of auth change
  window.dispatchEvent(new Event("authChange"));
};

// Get token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

// Initialize axios with token if available
export const initializeAuth = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${REST_API_BASE_URL}/login`, credentials);
  const { token, user } = response.data;
  setAuthToken(token);
  return { token, user };
};

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${REST_API_BASE_URL}/register`, userData);
  const { token, user } = response.data;
  setAuthToken(token);
  return { token, user };
};

export const logout = () => {
  setAuthToken(null);
};

