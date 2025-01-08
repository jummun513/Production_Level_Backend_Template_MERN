import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/users/user/user.interfaces';
import catchAsync from '../../utils/catchAsync';
import ApiError from '../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { User } from '../modules/users/user/user.models';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden access detected!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    // checking if the user is exist, to prevent one user data access another user
    const user = await User.findOne({ email }, { __v: 0, isDeleted: 0 });

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        'Un-authorized access detected!'
      );
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;
