import { Controller } from './ctrl';
import { boundMethod as BoundMethod } from 'autobind-decorator';
import { NextFunction } from 'express';
import { HttpStatusCodes } from '../config/http-status-codes';
import { getSignedUrl } from '../lib/s3';

/**
 * Memes controller.
 */
export class S3Controller extends Controller {
 
   constructor() {
     super(S3Controller.name);
   }

  /**
   * Get random meme.
   */
  @BoundMethod
  public async getSignedS3Url(req: any, res: any, next: NextFunction) {
    const userId = req.params.userId;
    if (!req.body || !req.body.key) {
      res.return(HttpStatusCodes.BadRequest, { msg: 'File key missing' });
    }
    res.return(HttpStatusCodes.OK, await getSignedUrl(req.body.key));
  }
}
