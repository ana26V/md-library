import { useLocalStorage } from "./useLocalStorage";
import { LoginCredentials, login } from "../services/auth";

const initialAuth = {
    user: null
}

export function useAuth() {
    const [{ user, token }, setUser] = useLocalStorage("user-session", initialAuth);


    const loginUser = async (credentials: LoginCredentials) => {
        const user = await login(credentials);
        setUser(user.data);
    }

    const logoutUser = () => {
        setUser(initialAuth);
    };

    return {
        user,
        token,
        loginUser,
        logoutUser,
    };
}
