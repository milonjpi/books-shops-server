import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Order, Prisma } from '@prisma/client';

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
const getAllOrders = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany();

  return result;
};

// get single order
const getSingleOrder = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// delete single order
const deleteSingleOrder = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.delete({
    where: {
      id,
    },
  });

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteSingleOrder,
};
