const { formatError, formatMessage } = require('./ExceptionFormatter')

module.exports = class Exception extends Error {
  constructor (error, defaultCode) {
    const formatedError = formatError(error)
    const message = formatMessage(formatedError)

    super(message)
    this.error_code = defaultCode
  }
}
