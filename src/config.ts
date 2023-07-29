import dotenv from "dotenv";

dotenv.config();

type configProperties = {
  PORT: string | undefined;
  DB_LINK: string | undefined;
  CORS_ORIGIN: string | undefined;
  TOKEN_SECRET: string | undefined;
  ELASTIC_SEARCH: {
    cloudId: string | undefined;
    username: string | undefined;
    password: string | undefined;
  };
  S3: {
    endpoint: string | undefined;
    region: string | undefined;
    accessKeyId: string | undefined;
    secretAccessKey: string | undefined;
    bucket: string | undefined;
  };
};

export const config: configProperties = {
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  ELASTIC_SEARCH: {
    cloudId: process.env.ELASTIC_CLOUD_ID,
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD,
  },
  S3: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    bucket: process.env.S3_BUCKET,
  },
};
