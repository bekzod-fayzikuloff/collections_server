import express, { Express, Request, Response } from "express";
import { config } from "./config";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { elasticClient } from "./elastic";

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

app.get("/", (req: Request, res: Response) => {
  elasticClient.ping().then((r) => console.log(`Connect elastic: ${r}`));
  res.send("test");
});

app.listen(config.PORT, () => {
  console.log(`⚡️Server is running at http://localhost:${config.PORT}`);
});
