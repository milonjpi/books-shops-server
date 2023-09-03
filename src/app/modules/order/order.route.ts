import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// create order
router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(OrderValidation.create),
  OrderController.createOrder
);

// get all orders
router.get('/', OrderController.getAllOrders);

// get single order
router.get('/:id', OrderController.getSingleOrder);

// delete single order
router.delete('/:id', OrderController.deleteSingleOrder);

export const OrderRoutes = router;
