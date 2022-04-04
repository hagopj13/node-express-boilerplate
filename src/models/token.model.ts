import mongoose, { ObjectId } from 'mongoose';
import { toJSON } from './plugins/toJSON.plugin';
import { TokenType, tokenTypes } from '../config/tokens';
import { getModelForClass, prop, plugin, DocumentType } from '@typegoose/typegoose';

// add plugin that converts mongoose to json
@plugin(toJSON)
class TokenClass {
  toJSON!: () => any;

  @prop({ required: true, auto: true })
  public id!: mongoose.Schema.Types.ObjectId;

  @prop({ required: true })
  public user!: string;

  @prop({ required: true, enum: Object.values(tokenTypes) })
  public type!: TokenType;

  @prop({ required: true })
  public expires!: Date;

  @prop()
  public blacklisted: boolean = false;
}

/**
 * @typedef Token
 */
export const Token = getModelForClass(TokenClass, { schemaOptions: { timestamps: true } });
export type TokenModel = DocumentType<TokenClass>;
