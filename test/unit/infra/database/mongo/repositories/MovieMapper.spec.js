const { expect } = require('chai')

const MovieMapper = require('src/infra/database/mongo/repositories/movie/MovieMapper')

describe('Infra :: Database :: Repositories :: Movie :: MovieMapper', () => {
  const makeFakeParams = () => ({
    movie: {
      _id: 'any_movie_id',
      unmapped_field: 'any_value',
      title: 'any_title',
      year: 2020,
      studios: [ 'any_studio' ],
      producers: [ 'any_producer' ],
      winner: false
    }
  })

  describe('#toEntity', () => {
    context('when discard some fields', () => {
      it('should return a entity with mapped fields', () => {
        const { movie } = makeFakeParams()

        const entity = MovieMapper().toEntity(movie)

        expect(entity).to.not.haveOwnProperty('_id')
        expect(entity).to.not.haveOwnProperty('unmapped_field')
        expect(entity).to.haveOwnProperty('id')
        expect(entity).to.haveOwnProperty('title')
        expect(entity).to.haveOwnProperty('year')
        expect(entity).to.haveOwnProperty('producers')
        expect(entity).to.haveOwnProperty('studios')
        expect(entity).to.haveOwnProperty('winner')
      })

      it('should return immutable values', () => {
        const { movie } = makeFakeParams()

        const entity = MovieMapper().toEntity(movie)

        for (const key in entity) {
          if (key === 'id') {
            expect(entity.id).to.be.equal(movie._id)
            continue
          }

          expect(entity[key]).to.be.equal(movie[key])
        }
      })
    })

    context('when fields are missing', () => {
      it('should return missing fields as undefined', () => {
        const entity = MovieMapper().toEntity({})

        for (const key in entity) {
          expect(entity[key]).to.be.undefined()
        }
      })
    })
  })
})
