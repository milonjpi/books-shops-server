import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Book, Prisma } from '@prisma/client';
import { IBookFilters } from './book.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { bookSearchableFields } from './book.constant';
import { IGenericResponse } from '../../../interfaces/common';

// create Book
const createBook = async (data: Book): Promise<Book | null> => {
  const result = await prisma.book.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create book');
  }

  return result;
};

// get all books
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { search, minPrice, maxPrice, category } = filters;
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice) {
    andConditions.push({ price: { gte: Number(minPrice) } });
  }

  if (maxPrice) {
    andConditions.push({ price: { lte: Number(maxPrice) } });
  }
  if (category) {
    andConditions.push({ categoryId: category });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
    skip,
    take: size,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
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
