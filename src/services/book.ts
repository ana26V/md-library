
import { Book, BookToAdd } from "../models/Book";
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


export function addBook(data: BookToAdd) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("file", data.file);

    return axiosInstance.post('/book/', formData
    );
}

export function editBook(data: any, bookId: string) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    if (data.file instanceof File) {
        formData.append("file", data.file)
    }
    return axiosInstance.put(`/book/${bookId}`, formData
    );
}

export function searchBooks(query: string, limit: number, offset: number) {
    return axiosInstance.get<{
        totalCount: number,
        results: Book[]
    }>(`/book/search?limit=${limit}&search=${query}&offset=${offset}`);
}
