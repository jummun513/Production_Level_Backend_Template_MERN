import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { authServices } from './auth.services';
import config from '../../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserFromDB(req.body);
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
    message: 'Logged In successfully!',
    data: { accessToken, user },
  });
});

const refreshTokenToAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshTokenToAccessToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await authServices.changePasswordIntoDB(
    req.user,
    passwordData
  ); // req.user comes from the auth.ts role based validation guard
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authServices.forgetPasswordService(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Password reset link send to (${result}) your email.`,
    data: null,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;
  await authServices.resetPasswordService(payload, token as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password reset successfully!',
    data: null,
  });
});

const verifyCode = catchAsync(async (req, res) => {
  const payload = req.body;
  const { refreshToken } = req.cookies;
  await authServices.verifyCodeService(payload, refreshToken as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User verified successfully!',
    data: null,
  });
});

const resendVerificationCode = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.resendVerifyCodeService(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Verification code send to (${result}) your email.`,
    data: null,
  });
});

export const authControllers = {
  loginUser,
  refreshTokenToAccessToken,
  changePassword,
  forgetPassword,
  resetPassword,
  verifyCode,
  resendVerificationCode,
};
