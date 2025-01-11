const InternalException = require('src/domain/exceptions/InternalException')

module.exports = ({ logger }) => (err, _req, res, _next) => {
  logger.info('Error ->', err)

  const defaultError = new InternalException(err)
  let statusCode = defaultError.status_code
  let response = { ...defaultError, message: defaultError.message }

  if (err.status_code) {
    statusCode = err.status_code
    response = { ...err, message: err.message }
  }

  res.status(statusCode).json(response)
}
