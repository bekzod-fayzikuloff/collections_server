import { Router } from "express";
import { userController } from "../controllers/users";
import { userCreateValidate, userLoginValidate } from "../validations/users.validation";
import { catchValidationResult } from "../utils/valitors";
import { isValidUserUUID } from "../middlewares/path";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userCreateValidate, [catchValidationResult, userController.create]);
router.post("/login", userLoginValidate, [catchValidationResult, userController.login]);
router.get("/:userId", [isValidUserUUID, userController.getOne]);
router.patch("/:userId", [isValidUserUUID, userController.update]);
router.put("/:userId", [isValidUserUUID, userController.update]);
router.delete("/:userId", [userController.delete]);

export { router as userRouter };
