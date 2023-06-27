import { Request, Response, NextFunction } from "express";
import { createInstance, getAll, getOne, updateInstance } from "../dto";
import { Subjects } from "../models/subjects";
import { StatusCodes } from "http-status-codes";

const getSubjectById = async (id: number) => {
  return await getOne(Subjects, { where: { id } });
};

export const subjectsController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    res.json(await getAll(Subjects));
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    const subject = await getSubjectById(+req.params.id);
    if (subject) {
      res.json(subject);
    } else res.status(StatusCodes.NOT_FOUND).json({ detail: "Subject with this ID not found" });
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;
    const subject = await createInstance(Subjects, { title, description });
    res.status(StatusCodes.CREATED).json(subject);
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const subject = await getSubjectById(+req.params.id);
    if (!subject) {
      return res.status(StatusCodes.NOT_FOUND);
    }
    // @ts-ignore
    if (!req.user?.isAdmin) {
      return res.status(StatusCodes.FORBIDDEN).json();
    }
    await updateInstance(subject, req.body);
    return res.json(subject);
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    const subject = await getSubjectById(+req.params.id);
    // @ts-ignore
    if (subject && !req.user?.isAdmin) {
      return res.status(StatusCodes.FORBIDDEN).json();
    }
    subject && (await subject.destroy());
    res.status(StatusCodes.NO_CONTENT).json();
  },
};
