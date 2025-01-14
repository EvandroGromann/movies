const chai = require('chai')
chai.use(require('chai-as-promised'))
const { expect, spy } = chai

const ListMovieService = require('src/application/services/movie/ListMovieService')

describe('App :: Services :: Movie :: ListMovieService', () => {
  const makeFakeParams = () => ({
    filter: {},
    pagination: { page: 1, limit: 10 }
  })

  const makeSut = () => {
    const movieRepository = {
      findPaginated: () => Promise.resolve({})
    }

    const logger = {
      info: () => {}
    }

    const listMovieService = ListMovieService({
      movieRepository,
      logger
    })

    return {
      listMovieService,
      movieRepository,
      logger
    }
  }

  describe('#execute', () => {
    context('when movie is listed with success', () => {
      it('should call logger with correct values', async () => {
        const { listMovieService, logger } = makeSut()
        const { filter, pagination } = makeFakeParams()

        spy.on(logger, 'info')

        await listMovieService.execute(filter, pagination)

        expect(logger.info).to.have.been.called.once()
      })

      it('should call movieRepository with correct values', async () => {
        const { listMovieService, movieRepository } = makeSut()
        const { filter, pagination } = makeFakeParams()

        spy.on(movieRepository, 'findPaginated')

        await listMovieService.execute(filter, pagination)

        expect(movieRepository.findPaginated).to.have.been.called.with(filter, pagination)
      })
    })
  })
})
