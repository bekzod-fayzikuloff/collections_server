import { Request, Response, NextFunction } from "express";
import { validate } from "uuid";
import { StatusCodes } from "http-status-codes";

export const isValidUserUUID = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  if (validate(userId)) {
    next();
  }
  return res.status(StatusCodes.NOT_FOUND).json({ detail: "Invalid user id" });
};
