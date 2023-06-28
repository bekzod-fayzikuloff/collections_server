import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  ELASTIC: {
    node: process.env.ELASTIC_NODE,
  },
  S3: {
    region: process.env.S3_REGION as string,
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
    bucket: process.env.S3_BUCKET as string,
  },
};
