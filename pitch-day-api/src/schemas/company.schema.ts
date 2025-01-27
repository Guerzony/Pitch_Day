import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  favorites: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
