import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { productServices } from './product.services';

const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data created successfully!',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.getSingleProductFromDB(productId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully!',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});

const softDeleteSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await productServices.softDeleteSingleProductFromDB(productId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data deleted successfully!',
    data: null,
  });
});

const updateSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.updateSingleProductIntoDB(
    productId,
    req?.body
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data updated successfully!',
    data: result,
  });
});

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  softDeleteSingleProduct,
  updateSingleProduct,
};
