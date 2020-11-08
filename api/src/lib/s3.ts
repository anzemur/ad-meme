import S3 from 'aws-sdk/clients/s3'
import { v1 as uuidv1 } from 'uuid';

export async function getSignedUrl() {
  const newKey = `${uuidv1()}`;
  const client = getS3Client();
  return {
    key: newKey,
    url: await client.getSignedUrlPromise('putObject', {
      Key: newKey,
      Bucket: process.env.AWS_BUCKET,
      Expires: 60, // seconds
      ACL: 'public-read-write',
    }),
  }
}

function getS3Client() {
  return new S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    signatureVersion: 'v4',
  });
}

export async function getObject(key: string) {
  const client = getS3Client();
  return client.getObject(
    {
      Key: key,
      Bucket: process.env.AWS_BUCKET,
    }
  ).promise();
}

export function getGetUrl(key: string) {
  return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REG}.amazonaws.com/${key}`
}