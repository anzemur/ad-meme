import env from './config/env';
import express, { Application } from 'express';
import mongoose, { Connection } from 'mongoose';
import { Server } from 'http';
import { registerMemesRoutes } from './routes/memes';
import { registerRootRoutes } from './routes/root';
import { registerFileUploadRoutes } from './routes/file-upload';
import { handleErrors, handleNotFoundError } from './middleware/errors';
import { registerCors, registerBodyParsers, registerDeviceParsers, parseResponse } from './middleware/parsers';
import { registerContext } from './middleware/context';
import { MongooseEvents } from './config/types';

/**
 * Base application instance.
 */
export class App {
  public app: Application;
  public server: Server;
  public mongooseConnection: Connection;
  public port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT || 3000);
  }

  /**
   * Registers applications routes and middleware.
   */
  public async registerRoutesAndMiddleware() {

    /* Register parsers middleware. */
    registerCors(this.app);
    registerBodyParsers(this.app);
    registerDeviceParsers(this.app);
    this.app.use(parseResponse);

    /* Register api middleware. */
    this.app.use(registerContext(this.mongooseConnection));

    /* Register api routes. */
    registerRootRoutes(this.app);
    registerMemesRoutes(this.app);
    registerFileUploadRoutes(this.app);

    /* Register api errors middleware. */
    this.app.use(handleNotFoundError);
    this.app.use(handleErrors);

    console.log(`│ Routes and middleware registered.`);
  }

  /**
   * Starts server on given port.
   */
  public async listen() {
    return new Promise((resolve) => {
      this.server = this.app.listen(this.port, resolve);
      console.log(`│ Server listening on port: ${this.port}.`);
    });
  }

  /**
   * Stops the server.
   */
  public async close() {
    return new Promise((resolve, reject) => {
      this.server.close(error => {
        if (error) {
          return reject(error);
        }
        this.server = null;
        resolve();
      });
    });
  }

  /**
   * Connects to database.
   */
  public async connectDb() {
    let connectionUri: string = process.env.DB_URL;
  
    this.mongooseConnection = mongoose.connection;

    /* Mongoose connection. */
    this.mongooseConnection.on(MongooseEvents.CONNECTED, () => {
      console.log('│ MongoDB is connected on: ', connectionUri);
    });

    /* Mongoose error. */
    this.mongooseConnection.on(MongooseEvents.ERROR, (error) => {
      console.log('│ MongoDB encountered an error: ' + error);
    });

    /* Mongoose disconnected.*/
    this.mongooseConnection.on(MongooseEvents.DISCONNECTED, () => {
      console.log('│ MongoDB is disconnected.');
    });

    await mongoose.connect(connectionUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  }

  /**
   * Closes database connection.
   */
  public async closeDbConnection() {
    await this.mongooseConnection.close();
  }
}
