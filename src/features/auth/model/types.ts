import { User } from "@/src/entities/user/model/types";

export type Token = {
  access_token: string;
  token_type: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
};
