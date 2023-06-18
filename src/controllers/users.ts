import { Controller, Post, Get, Patch, Delete, Route, Path, Body, Tags } from "tsoa";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../utils/jwt";
import { createInstance } from "../dto";
import { UserCreateAccessToken, UserCreateRequest } from "../types/schemas/user.response";
import { User } from "../models/users";

@Route("api/users")
@Tags("users")
export class userSchemaController extends Controller {
  @Post()
  public static async create(@Body() payload: UserCreateRequest): Promise<UserCreateAccessToken> {
    const user = await createInstance(User, payload);
    return { accessToken: generateAccessToken({ userId: user.id, isBlocked: user.isAdmin }) };
  }

  @Get()
  public static async getAll() {
    return [{ userId: 1 }];
  }

  @Get("{userId}")
  public static async getOne(@Path() userId: number) {
    return { userId: userId };
  }

  @Patch("{userId}")
  public static async update(@Path() userId: number) {
    return { userId: userId };
  }

  @Delete("{userId}")
  public static async delete(@Path() userId: number) {
    return { userId: userId };
  }
}

export const userController = {
  getAll: async (req: Request, res: Response) => {
    await userSchemaController.getAll();
  },

  create: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const userToken = await userSchemaController.create({
      username,
      email,
      password: await bcrypt.hash(password, bcrypt.genSaltSync(8)),
    });
    res.status(StatusCodes.CREATED).json(userToken);
  },

  getOne: async (req: Request, res: Response) => {
    await userSchemaController.getOne(1);
  },

  update: async (req: Request, res: Response) => {
    await userSchemaController.update(1);
  },

  delete: async (req: Request, res: Response) => {
    await userSchemaController.delete(1);
  },
};
