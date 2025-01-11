const Exception = require('./Exception')
const HttpResponse = require('./HttpResponse')
const defaultCode = HttpResponse.code.NOT_FOUND

module.exports = class NotFoundException extends Exception {
  constructor (error) {
    super(error, defaultCode)
    this.error_type = HttpResponse.type.NOT_FOUND
  }
}
