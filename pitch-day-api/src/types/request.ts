import { Request } from 'express';

export type UserMetaData = {
  id?: string;
  name: string;
};

export type RequestWithUser = Request & {
  user: UserMetaData;
};
