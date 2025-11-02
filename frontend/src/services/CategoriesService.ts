import axios, { type AxiosResponse } from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/categories";

export interface Categories {
    id: string;
    name: string;
}

export interface ApiResponse<T> {
    data: T;
}

export const listCategories: Promise<AxiosResponse<Categories[]>> =
    axios.get<Categories[]>(REST_API_BASE_URL)