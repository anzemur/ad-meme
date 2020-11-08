import { prop, modelOptions } from '@typegoose/typegoose';
import { SchemaOptions } from 'mongoose';
import { ObjectId } from 'mongodb';

/**
 * Base model class.
 */
@modelOptions({schemaOptions: {
  _id       : true,
  id        : true,
  timestamps: true,
  toObject  : {
    virtuals: true
  },
  toJSON    : {
    virtuals: true
  }
}})
export abstract class Model {

  /* String representation of MongoDB ObjectId. */
  readonly id: string;

  /* MongoDB's ObjectId. */
  readonly _id: ObjectId;

  @prop()
  readonly createdAt: Date;

  @prop()
  readonly updatedAt: Date;
}
