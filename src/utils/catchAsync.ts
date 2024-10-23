/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextFunction, Request, RequestHandler, Response } from 'express';

// a higher order function
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
