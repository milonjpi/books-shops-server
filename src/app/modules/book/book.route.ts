import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

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

// update single book
router.patch(
  '/:id',
  validateRequest(BookValidation.update),
  BookController.updateSingleBook
);

// delete single book
router.delete('/:id', BookController.deleteSingleBook);

export const BookRoutes = router;
