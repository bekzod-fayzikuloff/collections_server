import { Controller, Post, Get, Patch, Delete, Route, Path } from "tsoa";
import { Request, Response, NextFunction } from "express";
import { UserCreateResponse } from "../types/schemas/user.response";

@Route("users")
export class userSchemaController extends Controller {
  @Post()
  public static async create(): Promise<UserCreateResponse> {
    return { create: true };
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
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    await userSchemaController.getAll();
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    await userSchemaController.create();
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    await userSchemaController.getOne(1);
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    await userSchemaController.update(1);
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    await userSchemaController.delete(1);
  },
};
