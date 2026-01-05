const AppError = require('./error_codes')
const { StatusCodes } = require('http-status-codes');

class ValidationError extends AppError{
  constructor(error){
    let errorname = error.name;
    let explaination = [];
    error.errors.forEach((err) => {
      explaination.push(err.message);
    });
    super(
      errorname,
      'Not able to validate the data send in the request',
      explaination,
      StatusCodes.BAD_REQUEST
    )
  }
}

module.exports = ValidationError;