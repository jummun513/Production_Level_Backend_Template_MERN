/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { TGenericErrorResponse } from '../Interfaces/common';

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorMessage = [
    {
      path: `${Object.keys(err.keyValue)[0]}`,
      message: `${Object.values(err.keyValue)[0]} is a duplicate value.`,
    },
  ];
  return {
    statusCode: StatusCodes.CONFLICT,
    message: 'Duplicate Entry',
    errorMessage: errorMessage,
  };
};
