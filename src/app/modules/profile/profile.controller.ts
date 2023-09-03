import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProfileService } from './profile.service';
import sendResponse from '../../../shared/sendResponse';
import { User } from '@prisma/client';
import httpStatus from 'http-status';

// Get Profile Information
const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await ProfileService.getProfile(user?.id);

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});

export const ProfileController = {
  getProfile,
};
