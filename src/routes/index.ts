import { Router } from "express";
import { userRouter } from "./users";
import * as swaggerUi from "swagger-ui-express";
import { collectionRouter } from "./collections";
import { subjectRouter } from "./subjects";

const router = Router();

router.use("/users", userRouter);
router.use("/collections", collectionRouter);
router.use("/subjects", subjectRouter);
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
