import { Response, Request } from "express";
import { createInstance, getAll, getOne } from "../dto";
import { Tag } from "../models/tags";
import { StatusCodes } from "http-status-codes";

export const tagsController = {
  getAll: async (req: Request, res: Response) => {
    res.json(await getAll(Tag));
  },

  create: async (req: Request, res: Response) => {
    const { title } = req.body;
    const tag = await createInstance(Tag, { title });
    res.status(StatusCodes.CREATED).json(tag);
  },

  delete: async (req: Request, res: Response) => {
    const tag = await getOne(Tag, { where: { id: +req.params.id } });
    tag && (await tag.destroy());
    res.status(StatusCodes.NO_CONTENT).json();
  },
};
