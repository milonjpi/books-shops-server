import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { OrderService } from './order.service';
import { Order } from '@prisma/client';

// create order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

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
  const result = await OrderService.getAllOrders();

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

  const result = await OrderService.getSingleOrder(id);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

// delete single order
const deleteSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await OrderService.deleteSingleOrder(id);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  deleteSingleOrder,
};
