const { expect } = require('chai')
const enumMessage = require('src/domain/enums/EnumMessage')

describe('Domain :: Enums :: EnumMessage', () => {
  describe('#enumMessage', () => {
    context('#values() method', () => {
      it('should return the enum values', () => {
        const values = enumMessage.values()

        expect(values).to.have.deep.members([
          'Movie not found.',
          'Movie already exists.'
        ])
      })
    })

    context('#keys() method', () => {
      it('should return the enum keys', () => {
        const keys = enumMessage.keys()

        expect(keys).to.have.members([
          'MOVIE_NOT_FOUND',
          'MOVIE_ALREADY_EXISTS'
        ])
      })
    })
  })
})
