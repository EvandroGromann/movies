module.exports = () => ({
  error: (message, error) => {
    console.error(`Error -> ${message}`, error ?? '')
  },
  info: (message, body) => {
    console.log(`${message}`, body ?? '')
  }
})
