import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';


// signup
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

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.Ok,
    success: true,
    message: 'User signin successfully!',
    token: result,
  });
});

export const AuthController = {
  signUp,
  signIn,
};
