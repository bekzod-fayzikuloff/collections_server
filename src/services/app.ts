import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import { config } from "../config";
import bodyParser from "body-parser";

export const setupApp = (): Express => {
  const app: Express = express();
  app.use(helmet());

  app.use(
    cors({
      origin: config.CORS_ORIGIN,
    })
  );

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json());
  return app;
};
