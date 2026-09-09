export type Token = {
  access_token: string;
  token_type: string;
};

export type User = {
  email: string;
  username: string;
  role: "Customer" | "Admin";
  created_at: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
};
