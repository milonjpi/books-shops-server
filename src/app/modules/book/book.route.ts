import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// create book
router.post(
  '/create-book',
  validateRequest(BookValidation.create),
  BookController.createBook
);

// get all books
router.get('/', BookController.getAllBooks);

// get single book
router.get('/:id', BookController.getSingleBook);

// get books by category id
router.get('/:id/category', BookController.getBooksByCategoryId);

// update single book
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookController.updateSingleBook
);

// delete single book
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteSingleBook
);

export const BookRoutes = router;
