/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import ApiError from '../../errors/ApiError';
import { handleZodError } from '../../errors/handleZodError';
import { handleCastError } from '../../errors/handleCastError';
import { handleValidationError } from '../../errors/handleValidationError';
import { TGenericErrorMessage } from '../../Interfaces/error';
import config from '../../config';
import { handleDuplicateError } from '../../errors/handleDuplicateError';

type TResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  errorMessage: TGenericErrorMessage[];
  errorDetails?: any;
  stack?: string | null;
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  const response: Partial<TResponse> = { success: false };
  response.message = err?.message || 'Something Went Wrong!';
  response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  response.errorMessage = [
    {
      path: req.originalUrl || '',
      message: err?.message || 'Something Went Wrong!',
    },
  ];
  response.errorDetails = err;
  response.stack = err?.stack || null;

  if (err instanceof ZodError) {
    // zod validation error
    const simplifiedError = handleZodError(err);
    response.statusCode = simplifiedError.statusCode;
    response.message = simplifiedError.message;
    response.errorMessage = simplifiedError?.errorMessage;
  } else if (err?.name === 'ValidationError') {
    // mongoose model validation error
    const simplifiedError = handleValidationError(err);
    response.statusCode = simplifiedError.statusCode;
    response.message = simplifiedError?.message;
    response.errorMessage = simplifiedError?.errorMessage;
  } else if (err?.code === 11000) {
    // mongoDb unique key validation error
    const simplifiedError = handleDuplicateError(err);
    response.statusCode = simplifiedError.statusCode;
    response.message = simplifiedError?.message;
    response.errorMessage = simplifiedError?.errorMessage;
  } else if (err?.name === 'CastError') {
    // mongoDb find by Id not found error
    const simplifiedError = handleCastError(err);
    response.statusCode = simplifiedError.statusCode;
    response.message = simplifiedError?.message;
    response.errorMessage = simplifiedError?.errorMessage;
  } else if (err instanceof ApiError) {
    // throw new Error extend as ApiError handle
    response.statusCode = err?.statusCode;
    response.message = 'Api Error or Built-in Error extends version.';
    response.errorMessage = err?.message
      ? [{ path: req.originalUrl, message: err?.message }]
      : [];
  }

  res.status(response.statusCode!).json({
    ...response,
    errorDetails: config.node_env === 'development' ? err : null,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
  return;
};

export default globalErrorHandler;
