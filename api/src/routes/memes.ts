import { Application, Router } from 'express';
import { MemesController } from '../controllers/memes-ctrl';

/* Register controller. */
const memesController = new MemesController();

/**
 * Registers memes api routes at `/api/{API_VERSION}/memes`.
 * @param app Express application instance.
 */
export function registerMemesRoutes(app: Application) {
  app.use(`/api/${process.env.API_VERSION || 'v1'}/memes`, memesRoutes());
}

/**
 * Memes api routes.
 */
export function memesRoutes() {
  const router = Router();

  router.get('/', memesController.getTopRatedMemes);
  router.get('/random', memesController.getRandomMeme);
  // router.put('/:memeId/like', memesController.likeMeme);

  return router;
}
