import { ZodError, ZodIssue } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { TGenericErrorResponse } from '../Interfaces/common';

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorMessage = err.issues.map((issue: ZodIssue) => ({
    path: `${issue?.path[issue?.path.length - 1]}`,
    message: issue.message,
  }));

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Validation Error.',
    errorMessage: errorMessage,
  };
};
