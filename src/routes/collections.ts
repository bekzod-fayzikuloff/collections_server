import { Router } from "express";
import { collectionsController } from "../controllers/collections";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

router.get("/", collectionsController.getAll);
router.post("/", [authenticateToken, collectionsController.create]);
router.get("/:id", collectionsController.getOne);

export { router as collectionRouter };
