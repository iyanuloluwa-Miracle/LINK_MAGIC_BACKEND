import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Url extends Document {
  @Prop({ required: true })
  longUrl: string;

  @Prop({ required: true, unique: true })
  shortUrl: string;

  @Prop({ default: 0 })
  clicks: number;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
