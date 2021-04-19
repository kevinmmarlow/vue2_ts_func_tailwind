import { Express } from 'express-serve-static-core'
import loadExpress from './express'

/**
 * Used to load all the various components
 * needed at server start.
 *
 * @param {Express App Instance} expressApp
 */
export default (app: Express, baseUrl: string): void => {
  // TODO: Add ORM Loading, Bug/Crash tracking, etc here
  // Load Express App
  loadExpress(app, baseUrl)
}
