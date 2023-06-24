import { Request, Response, NextFunction } from "express";
import { createInstance, getAll, getOne } from "../dto";
import { Collection } from "../models/collections";
import { StatusCodes } from "http-status-codes";
import { Subjects } from "../models/subjects";
import { getUserById } from "./users";
import { sendImageToS3 } from "../s3";

export const collectionsController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    res.json(await getAll(Collection));
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const file = req.files?.image;
    // @ts-ignore
    const fileName = req.files?.image?.name;

    const { title, description, subjectId, userId, customFields } = req.body;
    const collection = await createInstance(Collection, {
      title,
      description,
      // @ts-ignore
      image: await sendImageToS3(fileName, file?.data),
      customFields,
    });
    const subject = await getOne(Subjects, { where: { id: subjectId } });
    const user = await getUserById(userId);
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "user have to existed" });
    }
    collection.setUser(user);
    collection.setSubject(subject);
    res.status(StatusCodes.CREATED).json(collection);
  },
};
