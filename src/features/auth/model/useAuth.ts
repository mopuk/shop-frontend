"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import getCurrentUser from "../api/getCurrentUser";
import { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  refresh: async () => {},
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export function useAuthLoader(): AuthState {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const refresh = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      setAuthState({
        user,
        isAuthenticated: user !== null,
        isLoading: false,
        refresh,
      });
    } catch {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        refresh,
      });
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return authState;
}

export default function useAuth(): AuthState {
  const authState = useContext(AuthContext);

  if (!authState) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authState;
}
