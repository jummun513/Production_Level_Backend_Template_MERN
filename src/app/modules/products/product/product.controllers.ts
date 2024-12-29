import { StatusCodes } from 'http-status-codes';
import { productServices } from './product.services';
import catchAsync from '../../../../utils/catchAsync';
import sendResponse from '../../../../utils/sendResponse';

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
  getSingleProduct,
  softDeleteSingleProduct,
  updateSingleProduct,
};
