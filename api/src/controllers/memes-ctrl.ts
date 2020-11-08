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
        return next(new NotFoundError());
      }

    } catch (error) {
      return next(new InternalServerError("There was problem while getting meme :("));
    }
  }

  /**
   * Get random meme in img elements.
   */
  @BoundMethod
  public async getRandomMemeImgElement(req: any, res: any, next: NextFunction) {

    try {
      const memes  = await Meme.aggregate([{ $sample: { size: 1 } }])
      if (memes.length > 0) {
        const imagePutUrl = `${process.env.HOST_NAME}/api/${process.env.API_VERSION || 'v1'}/memes/${memes[0]._id}/like`;
        const heart = `<svg style="
        fill: red;
        position: relative;
        top: 5px;
        width: 50px;" viewBox="0 0 32 29.6">
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg> `
        const img = `<div style="display: inline-block; position: relative;"><img src='${memes[0].imageUrl}' style='object-fit: contain; width: 100%; height: 100%;' /><div
        onclick="((param) => {
          const xhttp = new XMLHttpRequest();
          param.style = 'visibility: hidden; height: 0;';
          xhttp.open('PUT', '${imagePutUrl}', false);
          xhttp.send();
          param.style = 'display: none; position: relative;';
        })(this)"
        style="position: absolute; bottom: 1.5rem; right: 1.5rem;">${heart}</div></div>`
        res.setHeader('Content-Type', 'text/html');
        res.end(img);
      } else {
        return next(new NotFoundError());
      }

    } catch (error) {
      return next(new InternalServerError("There was problem while getting meme :("));
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
      return next(new InternalServerError("There was problem while liking a meme :(")); 
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
      return next(new InternalServerError("There was problem while getting memes :(")); 
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
