import { Application, Router } from 'express';
import { S3Controller } from '../controllers/s3-ctrl';

/* Register controller. */
const s3Controller = new S3Controller();

/**
 * Registers memes api routes at `/api/{API_VERSION}/memes`.
 * @param app Express application instance.
 */
export function registerFileUploadRoutes(app: Application) {
  app.use(`/api/${process.env.API_VERSION || 'v1'}/file-upload`, fileUploadRoutes());
}

/**
 * Memes api routes.
 */
export function fileUploadRoutes() {
  const router = Router();

  router.get('/signed-url', s3Controller.getSignedS3Url);

  return router;
}
