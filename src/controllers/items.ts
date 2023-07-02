import { Request, Response } from "express";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { createInstance, getAll, getOne, updateInstance } from "../dto";
import { CustomField, Item } from "../models/items";
import { StatusCodes } from "http-status-codes";
import { Like } from "../models/likes";
import { ItemCreateRequest, ItemDetailResponse, ItemListResponse } from "../types/schemas/items.response";

export const getItemById = async (id: number) => {
  return await getOne(Item, {
    where: { id },
    include: [
      {
        all: true,
      },
    ],
  });
};

@Route("api/items")
@Tags("items")
class ItemsSchemaController extends Controller {
  @Get()
  public static async getAll(): Promise<ItemListResponse | void> {}

  @Post()
  public static async create(@Body() payload: ItemCreateRequest): Promise<ItemDetailResponse | void> {}

  @Get("{id}")
  public static async getOne(@Path() id: number): Promise<ItemDetailResponse | void> {}

  @Patch("{id}")
  public static async update(
    @Body() payload: ItemCreateRequest,
    @Path() id: number
  ): Promise<ItemDetailResponse | void> {}

  @Delete("{id}")
  public static async delete(@Path() id: number): Promise<any> {}
}

export const itemsController = {
  getAll: async (req: Request, res: Response) => {
    res.json(await getAll(Item, { include: [Like] }));
  },

  create: async (req: Request, res: Response) => {
    const { title, customFields } = req.body;
    const item = await createInstance(Item, { title, customFields });
    customFields.map(async (cf: { type: string; value: string }) => {
      try {
        await createInstance(CustomField, { ...cf, itemId: item.id });
      } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json(item);
      }
    });
    res.status(StatusCodes.CREATED).json(item);
  },

  getOne: async (req: Request, res: Response) => {
    const item = await getItemById(+req.params.id);
    item ? res.json(item) : res.status(StatusCodes.NOT_FOUND).json({});
  },

  update: async (req: Request, res: Response) => {
    const item = await getItemById(+req.params.id);
    if (!item) {
      return res.status(StatusCodes.NOT_FOUND).json({});
    }
    await updateInstance(item, req.body);
    return res.json(item);
  },

  delete: async (req: Request, res: Response) => {
    const item = await getItemById(+req.params.id);
    item && (await item.destroy());
    res.status(StatusCodes.NO_CONTENT).json();
  },
};
