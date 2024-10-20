import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { TGenericErrorResponse } from '../Interfaces/common';

export const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorMessage = `${err.value} is not a valid ID!`;
  return {
    statusCode: StatusCodes.NOT_FOUND,
    message: errorMessage,
    errorMessage: [],
  };
};
