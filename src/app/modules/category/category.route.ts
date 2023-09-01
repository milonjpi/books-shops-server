import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();
// create category
router.post(
  '/create-category',
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
  validateRequest(CategoryValidation.createAndUpdate),
  CategoryController.updateSingleCategory
);

// delete single category
router.delete('/:id', CategoryController.deleteSingleCategory);

export const CategoryRoutes = router;
