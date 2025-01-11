const UnauthorizedException = require('src/domain/exceptions/UnauthorizedException')
const Exception = require('src/domain/exceptions/Exception')
const { expect } = require('chai')

describe('Exceptions :: UnauthorizedException', () => {
  describe('validate instance', () => {
    it('returns Business/Error instance', () => {
      const unauthorizedException = new UnauthorizedException('error_message')

      expect(unauthorizedException).to.be.instanceOf(UnauthorizedException)
      expect(unauthorizedException).to.be.instanceOf(Exception)
      expect(unauthorizedException).to.be.instanceOf(Error)
    })
  })

  describe('using string error', () => {
    it('returns unauthorizedException error', () => {
      const unauthorizedException = new UnauthorizedException('error_message')

      expect(unauthorizedException.error_code).to.be.equals(401)
      expect(unauthorizedException.error_type).to.be.equals('unauthorized')
      expect(unauthorizedException.message).to.be.equals('error_message')
      expect(unauthorizedException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error instance', () => {
    it('returns unauthorizedException error', () => {
      const unauthorizedException = new UnauthorizedException(new Error('error_message'))

      expect(unauthorizedException.error_code).to.be.equals(401)
      expect(unauthorizedException.error_type).to.be.equals('unauthorized')
      expect(unauthorizedException.message).to.be.equals('error_message')
      expect(unauthorizedException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error.message as function to build error.message dynamically', () => {
    it('returns contractException error', () => {
      const error = {
        message: () =>
          'custom error message'
      }

      const contractException = new UnauthorizedException(error)

      expect(contractException.error_code).to.be.equals(401)
      expect(contractException.error_type).to.be.equals('unauthorized')
      expect(contractException.message).to.be.equals('custom error message')
      expect(contractException).to.be.haveOwnProperty('stack')
    })
  })
})
