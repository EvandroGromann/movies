const Application = require('src/application/Application')
const application = new Application()

application.load()
  .then(() => application.start())
  .catch((error) => {
    console.error(error.stack)
    process.exit(1)
  })
