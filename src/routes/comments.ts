import { Router } from "express";
import { commentsController } from "../controllers/comments";

const router = Router();

router.get("/", commentsController.getAll);
router.post("/", commentsController.create);
router.get("/:id", commentsController.getOne);
router.patch("/:id", commentsController.update);
router.delete("/:id", commentsController.delete);

export { router as commentRouter };
