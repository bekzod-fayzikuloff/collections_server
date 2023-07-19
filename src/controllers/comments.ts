import { Request, Response } from "express";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { createInstance, getAll, getOne, updateInstance } from "../dto";
import { Comment } from "../models/comments";
import { StatusCodes } from "http-status-codes";
import { getItemById } from "./items";
import { getUserById } from "./users";
import { CommentResponse, CommentRequest } from "../types/schemas/comments.response";
import { addItemRelation } from "../elastic";

export const getCommentById = async (id: number) => {
  return await getOne(Comment, { where: { id } });
};

@Route("api/comments")
@Tags("comments")
class CommentsSchemaController extends Controller {
  @Get()
  public static async getAll(): Promise<CommentResponse[] | void> {}

  @Post()
  public static async create(@Body() payload: CommentRequest): Promise<CommentResponse | void> {}

  @Get("{id}")
  public static async getOne(@Path() id: number): Promise<CommentResponse | void> {}

  @Patch("{id}")
  public static async update(@Path() id: number, @Body() payload: CommentRequest): Promise<CommentResponse | void> {}

  @Delete("{id}")
  public static async delete(@Path() id: number) {}
}

export const commentsController = {
  getAll: async (req: Request, res: Response) => {
    res.json(await getAll(Comment));
  },

  create: async (req: Request, res: Response) => {
    const { itemId, userId, text } = req.body;
    const item = await getItemById(+itemId);
    const user = await getUserById(userId);
    if (!item || !user) {
      return res.status(StatusCodes.BAD_REQUEST).json({});
    }
    const comment = await createInstance(Comment, { itemId, text });
    addItemRelation(itemId, "comments", [comment]).then().catch();
    comment.setUser(user);
    res.status(StatusCodes.CREATED).json(comment);
  },

  getOne: async (req: Request, res: Response) => {
    const comment = await getCommentById(+req.params.id);
    comment ? res.json(comment) : res.status(StatusCodes.NOT_FOUND).json({});
  },

  update: async (req: Request, res: Response) => {
    const comment = await getCommentById(+req.params.id);
    if (!comment) {
      return res.status(StatusCodes.NOT_FOUND).json({});
    }
    await updateInstance(comment, req.body);
    return res.json(comment);
  },

  delete: async (req: Request, res: Response) => {
    const comment = await getCommentById(+req.params.id);
    comment && (await comment.destroy());
    res.status(StatusCodes.NO_CONTENT).json();
  },
};
