const ForbiddenException = require('src/domain/exceptions/ForbiddenException')
const Exception = require('src/domain/exceptions/Exception')
const { expect } = require('chai')

describe('Exceptions :: ForbiddenException', () => {
  describe('validate instance', () => {
    it('returns Business/Error instance', () => {
      const forbiddenException = new ForbiddenException('error_message')

      expect(forbiddenException).to.be.instanceOf(ForbiddenException)
      expect(forbiddenException).to.be.instanceOf(Exception)
      expect(forbiddenException).to.be.instanceOf(Error)
    })
  })

  describe('using string error', () => {
    it('returns forbiddenException error', () => {
      const forbiddenException = new ForbiddenException('error_message')

      expect(forbiddenException.error_code).to.be.equals(403)
      expect(forbiddenException.error_type).to.be.equals('forbidden')
      expect(forbiddenException.message).to.be.equals('error_message')
      expect(forbiddenException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error instance', () => {
    it('returns forbiddenException error', () => {
      const forbiddenException = new ForbiddenException(new Error('error_message'))

      expect(forbiddenException.error_code).to.be.equals(403)
      expect(forbiddenException.error_type).to.be.equals('forbidden')
      expect(forbiddenException.message).to.be.equals('error_message')
      expect(forbiddenException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error.message as function to build error.message dynamically', () => {
    it('returns contractException error', () => {
      const error = {
        message: () =>
          'custom error message'
      }

      const contractException = new ForbiddenException(error)

      expect(contractException.error_code).to.be.equals(403)
      expect(contractException.error_type).to.be.equals('forbidden')
      expect(contractException.message).to.be.equals('custom error message')
      expect(contractException).to.be.haveOwnProperty('stack')
    })
  })
})
