import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { BookService } from './book.service';
import { Book } from '@prisma/client';

// add book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await BookService.createBook(data);
  if (result) {
    sendResponse<Book>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book added Successfully',
      data: result,
    });
  }
});

// get all books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllBooks();

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result,
  });
});

// get single book
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getSingleBook(id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});


// // get books by category id
const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.getBooksByCategoryId(id);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result,
  });
});

// update single Book
const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await BookService.updateSingleBook(id, data);

  sendResponse<Book>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book Updated Successfully',
    data: result,
  });
});

// delete single Book
const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await BookService.deleteSingleBook(id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  getBooksByCategoryId,
  updateSingleBook,
  deleteSingleBook,
};
