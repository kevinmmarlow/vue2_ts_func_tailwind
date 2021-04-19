import { Request, Response, NextFunction } from 'express-serve-static-core'

/**
 * Helper class for including the status code in any Errors that may arise.
 * SC stands for StatusCode
 */
export class SCError extends Error {
  public statusCode: number

  public constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }

  public toString(): string {
    return `${this.statusCode} - ${this.message}`
  }
}

/**
 * Map common status codes to error types to ensure consistency.
 * @param statusCode
 * @returns the error type for the status code
 */
const _getErrorType = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return 'BAD_REQUEST'
    case 401:
      return 'UNAUTHORIZED ERROR'
    case 403:
      return 'PERMISSION_DENIED'
    case 404:
      return 'NOT_FOUND'
    case 409:
      return 'CONFLICT'
    case 422:
      return 'UNPROCCESSABLE_ENTITY'
    default:
      return 'SERVER_INTERNAL_ERROR'
  }
}

interface ErrorPayload {
  status: string
  error_type: string
  status_code: number
  message: string
}

/**
 * Our SCError handler. Pull out the status code and create a consistent json response.
 * If the error is not our SCError, just pass it down the middleware chain.
 *
 * @returns void, but automatically passes our error payload to the response.
 */
export const errorHandler = (
  err: Error | SCError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    // Delegate default error handler to handle duplicate response
    return next(err)
  }
  const { statusCode, message } = err as SCError
  if (!statusCode) {
    next(err)
  } else {
    const result: ErrorPayload = {
      status: 'error',
      error_type: _getErrorType(statusCode),
      status_code: statusCode,
      message,
    }
    res.status(statusCode).json(result)
  }
}

/**
 * Catch-all error handler. Any errors that are not a SCError will return a 500,
 * but we should still ensure a consisten format.
 *
 * @returns void, but automatically passes our error payload to the response.
 */
export const catchAllErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    // Delegate default error handler to handle duplicate response
    return next(err)
  }
  // Unhandled error should all be status code 500
  const statusCode = 500
  // Log unhandled errors for devs to see.
  console.log(err)
  const { message } = err
  const result: ErrorPayload = {
    status: 'error',
    error_type: _getErrorType(statusCode),
    status_code: statusCode,
    message,
  }
  res.status(statusCode).json(result)
}
