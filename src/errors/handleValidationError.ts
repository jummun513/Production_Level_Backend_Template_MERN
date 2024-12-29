import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { TGenericErrorResponse } from '../Interfaces/common';

// mongoose model validation error
export const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorMessage = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: value.path,
      message: value.message,
    })
  );
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Validation Error.',
    errorMessage: errorMessage,
  };
};
