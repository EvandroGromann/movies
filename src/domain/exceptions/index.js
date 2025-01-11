const badRequestException = require('./BadRequestException')
const forbiddenException = require('./src/ForbiddenException')
const integrationException = require('./src/IntegrationException')
const internalException = require('./src/InternalException')
const notFoundException = require('./src/NotFoundException')
const unauthorizedException = require('./src/UnauthorizedException')

module.exports = {
  badRequestException,
  forbiddenException,
  integrationException,
  internalException,
  notFoundException,
  unauthorizedException
}
