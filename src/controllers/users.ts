import { Controller, Post, Get, Patch, Delete, Route, Path, Body, Tags, Queries } from "tsoa";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../utils/jwt";
import { createInstance, getAll, getOne, updateInstance } from "../dto";
import {
  UserCreateAccessToken,
  UserCreateRequest,
  UserDetail,
  UserLoginRequest,
  UserUpdateRequest,
} from "../types/schemas/user.response";
import { User } from "../models/users";
import { NoContent, QueryParams } from "../types/schemas/base.response";
import { usersEmailIsExist } from "../services/users";

export const getUserById = async (userId: string): Promise<any> => {
  return await getOne(User, {
    where: {
      id: [userId],
    },
    attributes: {
      exclude: ["password"],
    },
  });
};

const getUserByEmail = async (email: string): Promise<any> => {
  return await getOne(User, {
    where: {
      email,
    },
  });
};

@Route("api/users")
@Tags("users")
export class userSchemaController extends Controller {
  @Post()
  public static async create(@Body() payload: UserCreateRequest): Promise<UserCreateAccessToken | void> {}

  @Get()
  public static async getAll(@Queries() query?: QueryParams): Promise<UserDetail[] | void> {}

  @Get("{userId}")
  public static async getOne(@Path() userId: string): Promise<UserDetail | void> {}

  @Patch("{userId}")
  public static async update(@Path() userId: string, @Body() payload: UserUpdateRequest): Promise<UserDetail | void> {}

  @Delete("{userId}")
  public static async delete(@Path() userId: string): Promise<NoContent | void> {}

  @Post("login")
  public static async login(@Body() payload: UserLoginRequest): Promise<UserDetail | void> {}
}

export const userController = {
  getAll: async (req: Request, res: Response) => {
    res.json(
      await getAll(User, {
        attributes: { exclude: ["password"] },
      })
    );
  },

  create: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const user = await createInstance(User, {
      username,
      email,
      password: await bcrypt.hash(password, bcrypt.genSaltSync(8)),
    });

    const userToken = { accessToken: generateAccessToken({ userId: user.id, isAdmin: user.isAdmin }) };
    res.status(StatusCodes.CREATED).json(userToken);
  },

  getOne: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await getUserById(userId);
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
    const user = await getUserById(req.params.userId);
    user && (await user.destroy());
    res.status(StatusCodes.NO_CONTENT).json();
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!!user) {
      if (await bcrypt.compare(password, user.password)) {
        return res
          .status(StatusCodes.OK)
          .json({ accessToken: generateAccessToken({ userId: user.id, isAdmin: user.isAdmin }) });
      }
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Check that your password is correct" });
    }
    res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
  },
};
