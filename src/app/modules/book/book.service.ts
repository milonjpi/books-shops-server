import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Book } from '@prisma/client';

// create Book
const createBook = async (data: Book): Promise<Book | null> => {
  const result = await prisma.book.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create book');
  }

  return result;
};

// get all books
const getAllBooks = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany();

  return result;
};

// get single book
const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// get books by category id
const getBooksByCategoryId = async (id: string): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: id,
    },
  });

  return result;
};

// update single book
const updateSingleBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  // check is exist
  const isExist = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found');
  }

  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Book');
  }

  return result;
};

// delete single book
const deleteSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  getBooksByCategoryId,
  updateSingleBook,
  deleteSingleBook,
};
