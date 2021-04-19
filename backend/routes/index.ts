import { Router } from 'express'

export default (): Router => {
  const router = Router()

  // health check endpoint
  router.get('/status', (req, res) => {
    res.status(200).end()
  })

  // env check endpoint
  router.get('/env', (req, res) => {
    res.status(200).json({ env: process.env.NODE_ENV })
  })

  // TODO: Import routes based on model or function name and connect to the express middleware

  return router
}
