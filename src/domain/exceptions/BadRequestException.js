const Exception = require('./Exception')
const HttpResponse = require('./HttpResponse')
const defaultCode = HttpResponse.code.BAD_REQUEST

module.exports = class BadRequestException extends Exception {
  constructor (error) {
    super(error, defaultCode)
    this.error_type = HttpResponse.type.BAD_REQUEST
    if (error.details) {
      this.details = error.details
    }
  }
}
