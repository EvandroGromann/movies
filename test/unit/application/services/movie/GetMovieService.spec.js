const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect, spy } = chai

const GetMovieService = require('src/application/services/movie/GetMovieService')

describe('App :: Services :: Movie :: GetMovieService', () => {
  const makeFakeParams = () => ({
    movie_id: 'any_movie_id'
  })

  const makeSut = () => {
    const movieRepository = {
      get: () => Promise.resolve({})
    }

    const logger = {
      info: () => {}
    }

    const getMovieService = GetMovieService({
      movieRepository,
      logger
    })

    return {
      getMovieService,
      movieRepository,
      logger
    }
  }

  describe('#execute', () => {
    context('when movie is getd with success', () => {
      it('should call logger with correct values', async () => {
        const { getMovieService, logger } = makeSut()
        const { movie_id } = makeFakeParams()

        spy.on(logger, 'info')

        await getMovieService.execute(movie_id)

        expect(logger.info).to.have.been.called.once()
      })

      it('should call movieRepository with correct values', async () => {
        const { getMovieService, movieRepository } = makeSut()
        const filter = makeFakeParams()

        spy.on(movieRepository, 'get')

        await getMovieService.execute(filter)

        expect(movieRepository.get).to.have.been.called.with(filter)
      })
    })
  })
})
