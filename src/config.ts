import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  ELASTIC: {
    node: process.env.ELASTIC_NODE,
  },
  S3: {
    region: process.env.S3_REGION,
  },
};
