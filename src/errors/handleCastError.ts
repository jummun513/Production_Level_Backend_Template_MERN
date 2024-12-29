import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { TGenericErrorResponse } from '../Interfaces/common';

export const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorMessage = [
    { path: err.path, message: `${err.value} is not a valid ID!` },
  ];
  return {
    statusCode: StatusCodes.NOT_FOUND,
    message: `${err.value} is not a valid ID!`,
    errorMessage: errorMessage,
  };
};
