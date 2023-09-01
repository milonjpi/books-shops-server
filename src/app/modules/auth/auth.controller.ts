import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import config from '../../../config';
import { ILoginResponse } from '../../../interfaces/common';
import { User } from '@prisma/client';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await AuthService.signUp(data);
  if (result) {
    sendResponse<User>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Signup completed Successfully',
      data: result,
    });
  }
});

// signIn
const signIn = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.signIn(data);
  const { refreshToken, accessToken } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<Pick<ILoginResponse, 'accessToken'>>(res, {
    statusCode: 200,
    success: true,
    message: 'Login complete successfully',
    data: { accessToken },
  });
});

export const AuthController = {
  signUp,
  signIn,
};
