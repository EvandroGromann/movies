module.exports = ({
  formatError: (error) => (typeof error === 'string' ? { message: error } : error),
  formatMessage: (error) => (typeof error.message === 'function' ? error.message() : error.message)
})
