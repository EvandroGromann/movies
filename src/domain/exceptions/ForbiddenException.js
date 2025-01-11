const Exception = require('./Exception')
const HttpResponse = require('../constants/HttpResponse')
const defaultCode = HttpResponse.code.FORBIDDEN

module.exports = class ForbiddenException extends Exception {
  constructor (error) {
    super(error, defaultCode)
    this.error_type = HttpResponse.type.FORBIDDEN
  }
}
