const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect, spy } = chai

const UpdateMovieService = require('src/application/services/movie/UpdateMovieService')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')

describe('App :: Services :: Movie :: UpdateMovieService', () => {
  const makeFakeParams = () => ({
    movie: generateModel(),
    movie_id: 'any_movie_id'
  })

  const makeSut = () => {
    const movieRepository = {
      update: () => Promise.resolve({})
    }

    const logger = {
      info: () => {}
    }

    const updateMovieService = UpdateMovieService({
      movieRepository,
      logger
    })

    return {
      updateMovieService,
      movieRepository,
      logger
    }
  }

  describe('#execute', () => {
    context('when movie is updated with success', () => {
      it('should call logger with correct values', async () => {
        const { updateMovieService, logger } = makeSut()
        const { movie, movie_id } = makeFakeParams()

        spy.on(logger, 'info')

        await updateMovieService.execute(movie_id, movie)

        expect(logger.info).to.have.been.called.once()
      })

      it('should call movieRepository with correct values', async () => {
        const { updateMovieService, movieRepository } = makeSut()
        const { movie, movie_id } = makeFakeParams()

        spy.on(movieRepository, 'update')

        await updateMovieService.execute(movie_id, movie)

        expect(movieRepository.update).to.have.been.called.with({ _id: movie_id }, movie)
      })
    })
  })
})
