const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect, spy } = chai

const CreateMovieService = require('src/application/services/movie/CreateMovieService')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')

describe('App :: Services :: Movie :: CreateMovieService', () => {
  const makeFakeParams = () => ({
    movie: generateModel()
  })

  const makeSut = () => {
    const movieRepository = {
      create: () => Promise.resolve({})
    }

    const logger = {
      info: () => {}
    }

    const createMovieService = CreateMovieService({
      movieRepository,
      logger
    })

    return {
      createMovieService,
      movieRepository,
      logger
    }
  }

  describe('#execute', () => {
    context('when movie is created with success', () => {
      it('should call logger with correct values', async () => {
        const { createMovieService, logger } = makeSut()
        const { movie } = makeFakeParams()

        spy.on(logger, 'info')

        await createMovieService.execute(movie)

        expect(logger.info).to.have.been.called.once()
      })

      it('should call movieRepository with correct values', async () => {
        const { createMovieService, movieRepository } = makeSut()
        const { movie } = makeFakeParams()

        spy.on(movieRepository, 'create')

        await createMovieService.execute(movie)

        expect(movieRepository.create).to.have.been.called.with(movie)
      })
    })
  })
})
