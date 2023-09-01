import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { User } from '@prisma/client';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';

// signup
const signUp = async (data: User): Promise<User | null> => {
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await prisma.user.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Signup');
  }

  return result;
};

// signIn
const signIn = async (
  payload: Pick<User, 'email' | 'password'>
): Promise<string> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  // create access token and refresh token
  const { id, role } = isUserExist;
  const token = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return token;
};

export const AuthService = {
  signUp,
  signIn,
};
