const { createContainer, asClass, asFunction, asValue, InjectionMode, Lifetime } = require('awilix')

const { ProviderConnection } = require('libs/mongodb')
const Server = require('src/interfaces/http/Server')
const Router = require('src/interfaces/http/Router')
const Logger = require('src/infra/logging/Logger')

const container = createContainer()

const configureContainer = (config) => {
  container.register({
    config: asValue(config),
    server: asClass(Server).singleton(),
    router: asFunction(Router),
    logger: asFunction(Logger).singleton(),
    providerConnection: asClass(ProviderConnection).singleton(),
    container: asValue(container)
  }).loadModules([
    'src/interfaces/http/middlewares/**/*.js',
    'src/interfaces/http/presentations/**/*.js',
    'src/application/operations/**/*.js',
    'src/application/services/**/*.js',
    'src/infra/migrations/*.js',
    [
      'src/infra/database/mongo/models/**/*.js',
      {
        lifetime: Lifetime.SINGLETON
      }
    ],
    'src/infra/database/mongo/repositories/**/*.js',
    'src/infra/logging/**/*.js'
  ], {
    formatName: 'camelCase',
    resolverOptions: {
      injectionMode: InjectionMode.PROXY
    }
  })

  return container
}

module.exports = { configureContainer, container }
