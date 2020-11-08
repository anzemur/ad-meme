import { Controller } from './ctrl';
import { boundMethod as BoundMethod } from 'autobind-decorator';
import { NextFunction } from 'express';
import { HttpStatusCodes } from '../config/http-status-codes';

/**
 * Memes controller.
 */
export class MemesController extends Controller {
 
   constructor() {
     super(MemesController.name);
   }

  /**
   * Get random meme.
   */
  @BoundMethod
  public async getRandomMeme(req: any, res: any, next: NextFunction) {
    const userId = req.params.userId;

    res.return(HttpStatusCodes.OK, {
      "msg": "hello"
    });
  }
}
