import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const generateAccessToken = (signFields: { isAdmin: boolean; userId: any }) =>
  jwt.sign(signFields, config.TOKEN_SECRET as string);
