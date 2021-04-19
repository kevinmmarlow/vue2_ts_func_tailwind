import { Express } from 'express-serve-static-core'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from '../routes'
import { errorHandler, catchAllErrorHandler } from '../helpers/errorHandler'

export default (app: Express, baseUrl: string): void => {
  // TODO: Add other request handlers here. Usually add crash/bug tracking before others

  // The common middleware for CORS, security, and json handling
  app.use(helmet())
  app.use(cors())
  app.use(express.json())

  // Server Setup - path must route to lambda
  app.use(baseUrl, router())

  // error handling
  app.use(errorHandler)

  // TODO: Add third-party error handlers

  // Lastly, catch anything that remains
  app.use(catchAllErrorHandler)
}
