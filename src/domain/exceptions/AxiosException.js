const Exception = require('./Exception')

module.exports = class AxiosException extends Exception {
  constructor (error) {
    const formatedError = {
      status_code: error.response?.status || error.code,
      error_type: error.response?.statusText || error.message,
      message: error.message,
      details: error.response?.data?.erros || error.response?.data
    }

    super(formatedError, formatedError.status_code)
    this.error_type = formatedError.error_type
    if (formatedError.details) {
      this.details = formatedError.details
    }
  }
}
