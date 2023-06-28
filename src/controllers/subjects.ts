import { Request, Response, NextFunction } from "express";
import { createInstance, getAll, getOne, updateInstance } from "../dto";
import { Subjects } from "../models/subjects";
import { StatusCodes } from "http-status-codes";
import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa";
import { SubjectCreateRequest, SubjectsCreateResponse } from "../types/schemas/subjects.response";

@Route("api/subjects")
@Tags("subjects")
export class SubjectsSchemaController extends Controller {
  @Post()
  public static async create(@Body() payload: SubjectCreateRequest): Promise<SubjectsCreateResponse | void> {}

  @Get()
  public static async getAll(): Promise<SubjectsCreateResponse | void> {}

  @Get("{id}")
  public static async getOne(@Path() id: number): Promise<SubjectsCreateResponse | void> {}

  @Patch("{id}")
  public static async update(
    @Path() id: number,
    @Body() payload: SubjectCreateRequest
  ): Promise<SubjectsCreateResponse | void> {}

  @Delete("{id}")
  public static async delete(@Path() id: number) {}
}

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
