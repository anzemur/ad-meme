import { Controller } from './ctrl';
import { boundMethod as BoundMethod } from 'autobind-decorator';
import { NextFunction } from 'express';
import { HttpStatusCodes } from '../config/http-status-codes';
import { Meme } from '../models/meme-mod';
import { InternalServerError, NotFoundError } from '../lib/errors';
import { toObjectId } from '../lib/parsers';
import { getGetUrl, getObject } from '../lib/s3';

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

  /**
   * Creates new meme.
   */
  @BoundMethod
  public async createMeme(req: any, res: any, next: NextFunction) {
    try {
      
      if (!req.body || !req.body.key) {
        res.return(HttpStatusCodes.BadRequest, { msg: 'File key missing' });
      }
      if (await Meme.exists({
        imageUrl: getGetUrl(req.body.key)
      })) {
        res.return(HttpStatusCodes.BadRequest, { msg: 'Meme with url already exists' });
      }
      try {
        await getObject(req.body.key);
        console.log(req.body);
        const meme = Meme.create({
          imageUrl: getGetUrl(req.body.key),
          likes: 0,
        });
        res.return(HttpStatusCodes.OK, meme);
      } catch (e) {
        res.return(HttpStatusCodes.BadRequest, { msg: 'No such file' });
      }
    } catch (error) {
      return next(new InternalServerError("There was problem while creating the meme :(")); 
    } 
  }

}
