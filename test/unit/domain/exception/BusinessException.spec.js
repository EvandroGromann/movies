const BusinessException = require('src/domain/exceptions/BusinessException')
const Exception = require('src/domain/exceptions/Exception')
const { expect } = require('chai')

describe('Exceptions :: BusinessException', () => {
  describe('validate instance', () => {
    it('returns Business/Error instance', () => {
      const businessException = new BusinessException('error_message')

      expect(businessException).to.be.instanceOf(BusinessException)
      expect(businessException).to.be.instanceOf(Exception)
      expect(businessException).to.be.instanceOf(Error)
    })
  })

  describe('using string error', () => {
    it('returns businessException error', () => {
      const businessException = new BusinessException('error_message')

      expect(businessException.error_code).to.be.equals(422)
      expect(businessException.error_type).to.be.equals('unprocessable_entity')
      expect(businessException.message).to.be.equals('error_message')
      expect(businessException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error instance', () => {
    it('returns businessException error', () => {
      const businessException = new BusinessException(new Error('error_message'))

      expect(businessException.error_code).to.be.equals(422)
      expect(businessException.error_type).to.be.equals('unprocessable_entity')
      expect(businessException.message).to.be.equals('error_message')
      expect(businessException).to.be.haveOwnProperty('stack')
    })
  })

  describe('using error.message as function to build error.message dynamically', () => {
    it('returns contractException error', () => {
      const error = {
        message: () =>
          'custom error message'
      }

      const contractException = new BusinessException(error)

      expect(contractException.error_code).to.be.equals(422)
      expect(contractException.error_type).to.be.equals('unprocessable_entity')
      expect(contractException.message).to.be.equals('custom error message')
      expect(contractException).to.be.haveOwnProperty('stack')
    })
  })
})
