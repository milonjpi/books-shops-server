import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();
// get all user
router.get('/', UserController.getAllUsers);

// get single user
router.get('/:id', UserController.getSingleUser);

// update single user
router.patch(
  '/:id',
  validateRequest(UserValidation.update),
  UserController.updateUser
);

// delete single user
router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
