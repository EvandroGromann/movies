const { expect, spy } = require('chai')
const joi = require('joi')

const ValidatorMiddleware = require('src/interfaces/http/middlewares/ValidatorMiddleware')

const HttpResponse = require('src/domain/constants/HttpResponse')

const makeFakeParams = () => ({
  next: () => {},
  req: {
    headers: { header: 'any_header' },
    params: { param_id: 'any_param_id' },
    body: {
      body_id: 'any_body_id'
    }
  },
  invalidPayload: {
    headers: { header: 1 },
    params: { param_id: null },
    body: {
      body_id: undefined
    }
  },
  schema: {
    headers: joi.object().keys({
      header: joi.string().required()
    }),
    params: joi.object().keys({
      param_id: joi.string().required()
    }),
    body: joi.object().keys({
      body_id: joi.string().required()
    })
  }
})

const makeSut = () => {
  const validatorMiddleware = ValidatorMiddleware()

  return {
    validatorMiddleware
  }
}

describe('Interfaces :: Http :: Middlewares :: ValidatorMiddleware', () => {
  describe('#ValidatorMiddleware', () => {
    it('when middleware is call with correct values', () => {
      const params = makeFakeParams()
      const { validatorMiddleware } = makeSut()

      spy.on(params, 'next')
      validatorMiddleware.validateContract(params.schema)(params.req, {}, params.next)

      expect(params.next).to.have.been.called.with()
    })

    it('when middleware is call with error', () => {
      const params = makeFakeParams()
      const { validatorMiddleware } = makeSut()

      spy.on(params, 'next')

      try {
        validatorMiddleware.validateContract(params.schema)(params.invalidPayload, {}, params.next)
      } catch (error) {
        expect(error.error_code).to.be.equal(HttpResponse.code.BAD_REQUEST)
        expect(params.next).to.have.been.called.with(error)
      }
    })
  })
})
