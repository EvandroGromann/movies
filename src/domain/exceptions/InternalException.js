const Exception = require('./Exception')
const HttpResponse = require('./HttpResponse')
const defaultCode = HttpResponse.code.INTERNAL_SERVER_ERROR

module.exports = class InternalException extends Exception {
  constructor (error) {
    super(error, defaultCode)
    this.error_type = HttpResponse.type.INTERNAL_SERVER_ERROR
  }
}
