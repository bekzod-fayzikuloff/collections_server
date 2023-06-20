import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  res.json("good");
});

export { router as collectionRouter };
