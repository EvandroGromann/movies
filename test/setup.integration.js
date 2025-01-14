require('./setup.unit')

const Application = require('src/application/Application')
const request = require('./helpers/request')
const repositories = require('./helpers/repositories')

before(async () => {
  const application = new Application()
  const app = await application.load()
  await application.start()

  const { server } = application.container.cradle

  repositories(app.container.cradle)
  request(server)
})
