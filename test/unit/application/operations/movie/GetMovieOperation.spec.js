const { expect, spy } = require('chai')
const EnumMessage = require('src/domain/enums/EnumMessage')
const GetMovieOperation = require('src/application/operations/movie/GetMovieOperation')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')

describe('App :: Operations :: Movie :: GetMovieOperation', () => {
  const makeFakeParams = () => ({
    movie_id: 'any_movie_id',
    movie: generateModel()
  })

  const makeSut = () => {
    const getMovieService = {
      execute: () => true
    }

    const getMovieOperation = new GetMovieOperation({
      getMovieService
    })

    return {
      getMovieService,
      getMovieOperation
    }
  }

  describe('#execute', () => {
    context('when movie is retrieved with success', () => {
      it('should call getMovieService with correct values', async () => {
        const { getMovieOperation, getMovieService } = makeSut()
        const { movie_id, movie } = makeFakeParams()

        spy.on(getMovieService, 'execute')

        await getMovieOperation.execute(movie_id, movie)

        expect(getMovieService.execute).to.have.been.called.with({ _id: movie_id })
      })
    })

    context('when movie not exists', () => {
      it('should throw an error', async () => {
        const { getMovieOperation, getMovieService } = makeSut()
        const movie = makeFakeParams()

        spy.on(getMovieService, 'execute', () => false)

        try {
          await getMovieOperation.execute(movie)
        } catch (error) {
          expect(error.message).to.be.equal(EnumMessage.MOVIE_NOT_FOUND)
        }
      })
    })
  })
})
