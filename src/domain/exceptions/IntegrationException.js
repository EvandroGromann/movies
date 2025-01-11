const Exception = require('./Exception')
const HttpResponse = require('../constants/HttpResponse')
const defaultCode = HttpResponse.code.SERVICE_UNAVAILABLE

module.exports = class IntegrationException extends Exception {
  constructor (error) {
    super(error, defaultCode)
    this.error_type = HttpResponse.type.SERVICE_UNAVAILABLE
  }
}
