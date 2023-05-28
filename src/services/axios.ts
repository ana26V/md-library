import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://itschool-library.onrender.com",

    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})