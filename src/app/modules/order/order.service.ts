import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Order, Prisma } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { ENUM_USER_ROLE } from '../../../enums/user';

// create order
const createOrder = async (data: Order): Promise<Order | null> => {
  const json = data.orderedBooks as Prisma.JsonArray;
  const result = await prisma.order.create({
    data: { ...data, orderedBooks: json },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all orders
const getAllOrders = async (user: JwtPayload): Promise<Order[]> => {
  const whereCondition =
    user?.role === ENUM_USER_ROLE.ADMIN ? {} : { userId: user?.id };

  const result = await prisma.order.findMany({
    where: whereCondition,
  });

  return result;
};

// get single order
const getSingleOrder = async (
  id: string,
  user: JwtPayload
): Promise<Order | null> => {
  const whereCondition =
    user?.role === ENUM_USER_ROLE.ADMIN ? { id } : { id, userId: user?.id };

  const result = await prisma.order.findUnique({
    where: whereCondition,
  });

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
