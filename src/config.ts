import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};
