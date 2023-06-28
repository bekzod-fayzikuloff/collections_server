import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from "../config";

const { S3: s3Config } = config;

export const s3Client = new S3Client({
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
});

export const sendImageToS3 = async (fileName: string, imageData: any) => {
  const bucketParams = {
    Bucket: s3Config.bucket,
    Key: fileName,
    Body: imageData,
  };
  try {
    await s3Client.send(new PutObjectCommand(bucketParams));
    return `https://s3.${config.S3.region}.amazonaws.com/${config.S3.bucket}/${fileName}`;
  } catch (err) {
    console.log("Error", err);
  }
};
