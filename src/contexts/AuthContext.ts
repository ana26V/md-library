import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext<ReturnType<typeof useAuth>>(null!); //?
export const useAuthContext = () => useContext(AuthContext);