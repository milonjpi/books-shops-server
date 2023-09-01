import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// user signup
router.post(
  '/signup',
  validateRequest(AuthValidation.signUp),
  AuthController.signUp
);

// user signUp
router.post(
  '/signin',
  validateRequest(AuthValidation.signIn),
  AuthController.signIn
);

export const AuthRoutes = router;
