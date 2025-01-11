const configLoader = require('config/configLoader')
const container = require('src/Container')
const { MongoMemoryServer } = require('mongodb-memory-server')

module.exports = class Application {
  constructor () {
    this.container = null
  }

  async load () {
    const config = await configLoader.loadEnvironment()
    this.container = container.configureContainer(config)
    return this
  }

  async start () {
    const { server, providerConnection } = this.container.cradle

    const mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()

    await providerConnection.connect(uri)

    await server.start()
  }
}
