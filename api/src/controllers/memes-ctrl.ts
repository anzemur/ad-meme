import { Controller } from './ctrl';
import { boundMethod as BoundMethod } from 'autobind-decorator';
import { NextFunction } from 'express';
import { HttpStatusCodes } from '../config/http-status-codes';
import { Meme } from '../models/meme-mod';
import { InternalServerError, NotFoundError } from '../lib/errors';
import { toObjectId } from '../lib/parsers';

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

    try {
      const memes  = await Meme.aggregate([{ $sample: { size: 1 } }])

      if (memes.length > 0) {
        res.return(HttpStatusCodes.OK, memes[0]);
      } else {
        throw new NotFoundError();
      }

    } catch (error) {
      throw new InternalServerError("There was problem while getting meme :(");
    }
  }

  /**
   * Likes a meme.
   */
  @BoundMethod
  public async likeMeme(req: any, res: any, next: NextFunction) {

    try {
      const meme = await Meme.findOneAndUpdate(
        { '_id': toObjectId(req.params.memeId) },
        { '$inc': { likes: 1 } }
      );
      res.return(HttpStatusCodes.OK, meme);
    } catch (error) {
      throw new InternalServerError("There was problem while liking a meme :("); 
    } 
  }

  /**
   * Returns top rated memes.
   */
  @BoundMethod
  public async getTopRatedMemes(req: any, res: any, next: NextFunction) {
    try {
      const memes = await Meme.aggregate([
        { $sort : { likes : -1 } },
        { $limit: 10 },
      ]);

      res.return(HttpStatusCodes.OK, memes);
    } catch (error) {
      throw new InternalServerError("There was problem while getting memes :("); 
    } 
  }

}
