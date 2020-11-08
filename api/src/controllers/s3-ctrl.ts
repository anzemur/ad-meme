import { Controller } from './ctrl';
import { boundMethod as BoundMethod } from 'autobind-decorator';
import { NextFunction } from 'express';
import { HttpStatusCodes } from '../config/http-status-codes';
import { getSignedUrl } from '../lib/s3';
import { BadRequestError } from '../lib/errors';

/**
 * S3 controller.
 */
export class S3Controller extends Controller {
 
   constructor() {
     super(S3Controller.name);
   }

  /**
   * Gets signed S3 url.
   */
  @BoundMethod
  public async getSignedS3Url(req: any, res: any, next: NextFunction) {
    res.return(HttpStatusCodes.OK, await getSignedUrl());
  }
}
