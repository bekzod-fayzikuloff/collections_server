import { Optional, Model } from "sequelize";

export interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export type UserCreatingAttributes = Optional<UserAttributes, "id" | "isAdmin">;

export interface UserInstance extends Model<UserAttributes, UserCreatingAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
