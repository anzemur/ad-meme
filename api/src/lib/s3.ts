import S3 from 'aws-sdk/clients/s3'
import { v1 as uuidv1 } from 'uuid';

export async function getSignedUrl(key: string) {
  const newKey = `${uuidv1()}_${key}`;
  const client = new S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    }
  })
  return {
    key: newKey,
    url: await client.getSignedUrlPromise('putObject', {
      Key: newKey,
      Bucket: process.env.AWS_BUCKET,
      Expires: 60 // seconds
    })
  }
}