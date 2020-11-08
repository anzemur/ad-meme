import { ObjectId } from 'mongodb';
import { NextFunction, Response, RequestHandler } from 'express';
import { Connection } from 'mongoose';

/**
 * Additional request context.
 */
export class Context {
  public id: ObjectId;
  public mongooseConnection: Connection;

  constructor() {
    this.id = new ObjectId();
    this.mongooseConnection = null;
  }
}

/**
 * Context middleware that adds request context to the express request object.
 * @param req Express request instance.
 * @param res Express response instance.
 * @param next Express next function instance.
 */
export function registerContext(mongooseConnection: Connection): RequestHandler {
  return async (req: any, res: Response, next: NextFunction) => {
    req.context = new Context();    
    req.context.mongooseConnection = mongooseConnection;
    next();
  };
}
