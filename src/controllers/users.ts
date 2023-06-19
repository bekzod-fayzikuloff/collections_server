import { Controller, Post, Get, Patch, Delete, Route, Path, Body, Tags } from "tsoa";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../utils/jwt";
import { createInstance, getAll, getOne, updateInstance } from "../dto";
import {
  UserCreateAccessToken,
  UserCreateRequest,
  UserDetail,
  UserUpdateRequest,
} from "../types/schemas/user.response";
import { User } from "../models/users";
import { NoContent } from "../types/schemas/base.response";
import { usersEmailIsExist } from "../services/users";

const getUserById = async (userId: string): Promise<any> => {
  return await getOne(User, {
    where: {
      id: [userId],
    },
    attributes: {
      exclude: ["password"],
    },
  });
};

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
    return await getUserById(userId);
  }

  @Patch("{userId}")
  public static async update(@Path() userId: string, @Body() payload: UserUpdateRequest): Promise<UserDetail> {
    return await getUserById(userId);
  }

  @Delete("{userId}")
  public static async delete(@Path() userId: string): Promise<NoContent> {
    const user = await getUserById(userId);
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
    if (user) {
      res.json(user);
    } else res.status(StatusCodes.NOT_FOUND).json({ detail: "User with this ID not found" });
  },

  update: async (req: Request, res: Response) => {
    const user = await getUserById(req.params.userId);
    if (req?.body?.email && (await usersEmailIsExist(req?.body?.email))) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "E-mail already in use" });
    }
    await updateInstance(user, req.body);
    if (!!user) {
      res.json(user);
    }
    return res.status(StatusCodes.NOT_FOUND);
  },

  delete: async (req: Request, res: Response) => {
    res.status(StatusCodes.NO_CONTENT).json(await userSchemaController.delete(req.params.userId));
  },
};
