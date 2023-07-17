import { Request, Response, NextFunction } from "express";
import { createInstance, getAll, getOne, updateInstance } from "../dto";
import { Collection } from "../models/collections";
import { StatusCodes } from "http-status-codes";
import { Subjects } from "../models/subjects";
import { getUserById } from "./users";
import { sendImageToS3BS64 } from "../s3";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { CollectionsCreateRequest, CollectionsCreateResponse } from "../types/schemas/collections.response";
import { CustomField, Item } from "../models/items";
import { Tag } from "../models/tags";

const getCollectionById = async (id: number) => {
  return await getOne(Collection, { where: { id } });
};

@Route("api/collections")
@Tags("collections")
export class CollectionSchemaController extends Controller {
  @Post()
  public static async create(@Body() payload: CollectionsCreateRequest): Promise<CollectionsCreateResponse | void> {}

  @Get()
  public static async getAll(): Promise<CollectionsCreateResponse[] | void> {}

  @Get("{id}")
  public static async getOne(@Path() id: number): Promise<CollectionsCreateResponse | void> {}

  @Patch("{id}")
  public static async update(
    @Path() id: number,
    @Body() payload: CollectionsCreateRequest
  ): Promise<CollectionsCreateResponse | void> {}

  @Delete("{id}")
  public static async delete(@Path() id: number) {}
}

export const collectionsController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    res.json(await getAll(Collection));
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    const collection = await getCollectionById(+req.params.id);
    if (collection) {
      collection.customFields = JSON.parse(collection.customFields);
      res.json(collection);
    } else res.status(StatusCodes.NOT_FOUND).json({ detail: "Collection with this ID not found" });
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, subjectId, userId, customFields, image } = req.body;
    console.log(req.body);
    const collection = await createInstance(Collection, {
      title,
      description,
      image: image ? await sendImageToS3BS64(image.title, image.src) : null,
      customFields: JSON.stringify(customFields),
    });
    const subject = subjectId ? await getOne(Subjects, { where: { id: subjectId } }) : null;
    const user = await getUserById(userId);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "user have to existed" });
    }
    collection.setUser(user);
    collection.setSubject(subject);
    res.status(StatusCodes.CREATED).json(collection);
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const collection = await getCollectionById(+req.params.id);
    // @ts-ignore
    // if ((collection && collection.userId !== req.user.id) || !req.user.isAdmin) {
    //   return res.status(StatusCodes.FORBIDDEN).json();
    // }
    collection && (await collection.destroy());
    res.status(StatusCodes.NO_CONTENT).json();
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const collection = await getCollectionById(+req.params.id);
    if (!collection) {
      return res.status(StatusCodes.NOT_FOUND);
    }
    const { title, description, image, updatedAt, subjectId, userId, customFields } = req.body;
    // @ts-ignore
    // if (collection.userId !== req.user.id || !req.user.isAdmin) {
    //   return res.status(StatusCodes.FORBIDDEN).json();
    // }
    await updateInstance(collection, {
      title,
      description,
      updatedAt,
      subjectId,
      userId,
      image: image ? await sendImageToS3BS64(image.title, image.src) : null,
      customFields: JSON.stringify(customFields),
    });
    return res.json(collection);
  },

  getCollectionItems: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) {
      return res.status(StatusCodes.NOT_FOUND).json({});
    }
    const collection = await getCollectionById(+req.params.id);
    if (!collection) {
      return res.status(StatusCodes.NOT_FOUND).json({});
    }
    res.json(
      await getAll(Item, {
        where: { collectionId: req.params.id },
        include: [CustomField, Tag, Collection],
      })
    );
  },
};
