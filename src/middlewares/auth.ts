import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { getOne } from "../dto";
import { User } from "../models/users";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(StatusCodes.UNAUTHORIZED);

  jwt.verify(token, config.TOKEN_SECRET as string, async (err, user) => {
    if (err) return res.sendStatus(StatusCodes.FORBIDDEN);
    // @ts-ignore
    req.user = await getOne(User, { where: { id: [user.userId] } });
    next();
  });
};
