const InternalException = require('src/domain/exceptions/InternalException')

module.exports = ({ logger }) => (err, _req, res, _next) => {
  logger.info('Error ->', err)

  const defaultError = new InternalException(err)
  let errorCode = defaultError.error_code
  let response = { ...defaultError, message: defaultError.message }

  if (err.error_code) {
    errorCode = err.error_code
    response = { ...err, message: err.message }
  }

  return res.status(errorCode).json(response)
}
