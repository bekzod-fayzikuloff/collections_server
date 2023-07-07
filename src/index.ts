import { config } from "./config";
import { setupApp } from "./services/app";
import { apiRouter } from "./routes";
import * as db from "./database/sequelize";
import { setupIndexes } from "./opensearch";

const app = setupApp();

app.all("/*", function (req, res, next) {
  res.set("Access-Control-Expose-Headers", "X-Total-Count");
  res.set("X-Total-Count", "30");
  next();
});

app.use("/api", apiRouter);

db.sequelize.sync({ force: false }).then(() => {
  (async () => {
    await setupIndexes();
  })();
  app.listen(config.PORT, () => {
    console.log(`⚡️Server is running at http://localhost:${config.PORT}`);
  });
});
