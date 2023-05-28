import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Book } from "../models/Book";
import { axiosInstance } from "./axios";


export function getAllBooks() {
    return axiosInstance.get<Book[]>("/book/");
}

export function getBookById(bookId: string) {
    return axiosInstance.get<Book>(`/book/${bookId}`);
}
export function getMyBooks() {
    return axiosInstance.get<Book[]>("/book/my-books/")
}

export function getBookByUserId(userId: string) {
    return axiosInstance.get(`/book/user/${userId}`)
}

export function deleteBook(bookId: string) {
    return axiosInstance.delete<Book>(`/book/${bookId}`)
}


export function addBook(data: any) {
    // const formData = new FormData();
    // formData.append("title", data.title);
    // formData.append("author", data.author);
    // formData.append("description", data.description);
    // formData.append("file", data.coverImage);


    return axiosInstance.post('/book', data
    );

}

// export function searchBooks(query: string) {
//     return axiosInstance.get(`/book/search?limit=6&search=${query}&offset=0`)
// }  ///book/search?search=Karamazov
export function searchBooks(query: string, limit: number, offset: number) {
    return axiosInstance.get(`/book/search?limit=${limit}&search=${query}&offset=${offset}`);
}

export function getPaginatedBooks(limit: number, offset: number) {
    return axiosInstance.get(`/book/search?limit=${limit}&offset=${offset}`);
}
