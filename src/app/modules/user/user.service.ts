/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import config from '../../../config';
import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

// get all users
const getAllUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();

  return result;
};

// get single user
const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single user
const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  // check is exist
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  // hashing password
  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds)
    );
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update User');
  }

  return result;
};

// delete user
const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });

  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
