import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const generateAccessToken = (signFields: { isBlocked: boolean; userId: any }) =>
  jwt.sign(signFields, config.TOKEN_SECRET as string);
