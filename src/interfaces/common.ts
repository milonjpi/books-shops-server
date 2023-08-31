import { Types } from 'mongoose';
import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

// Login response
export type ILoginResponse = {
  accessToken: string;
  refreshToken: string;
};

// is exist response
export type IsExistResponse = {
  _id: Types.ObjectId;
  password: string;
  role: string;
};
