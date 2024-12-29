import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../utils/catchAsync';
import sendResponse from '../../../../utils/sendResponse';
import { categoryServices } from './category.services';

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDB(req?.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data created successfully!',
    data: result,
  });
});
export const categoryControllers = { createCategory };
