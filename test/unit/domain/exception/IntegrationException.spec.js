const IntegrationException = require('src/domain/exceptions/IntegrationException')
const Exception = require('src/domain/exceptions/Exception')
const { expect } = require('chai')

describe('Exceptions :: IntegrationException', () => {
  describe('validate instance', () => {
    it('returns Business/Error instance', () => {
      const integrationException = new IntegrationException('error_message')

      expect(integrationException).to.be.instanceOf(IntegrationException)
      expect(integrationException).to.be.instanceOf(Exception)
      expect(integrationException).to.be.instanceOf(Error)
    })
  })

  describe('using string error', () => {
    it('returns integrationException error', () => {
      const integrationException = new IntegrationException('error_message')

      expect(integrationException.error_code).to.be.equals(503)
      expect(integrationException.error_type).to.be.equals('service_unavailable')
      expect(integrationException.message).to.be.equals('error_message')
      expect(integrationException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error instance', () => {
    it('returns integrationException error', () => {
      const integrationException = new IntegrationException(new Error('error_message'))

      expect(integrationException.error_code).to.be.equals(503)
      expect(integrationException.error_type).to.be.equals('service_unavailable')
      expect(integrationException.message).to.be.equals('error_message')
      expect(integrationException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error.message as function to build error.message dynamically', () => {
    it('returns contractException error', () => {
      const error = {
        message: () =>
          'custom error message'
      }

      const contractException = new IntegrationException(error)

      expect(contractException.error_code).to.be.equals(503)
      expect(contractException.error_type).to.be.equals('service_unavailable')
      expect(contractException.message).to.be.equals('custom error message')
      expect(contractException).to.be.haveOwnProperty('stack')
    })
  })
})
