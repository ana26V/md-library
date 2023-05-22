import { axiosInstance } from "./axios";


interface LoginCredentials {
    email: string;
    password:string;
}

export function login(credentials:LoginCredentials) {
    return axiosInstance.post("/auth/login",credentials)
}
export function signUp(credentials:LoginCredentials) {
    return axiosInstance.post("/auth/register",credentials)
}