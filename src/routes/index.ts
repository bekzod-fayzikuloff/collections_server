import { Router } from "express";
import { userRouter } from "./users";
import * as swaggerUi from "swagger-ui-express";
const router = Router();

router.use("/users", userRouter);
router.use("/docs", swaggerUi.serve);
router.use(
  "/docs",
  swaggerUi.setup(undefined, {
    explorer: true,
    customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

export { router as apiRouter };
