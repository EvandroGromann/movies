const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect, spy } = chai

const FindMovieService = require('src/application/services/movie/FindMovieService')

describe('App :: Services :: Movie :: FindMovieService', () => {
  const makeFakeParams = () => ({
    movie_id: 'any_movie_id'
  })

  const makeSut = () => {
    const movieRepository = {
      getAll: () => Promise.resolve({})
    }

    const logger = {
      info: () => {}
    }

    const findMovieService = FindMovieService({
      movieRepository,
      logger
    })

    return {
      findMovieService,
      movieRepository,
      logger
    }
  }

  describe('#execute', () => {
    context('when movie is fund with success', () => {
      it('should call logger with correct values', async () => {
        const { findMovieService, logger } = makeSut()
        const { movie_id } = makeFakeParams()

        spy.on(logger, 'info')

        await findMovieService.execute(movie_id)

        expect(logger.info).to.have.been.called.once()
      })

      it('should call movieRepository with correct values', async () => {
        const { findMovieService, movieRepository } = makeSut()
        const filter = makeFakeParams()

        spy.on(movieRepository, 'getAll')

        await findMovieService.execute(filter)

        expect(movieRepository.getAll).to.have.been.called.with(filter)
      })
    })
  })
})
