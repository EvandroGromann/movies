const BadRequestException = require('src/domain/exceptions/BadRequestException')
const Exception = require('src/domain/exceptions/Exception')
const { expect } = require('chai')

describe('Exceptions :: BadRequestException', () => {
  describe('validate instance', () => {
    it('returns Business/Error instance', () => {
      const badRequestException = new BadRequestException('error_message')

      expect(badRequestException).to.be.instanceOf(BadRequestException)
      expect(badRequestException).to.be.instanceOf(Exception)
      expect(badRequestException).to.be.instanceOf(Error)
    })
  })

  describe('using string error', () => {
    it('returns badRequestException error', () => {
      const badRequestException = new BadRequestException('error_message')

      expect(badRequestException.error_code).to.be.equals(400)
      expect(badRequestException.error_type).to.be.equals('bad_request')
      expect(badRequestException.message).to.be.equals('error_message')
      expect(badRequestException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error instance', () => {
    it('returns badRequestException error', () => {
      const badRequestException = new BadRequestException(new Error('error_message'))

      expect(badRequestException.error_code).to.be.equals(400)
      expect(badRequestException.error_type).to.be.equals('bad_request')
      expect(badRequestException.message).to.be.equals('error_message')
      expect(badRequestException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error instance with details property', () => {
    it('returns contractException error', () => {
      const error = new Error('error_message')
      error.details = [ { message: 'error_message_1' }, { message: 'error_message_2' } ]
      const contractException = new BadRequestException(error)

      expect(contractException.details).to.be.equals(error.details)
      expect(contractException.error_code).to.be.equals(400)
      expect(contractException.error_type).to.be.equals('bad_request')
      expect(contractException.message).to.be.equals('error_message')
      expect(contractException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error.message as function to build error.message dynamically', () => {
    it('returns contractException error', () => {
      const error = {
        message: () =>
          'custom error message'
      }

      const contractException = new BadRequestException(error)

      expect(contractException.error_code).to.be.equals(400)
      expect(contractException.error_type).to.be.equals('bad_request')
      expect(contractException.message).to.be.equals('custom error message')
      expect(contractException).to.be.haveOwnProperty('stack')
    })
  })
})
