const configLoader = require('config/configLoader')
const container = require('src/Container')
const { MongoMemoryServer } = require('mongodb-memory-server')

module.exports = class Application {
  constructor () {
    this.container = null
  }

  async load () {
    const mongo = await MongoMemoryServer.create()
    const uri = mongo.getUri()

    const config = await configLoader.loadEnvironment()
    config.mongodb.uri = uri

    this.container = container.configureContainer(config)
    return this
  }

  async start () {
    const { server, providerConnection, movieMigration } = this.container.cradle

    await providerConnection.connect()

    await movieMigration.execute()

    await server.start()
  }
}
