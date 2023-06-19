export interface UserCreateResponse {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type UserDetail = Omit<UserCreateResponse, "password">;
export type UserCreateRequest = Omit<UserCreateResponse, "id" | "isAdmin">;
export type UserCreateAccessToken = { accessToken: string };
export type UserUpdateRequest = Partial<Omit<UserCreateResponse, "id" | "password">>;
