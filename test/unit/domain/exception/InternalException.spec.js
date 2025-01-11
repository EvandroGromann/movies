const InternalException = require('src/domain/exceptions/InternalException')
const Exception = require('src/domain/exceptions/Exception')
const { expect } = require('chai')

describe('Exceptions :: InternalException', () => {
  describe('validate instance', () => {
    it('returns Business/Error instance', () => {
      const internalException = new InternalException('error_message')

      expect(internalException).to.be.instanceOf(InternalException)
      expect(internalException).to.be.instanceOf(Exception)
      expect(internalException).to.be.instanceOf(Error)
    })
  })

  describe('using string error', () => {
    it('returns internalException error', () => {
      const internalException = new InternalException('error_message')

      expect(internalException.error_code).to.be.equals(500)
      expect(internalException.error_type).to.be.equals('internal_server_error')
      expect(internalException.message).to.be.equals('error_message')
      expect(internalException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error instance', () => {
    it('returns internalException error', () => {
      const internalException = new InternalException(new Error('error_message'))

      expect(internalException.error_code).to.be.equals(500)
      expect(internalException.error_type).to.be.equals('internal_server_error')
      expect(internalException.message).to.be.equals('error_message')
      expect(internalException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error.message as function to build error.message dynamically', () => {
    it('returns contractException error', () => {
      const error = {
        message: () =>
          'custom error message'
      }

      const contractException = new InternalException(error)

      expect(contractException.error_code).to.be.equals(500)
      expect(contractException.error_type).to.be.equals('internal_server_error')
      expect(contractException.message).to.be.equals('custom error message')
      expect(contractException).to.be.haveOwnProperty('stack')
    })
  })
})
