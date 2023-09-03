import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

// create order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const data = { ...req.body, userId: user?.id };

  const result = await OrderService.createOrder(data);
  if (result) {
    sendResponse<Order>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Order created Successfully',
      data: result,
    });
  }
});

// get all orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await OrderService.getAllOrders(user);

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

// get single order
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user as JwtPayload;
  const result = await OrderService.getSingleOrder(id, user);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
