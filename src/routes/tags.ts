import { Router } from "express";
import { tagsController } from "../controllers/tags";

const router = Router();

router.get("/", tagsController.getAll);
router.post("/", tagsController.create);
router.delete("/:id", tagsController.delete);

export { router as tagRouter };
