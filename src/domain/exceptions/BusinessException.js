const Exception = require('./Exception')
const HttpResponse = require('./HttpResponse')
const defaultCode = HttpResponse.code.UNPROCESSABLE_ENTITY

module.exports = class BusinessException extends Exception {
  constructor (error) {
    super(error, defaultCode)
    this.error_type = HttpResponse.type.UNPROCESSABLE_ENTITY
  }
}
