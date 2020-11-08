import { Model } from './mod';
import { prop, getModelForClass } from '@typegoose/typegoose';

/**
 * Meme model class.
 */
export class MemeModel extends Model {

  @prop()
  imageUrl: string;

  @prop()
  likes: number;

}

export const Meme = getModelForClass(MemeModel);
