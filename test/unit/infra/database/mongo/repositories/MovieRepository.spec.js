const { expect } = require('chai')

const MovieRepository = require('src/infra/database/mongo/repositories/movie/MovieRepository')

describe('Infra :: Database :: Repository :: Movie :: movieRepository', () => {
  const makeSut = () => {
    const movieMapper = {}

    const movieModel = {
      model: {}
    }

    const logger = {}

    const movieRepository = new MovieRepository({
      movieModel,
      movieMapper,
      logger
    })

    return {
      movieRepository,
      movieMapper,
      movieModel,
      logger
    }
  }

  describe('#constructor', () => {
    context('when movieRepository is instantiated', () => {
      it('should initialize all attributes correctly', () => {
        const { movieRepository, movieModel, movieMapper, logger } = makeSut()

        expect(movieRepository.Model).to.be.deep.equal(movieModel.model)
        expect(movieRepository.mapper).to.be.deep.equal(movieMapper)
        expect(movieRepository.logger).to.be.deep.equal(logger)
      })
    })
  })
})
