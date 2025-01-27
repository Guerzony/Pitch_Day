import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseSchema } from './base.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  education: string;

  @Prop({ required: true })
  goal: string;

  @Prop({ required: true })
  skills: {
    name: string;
    level: number;
  }[];

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  curriculum: string;

  @Prop()
  profilePicture?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  linkedinLink?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
