import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { productsServices } from './products.services';

const getAllProducts = catchAsync(async (req, res) => {
  const result = await productsServices.getAllProductsFromDB(req?.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});
export const productsControllers = {
  getAllProducts,
};
