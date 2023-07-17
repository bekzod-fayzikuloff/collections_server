import { Router } from "express";
import { collectionsController } from "../controllers/collections";
import { authenticateToken } from "../middlewares/auth";

const router = Router();

router.get("/", collectionsController.getAll);
router.post("/", [collectionsController.create]);
router.get("/:id", collectionsController.getOne);
router.get("/:id/items", collectionsController.getCollectionItems);
router.delete("/:id", [collectionsController.delete]);
router.patch("/:id", [authenticateToken, collectionsController.update]);
router.put("/:id", [collectionsController.update]);

export { router as collectionRouter };
