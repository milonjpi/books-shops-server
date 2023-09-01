import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

// create category
const createCategory = async (data: Category): Promise<Category | null> => {
  const result = await prisma.category.create({ data });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Create');
  }

  return result;
};

// get all categories
const getAllCategories = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
};

// get single Category
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return result;
};

// update single Category
const updateSingleCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  // check is exist
  const isExist = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category Not Found');
  }

  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Category');
  }

  return result;
};

// delete single Category
const deleteSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
