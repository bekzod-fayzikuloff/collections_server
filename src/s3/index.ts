import { S3Client } from "@aws-sdk/client-s3";
import { config } from "../config";

const { S3: s3Config } = config;

export const s3Client = new S3Client({
  region: s3Config.region,
});
