import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { TGenericErrorResponse } from '../Interfaces/common';

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorMessage = Object.values(err.errors)
    .map(
      (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>
        `${value?.path} is required`
    )
    .join('. ');
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: errorMessage,
    errorMessage: [],
  };
};
