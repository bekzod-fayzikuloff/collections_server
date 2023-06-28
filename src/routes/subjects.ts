import { Router } from "express";
import { subjectsController } from "../controllers/subjects";

const router = Router();

router.get("/", subjectsController.getAll);
router.get("/:id", subjectsController.getOne);
router.post("/", subjectsController.create);
router.patch("/:id", subjectsController.update);
router.delete("/:id", subjectsController.delete);

export { router as subjectRouter };
