const { expect, spy } = require('chai')

const HttpErrorMiddleware = require('src/interfaces/http/middlewares/HttpErrorMiddleware')
const InternalException = require('src/domain/exceptions/InternalException')

const makeFakeParams = () => ({
  error: { error_code: 400, message: 'any_message' },
  res: {
    status: (statusCode) => ({
      json: (data) => ({
        statusCode,
        ...data
      })
    })
  }
})

const makeSut = () => {
  const logger = {
    info: () => {}
  }
  const httpErrorMiddleware = HttpErrorMiddleware({ logger })

  return {
    httpErrorMiddleware,
    logger
  }
}

describe('Interfaces :: Http :: Middlewares :: HttpErrorMiddleware', () => {
  describe('#HttpErrorMiddleware', () => {
    it('when middleware is call with stack error', () => {
      const { error, res } = makeFakeParams()
      const { httpErrorMiddleware, logger } = makeSut()

      spy.on(logger, 'info')

      httpErrorMiddleware(error, {}, res, {})

      expect(logger.info).to.have.been.called.with(error)
    })

    it('when middleware is call without stack error', () => {
      const error = new InternalException({})
      const { res } = makeFakeParams()
      const { httpErrorMiddleware, logger } = makeSut()

      spy.on(logger, 'info')

      const response = httpErrorMiddleware({}, {}, res, {})

      expect(logger.info).to.have.been.called.once()
      expect(response.error_code).to.be.equal(error.error_code)
    })
  })
})
