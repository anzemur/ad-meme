import { Model } from './mod';
import { prop, getModelForClass } from '@typegoose/typegoose';

/**
 * Meme model class.
 */
export class MemeModel extends Model {

  @prop({
    required: true
  })
  firstName: string;
  
}

export const Meme = getModelForClass(MemeModel);
