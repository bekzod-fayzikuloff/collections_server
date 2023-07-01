import { Router } from "express";
import { likesController } from "../controllers/likes";

const router = Router();

router.get("/", likesController.getAll);
router.post("/", likesController.create);
router.get("/:id", likesController.getOne);
router.delete("/:id", likesController.delete);

export { router as likeRouter };
