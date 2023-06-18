export interface UserCreateResponse {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export type UserCreateRequest = Omit<UserCreateResponse, "id" | "isAdmin">;
export type UserCreateAccessToken = { accessToken: string };
