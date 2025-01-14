const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect, spy } = chai

const DeleteMovieService = require('src/application/services/movie/DeleteMovieService')

describe('App :: Services :: Movie :: DeleteMovieService', () => {
  const makeFakeParams = () => ({
    movie_id: 'any_movie_id'
  })

  const makeSut = () => {
    const movieRepository = {
      delete: () => Promise.resolve({})
    }

    const logger = {
      info: () => {}
    }

    const deleteMovieService = DeleteMovieService({
      movieRepository,
      logger
    })

    return {
      deleteMovieService,
      movieRepository,
      logger
    }
  }

  describe('#execute', () => {
    context('when movie is deleted with success', () => {
      it('should call logger with correct values', async () => {
        const { deleteMovieService, logger } = makeSut()
        const { movie_id } = makeFakeParams()

        spy.on(logger, 'info')

        await deleteMovieService.execute(movie_id)

        expect(logger.info).to.have.been.called.once()
      })

      it('should call movieRepository with correct values', async () => {
        const { deleteMovieService, movieRepository } = makeSut()
        const { movie_id } = makeFakeParams()

        spy.on(movieRepository, 'delete')

        await deleteMovieService.execute(movie_id)

        expect(movieRepository.delete).to.have.been.called.with({ _id: movie_id })
      })
    })
  })
})
