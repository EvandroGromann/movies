const { expect, spy } = require('chai')

const Logger = require('src/infra/logging/Logger')

describe('Infra :: Logging :: Logger', () => {
  beforeEach(() => { spy.restore() })
  describe('#constructor', () => {
    context('when create with success', () => {
      it('should return the logger instance', () => {
        const result = Logger()

        expect(result).to.be.an('object')
      })
    })
  })

  describe('#error', () => {
    context('when called with success', () => {
      it('when is called with only message', () => {
        const logger = Logger()

        const consoleErrorSpy = spy.on(console, 'error')

        logger.error('any_message')
        expect(consoleErrorSpy).to.have.been.called.with('Error -> any_message')
      })

      it('when is called with message and error', () => {
        const logger = Logger()

        const consoleErrorSpy = spy.on(console, 'error')

        logger.error('any_message', { error: 'any_error' })

        expect(consoleErrorSpy).to.have.been.called.with('Error -> any_message', { error: 'any_error' })
      })
    })
  })

  describe('#info', () => {
    context('when called with success', () => {
      it('when is called with only message', () => {
        const logger = Logger()

        const consoleLogSpy = spy.on(console, 'log')

        logger.info('any_message')
        expect(consoleLogSpy).to.have.been.called.with('any_message')
      })

      it('when is called with message and body', () => {
        const logger = Logger()

        const consoleLogSpy = spy.on(console, 'log')

        logger.info('any_message', { teste: 'any_teste' })

        expect(consoleLogSpy).to.have.been.called.with('any_message', { teste: 'any_teste' })
      })
    })
  })
})
