import { Router } from "express";
import { itemsController } from "../controllers/items";

const router = Router();

router.get("/", itemsController.getAll);
router.post("/", itemsController.create);
router.get("/:id", itemsController.getOne);
router.patch("/:id", itemsController.update);
router.put("/:id", itemsController.update);
router.delete("/:id", itemsController.delete);

export { router as itemRouter };
