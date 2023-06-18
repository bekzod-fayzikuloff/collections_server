import { config } from "./config";
import { setupApp } from "./services/app";
import { apiRouter } from "./routes";

const app = setupApp();

app.use("/api", apiRouter);

app.listen(config.PORT, () => {
  console.log(`⚡️Server is running at http://localhost:${config.PORT}`);
});
