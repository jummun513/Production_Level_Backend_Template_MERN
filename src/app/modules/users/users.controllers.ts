import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { usersServices } from './users.services';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await usersServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully!',
    meta: result?.meta,
    data: result?.data,
  });
});
export const usersControllers = {
  getAllUsers,
};
