import { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: PropsWithChildren) {
  const _value = useAuth();
  return <AuthContext.Provider value={_value}>{children}</AuthContext.Provider>;
}
