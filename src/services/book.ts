import { axiosInstance } from "./axios";


export function getAllBooks() {
    return axiosInstance.get("/book/");
}

export function getBookById(bookId:string){
    return axiosInstance.get(`/book/${bookId}`);
}