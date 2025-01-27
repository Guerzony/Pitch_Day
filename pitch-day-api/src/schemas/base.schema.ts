import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export class BaseSchema {
  @Prop()
  _id: ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date })
  deletedAt: Date;
}
