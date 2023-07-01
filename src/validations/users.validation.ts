import { body } from "express-validator";
import { usersEmailIsExist } from "../services/users";

export const userCreateValidate = [
  body("username").notEmpty().withMessage("username is required"),
  body("email")
    .isEmail()
    .withMessage("email is required")
    .custom(async (value) => {
      if (await usersEmailIsExist(value)) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("password is required and must contain at least 8 characters "),
];

export const userLoginValidate = [
  body("email").isEmail().withMessage("email is required"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("password is required and must contain at least 8 characters "),
];
