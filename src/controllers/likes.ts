import { Request, Response } from "express";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { createInstance, getAll, getOne, updateInstance } from "../dto";
import { Like } from "../models/likes";
import { StatusCodes } from "http-status-codes";
import { getItemById } from "./items";
import { getUserById } from "./users";
import { LikeCreateRequest, LikeResponse } from "../types/schemas/likes.response";

const getLikeById = async (id: number) => {
  return await getOne(Like, { where: { id } });
};

@Route("api/likes")
@Tags("likes")
class LikesSchemaController extends Controller {
  @Get()
  public static async getAll(): Promise<LikeResponse[] | void> {}

  @Post()
  public static async create(@Body() payload: LikeCreateRequest): Promise<LikeResponse | void> {}

  @Get("{id}")
  public static async getOne(@Path() id: number): Promise<LikeResponse | void> {}

  @Delete("{id}")
  public static async delete(@Path() id: number) {}
}

export const likesController = {
  getAll: async (req: Request, res: Response) => {
    res.json(await getAll(Like));
  },

  create: async (req: Request, res: Response) => {
    const { itemId, userId } = req.body;
    const item = await getItemById(+itemId);
    const user = await getUserById(userId);
    if (!item || !user) {
      return res.status(StatusCodes.BAD_REQUEST).json({});
    }
    const like = await createInstance(Like, { itemId });
    like.setUser(user);
    res.status(StatusCodes.CREATED).json(like);
  },

  getOne: async (req: Request, res: Response) => {
    const like = await getLikeById(+req.params.id);
    like ? res.json(like) : res.status(StatusCodes.NOT_FOUND).json({});
  },

  delete: async (req: Request, res: Response) => {
    const like = await getLikeById(+req.params.id);
    like && (await like.destroy());
    res.status(StatusCodes.NO_CONTENT).json();
  },
};
