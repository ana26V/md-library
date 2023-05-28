import { axiosInstance } from "./axios";


export interface LoginCredentials {
    email: string;
    password: string;
}
interface SignUpCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export function login(credentials: LoginCredentials) {
    return axiosInstance.post("/auth/login", credentials);
}

export function signUp(credentials: SignUpCredentials) {
    return axiosInstance.post("/auth/register", credentials)
}