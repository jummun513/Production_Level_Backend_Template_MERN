import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { TUserRole } from '../modules/users/user/user.interfaces';
import ApiError from '../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }
  });
};

export default auth;
