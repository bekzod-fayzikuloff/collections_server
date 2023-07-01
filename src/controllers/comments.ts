import { Request, Response } from "express";
import { Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";

@Route("api/comments")
@Tags("comments")
class CommentsSchemaController extends Controller {
  @Get()
  public static async getAll() {}

  @Post()
  public static async create() {}

  @Get("{id}")
  public static async getOne(@Path() id: number) {}

  @Patch("{id}")
  public static async update(@Path() id: number) {}

  @Delete("{id}")
  public static async delete(@Path() id: number) {}
}

export const commentsController = {
  getAll: async (req: Request, res: Response) => {},

  create: async (req: Request, res: Response) => {},

  getOne: async (req: Request, res: Response) => {},

  update: async (req: Request, res: Response) => {},

  delete: async (req: Request, res: Response) => {},
};
