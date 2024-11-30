/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound = (req: Request, res: Response): void => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found!',
      },
    ],
  });
  return;
};

export default notFound;
