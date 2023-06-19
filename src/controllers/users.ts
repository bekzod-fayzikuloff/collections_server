import { Controller, Post, Get, Patch, Delete, Route, Path, Body, Tags } from "tsoa";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../utils/jwt";
import { createInstance, getAll, getOne } from "../dto";
import { UserCreateAccessToken, UserCreateRequest, UserDetail } from "../types/schemas/user.response";
import { User } from "../models/users";
import { NoContent } from "../types/schemas/base.response";

@Route("api/users")
@Tags("users")
export class userSchemaController extends Controller {
  @Post()
  public static async create(@Body() payload: UserCreateRequest): Promise<UserCreateAccessToken> {
    const user = await createInstance(User, payload);
    return { accessToken: generateAccessToken({ userId: user.id, isBlocked: user.isAdmin }) };
  }

  @Get()
  public static async getAll(): Promise<UserDetail[]> {
    return await getAll(User, {
      attributes: { exclude: ["password"] },
    });
  }

  @Get("{userId}")
  public static async getOne(@Path() userId: string): Promise<UserDetail> {
    return await getOne(User, {
      where: {
        id: [userId],
      },
      attributes: {
        exclude: ["password"],
      },
    });
  }

  @Patch("{userId}")
  public static async update(@Path() userId: string) {
    return { userId: userId };
  }

  @Delete("{userId}")
  public static async delete(@Path() userId: string): Promise<NoContent> {
    const user = await getOne(User, { where: { id: userId } });
    user && (await user.destroy());
    return { delete: "success" };
  }
}

export const userController = {
  getAll: async (req: Request, res: Response) => {
    res.json(await userSchemaController.getAll());
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
    const { userId } = req.params;
    const user = await userSchemaController.getOne(userId);
    if (!!user) {
      res.json(user);
    }
    return res.status(StatusCodes.NOT_FOUND);
  },

  update: async (req: Request, res: Response) => {
    await userSchemaController.update("1");
  },

  delete: async (req: Request, res: Response) => {
    res.status(StatusCodes.NO_CONTENT).json(await userSchemaController.delete(req.params.userId));
  },
};
