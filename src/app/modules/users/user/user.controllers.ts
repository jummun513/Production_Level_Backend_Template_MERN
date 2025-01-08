import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../utils/catchAsync';
import sendResponse from '../../../../utils/sendResponse';
import { userServices } from './user.services';
import config from '../../../../config';

const createUser = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data created successfully!',
    data: { accessToken, user },
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userServices.getSingleUserFromDB(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data retrieved successfully!',
    data: result,
  });
});

const softDeleteSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await userServices.softDeleteSingleUserFromDB(userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data deleted successfully!',
    data: null,
  });
});

const updateSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userServices.updateSingleUserIntoDB(userId, req?.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Data updated successfully!',
    data: result,
  });
});

export const userControllers = {
  createUser,
  getSingleUser,
  softDeleteSingleUser,
  updateSingleUser,
};
