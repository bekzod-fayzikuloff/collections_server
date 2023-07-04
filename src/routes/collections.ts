import { Router } from "express";
import { collectionsController } from "../controllers/collections";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

router.get("/", collectionsController.getAll);
router.post("/", [collectionsController.create]);
router.get("/:id", collectionsController.getOne);
router.delete("/:id", [authenticateToken, collectionsController.delete]);
router.patch("/:id", [authenticateToken, collectionsController.update]);

export { router as collectionRouter };
