import { Router } from "express";
import { userController } from "../controllers/users";
import { userCreateValidate } from "../validations/user.validation";
import { catchValidationResult } from "../utils/valitors";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userCreateValidate, [catchValidationResult, userController.create]);
router.get("/:userId", userController.getOne);
router.patch("/:userId", userController.update);
router.delete("/:userId", userController.delete);

export { router as userRouter };
