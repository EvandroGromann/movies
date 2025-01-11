const { Router } = require('express')

module.exports = ({ validatorMiddleware }) => ({
  register: (routes) => {
    const router = Router()

    routes.forEach((route) => {
      const { method, path, middlewares = [], validation, handler } = route
      const validateContract = validatorMiddleware.validateContract(validation)
      router[method](path, ...middlewares, validateContract, handler)
    })
    return router
  }
})
