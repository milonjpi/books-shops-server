import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
// create category
router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createAndUpdate),
  CategoryController.createCategory
);

// get all categories
router.get('/', CategoryController.getAllCategories);

// get single category
router.get('/:id', CategoryController.getSingleCategory);

// update single category
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createAndUpdate),
  CategoryController.updateSingleCategory
);

// delete single category
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteSingleCategory
);

export const CategoryRoutes = router;
