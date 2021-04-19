import { Express } from 'express-serve-static-core'
import express from 'express'
import serverless from 'serverless-http'
import loaders from './loaders'

/**
 * The main function for starting our server.
 * This version is slightly modified to support the serverless bridge to Netlify (AWS) Lambda functions.
 *
 * When appropriate scale is reached, all of the code in the backend folder can be ported to a dedicated NodeJS backend with almost no trouble.
 *
 * @returns The Express App instance.
 */
const createApp = function startServer(): Express {
  const app = express()

  // Load and inject the various components of our server
  loaders(app, '/.netlify/functions/api-server')

  return app
}

// Bridge to Netlify Lambda
const app = createApp
module.exports = app
module.exports.handler = serverless(app)
