import { Router } from "express";
import { userController } from "../controllers/users";
import { userCreateValidate } from "../validations/user.validation";
import { catchValidationResult } from "../utils/valitors";
import { isValidUserUUID } from "../middlewares/path";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userCreateValidate, [catchValidationResult, userController.create]);
router.get("/:userId", [isValidUserUUID, userController.getOne]);
router.patch("/:userId", [isValidUserUUID, userController.update]);
router.delete("/:userId", [userController.delete]);

export { router as userRouter };
