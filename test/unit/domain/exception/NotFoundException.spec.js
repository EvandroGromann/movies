const NotFoundException = require('src/domain/exceptions/NotFoundException')
const Exception = require('src/domain/exceptions/Exception')
const { expect } = require('chai')

describe('Exceptions :: NotFoundException', () => {
  describe('validate instance', () => {
    it('returns Business/Error instance', () => {
      const notFoundException = new NotFoundException('error_message')

      expect(notFoundException).to.be.instanceOf(NotFoundException)
      expect(notFoundException).to.be.instanceOf(Exception)
      expect(notFoundException).to.be.instanceOf(Error)
    })
  })

  describe('using string error', () => {
    it('returns notFoundException error', () => {
      const notFoundException = new NotFoundException('error_message')

      expect(notFoundException.error_code).to.be.equals(404)
      expect(notFoundException.error_type).to.be.equals('not_found')
      expect(notFoundException.message).to.be.equals('error_message')
      expect(notFoundException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error instance', () => {
    it('returns notFoundException error', () => {
      const notFoundException = new NotFoundException(new Error('error_message'))

      expect(notFoundException.error_code).to.be.equals(404)
      expect(notFoundException.error_type).to.be.equals('not_found')
      expect(notFoundException.message).to.be.equals('error_message')
      expect(notFoundException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error.message as function to build error.message dynamically', () => {
    it('returns contractException error', () => {
      const error = {
        message: () =>
          'custom error message'
      }

      const contractException = new NotFoundException(error)

      expect(contractException.error_code).to.be.equals(404)
      expect(contractException.error_type).to.be.equals('not_found')
      expect(contractException.message).to.be.equals('custom error message')
      expect(contractException).to.be.haveOwnProperty('stack')
    })
  })
})
