import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from "../config";

const { S3: s3Config } = config;

export const s3Client = new S3Client({
  endpoint: s3Config.endpoint,
  region: s3Config.region,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
});

export const sendImageToS3BS64 = async (fileName: string, imageData: any) => {
  const imageBuffer = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), "base64");
  const type = imageData.split(";")[0].split("/")[1];
  const bucketParams = {
    Bucket: "collections-s3",
    Key: fileName,
    Body: imageBuffer,
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
    ACL: "public-read",
  };

  try {
    await s3Client.send(new PutObjectCommand(bucketParams));
    return `https://${s3Config.bucket}.${s3Config.region}.digitaloceanspaces.com/${fileName}`;
  } catch (err) {
    console.log("Error", err);
  }
};
