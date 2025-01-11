const Exception = require('./Exception')
const HttpResponse = require('../constants/HttpResponse')
const defaultCode = HttpResponse.code.UNAUTHORIZED

module.exports = class UnauthorizedException extends Exception {
  constructor (error) {
    super(error, defaultCode)
    this.error_type = HttpResponse.type.UNAUTHORIZED
  }
}
