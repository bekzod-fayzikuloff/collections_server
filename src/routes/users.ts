import { Router } from "express";
import { userController } from "../controllers/users";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:userId", userController.getOne);
router.patch("/:userId", userController.update);
router.delete("/:userId", userController.delete);

export { router as userRouter };
