const express = require('express')
const cors = require('cors')
const compression = require('compression')
const methodOverride = require('method-override')
const health = require('@cloudnative/health-connect')
const { Router } = express

module.exports = (ctx) => {
  const router = Router()

  const routes = Object.keys(ctx)
    .filter((key) => key.includes('Routes') && Array.isArray(ctx[key]))
    .flatMap((key) => ctx[key])

  const healthcheck = new health.HealthChecker()

  router
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors())
    .use(compression())
    .use('/health', health.HealthEndpoint(healthcheck))
    .use('/api', ctx.routerFactory.register(routes))
    .use(ctx.httpErrorMiddleware)

  return router
}
