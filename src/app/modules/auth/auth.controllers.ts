import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { authServices } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserFromDB(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Logged In Successfully!',
    data: { accessToken, user },
  });
});

export const authControllers = {
  loginUser,
};
