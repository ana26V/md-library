import { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: PropsWithChildren) {
  const _value = useAuth();
  return <AuthContext.Provider value={_value}>{children}</AuthContext.Provider>;
}

// const loginUser = (credentials: LoginCredentials) => {

//     login(credentials).then(() => {
//         setUser();
//     })

// }

// const logoutUser = () => {
//     setUser(initialAuth);
// };
// return {
//     user,
//     loginUser,
//     logoutUser
// };
