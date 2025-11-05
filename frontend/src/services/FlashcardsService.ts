import axios, { type AxiosResponse } from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/flashcards?categoryId=";

export interface Flashcard {
    id: number;
    userId: number;
    categoryId: number;
    question: string;
    answer: string;
    difficulty: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T> {
    data: T;
}

export const listFlashcards = (id: number): Promise<AxiosResponse<Flashcard[]>> =>
    axios.get<Flashcard[]>(REST_API_BASE_URL + `${id}`);