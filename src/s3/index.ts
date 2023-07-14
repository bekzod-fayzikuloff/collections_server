import { Client } from "minio";
import { config } from "../config";

const { S3: s3Config } = config;

export const s3Client = new Client({
  endPoint: s3Config.region,
  useSSL: true,
  accessKey: s3Config.accessKeyId,
  secretKey: s3Config.secretAccessKey,
});

export const sendImageToS3BS64 = async (fileName: string, imageData: any) => {
  const imageBuffer = Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), "base64");
  console.log(imageData);
  const type = imageData.split(";")[0].split("/")[1];
  console.log("type", imageData);
  // const metaData = {
  //   "Content-Encoding": 'base64',
  //   "Content-Type": `image/${type}`
  // };
  try {
    await s3Client.putObject(s3Config.bucket, fileName, imageBuffer);
    return `https://s3.${config.S3.region}.amazonaws.com/${config.S3.bucket}/${fileName}`;
  } catch (err) {
    console.log("Error", err);
  }
};
