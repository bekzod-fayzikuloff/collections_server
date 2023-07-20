import { Request, Response } from "express";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { createInstance, getAll, getOne, updateInstance } from "../dto";
import { CustomField, Item } from "../models/items";
import { StatusCodes } from "http-status-codes";
import { Like } from "../models/likes";
import { ItemCreateRequest, ItemDetailResponse, ItemListResponse } from "../types/schemas/items.response";
import { filterItems } from "../services/search";
import { Collection } from "../models/collections";
import { User } from "../models/users";
import { deleteDocumentById, putNewDoc } from "../elastic";
import { getCollectionById } from "./collections";
import { ITEMS } from "../constants";

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

export const getLatestItems = async (limit: number) => {
  return await getAll(Item, {
    limit,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Collection,
        attributes: ["title"],
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
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
    if (req.query.q) {
      return res.json(await filterItems(req.query.q as string));
    }
    if (req.query.latest) {
      return res.json(await getLatestItems(+req.query.latest));
    }
    res.json(await getAll(Item, { include: [Like] }));
  },

  create: async (req: Request, res: Response) => {
    let { title, customFields, collectionId } = req.body;
    const item = await createInstance(Item, { title, collectionId });
    const collection = await getCollectionById(+collectionId);
    customFields = customFields ? customFields : [];
    customFields.map(async (cf: { type: string; value: string }) => {
      try {
        await createInstance(CustomField, { ...cf, itemId: item.id });
      } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json(item);
      }
    });

    const itemJson = item.toJSON();

    await putNewDoc(ITEMS, {
      ...itemJson,
      tags: [],
      likes: [],
      comments: [],
      collection: collection.toJSON(),
      customFields,
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
    let customFields = req.body.customFields || [];
    for (const cf of customFields) {
      try {
        const instance = await getOne(CustomField, { where: { id: cf.id } });
        await updateInstance(instance, { ...cf });
      } catch (e) {
        return res.status(StatusCodes.BAD_REQUEST).json(item);
      }
    }
    await updateInstance(item, req.body);
    return res.json(item);
  },

  delete: async (req: Request, res: Response) => {
    const item = await getItemById(+req.params.id);
    item && (await item.destroy());
    deleteDocumentById(ITEMS, req.params.id)
      .then(() => {
        console.log("delete");
      })
      .catch(() => {
        console.log("Fail");
      });
    res.status(StatusCodes.NO_CONTENT).json();
  },
};
