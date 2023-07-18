import { Router } from "express";
import { userRouter } from "./users";
import * as swaggerUi from "swagger-ui-express";
import { collectionRouter } from "./collections";
import { subjectRouter } from "./subjects";
import { commentRouter } from "./comments";
import { itemRouter } from "./items";
import { likeRouter } from "./likes";
import { tagRouter } from "./tags";

const router = Router();

router.use("/users", userRouter);
router.use("/collections", collectionRouter);
router.use("/subjects", subjectRouter);
router.use("/items", itemRouter);
router.use("/comments", commentRouter);
router.use("/likes", likeRouter);
router.use("/tags", tagRouter);
router.use("/docs", swaggerUi.serve);
router.use(
  "/docs",
  swaggerUi.setup(undefined, {
    explorer: true,
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

export { router as apiRouter };
