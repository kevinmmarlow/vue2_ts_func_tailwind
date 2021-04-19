import { Request, Response, NextFunction } from 'express-serve-static-core'
import { validationResult } from 'express-validator'
import { SCError } from '../helpers/errorHandler'

export default (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let errorStr = ''
    errors.array().forEach((errObj) => {
      if (errorStr !== '') {
        errorStr += ', '
      }
      errorStr += `${errObj.msg}. Value '${errObj.value}' in '${errObj.param}'`
    })
    const e = new SCError(422, errorStr)
    next(e)
  } else {
    next()
  }
}
