import { useLayoutEffect } from "react";
import { axiosInstance } from "../services/axios";
import { useAuthContext } from "../contexts/AuthContext";

export function useInterceptors() {
    const { token } = useAuthContext()
    useLayoutEffect(() => {
        if (!token) {
            return;
        }
        const authInterceptor = axiosInstance.interceptors.request.use(
            // Primesti ca parametru obiectul config al cererii
            (config) => {
                // Verifici dacă token-ul există
                if (token) {
                    // Adaugi header-ul de autorizare cu valoarea token-ului
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                // Returnezi config-ul modificat
                return config;
            },
            // Primesti ca parametru un eventual error și îl respingi mai departe
            (error) => {
                return Promise.reject(error);
            }
        );
        return () => {
            axiosInstance.interceptors.request.eject(authInterceptor)
        }
    }, [token]);
}