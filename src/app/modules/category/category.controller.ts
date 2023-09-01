import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CategoryService } from './category.service';
import { Category } from '@prisma/client';

// create category
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  const result = await CategoryService.createCategory(data);
  if (result) {
    sendResponse<Category>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Category created Successfully',
      data: result,
    });
  }
});

// get all categories
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();

  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

// get single Category
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CategoryService.getSingleCategory(id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

// update single Category
const updateSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await CategoryService.updateSingleCategory(id, data);

  sendResponse<Category>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category Updated Successfully',
    data: result,
  });
});

// delete single category
const deleteSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CategoryService.deleteSingleCategory(id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
