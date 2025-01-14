const { expect, spy } = require('chai')
const EnumMessage = require('src/domain/enums/EnumMessage')
const UpdateMovieOperation = require('src/application/operations/movie/UpdateMovieOperation')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')

describe('App :: Operations :: Movie :: UpdateMovieOperation', () => {
  const makeFakeParams = () => ({
    movie_id: 'any_movie_id',
    movie: generateModel()
  })

  const makeSut = () => {
    const getMovieService = {
      execute: () => true
    }

    const updateMovieService = {
      execute: () => {}
    }

    const updateMovieOperation = new UpdateMovieOperation({
      getMovieService,
      updateMovieService
    })

    return {
      getMovieService,
      updateMovieService,
      updateMovieOperation
    }
  }

  describe('#execute', () => {
    context('when movie is updated with success', () => {
      it('should call updateMovieService with correct values', async () => {
        const { updateMovieOperation, getMovieService } = makeSut()
        const { movie_id, movie } = makeFakeParams()

        spy.on(getMovieService, 'execute')

        await updateMovieOperation.execute(movie_id, movie)

        expect(getMovieService.execute).to.have.been.called.with({ _id: movie_id })
      })

      it('should call updateMovieService with correct values', async () => {
        const { updateMovieOperation, updateMovieService } = makeSut()
        const { movie_id, movie } = makeFakeParams()

        spy.on(updateMovieService, 'execute')

        await updateMovieOperation.execute(movie_id, movie)

        expect(updateMovieService.execute).to.have.been.called.with(movie_id, movie)
      })
    })

    context('when movie not exists', () => {
      it('should throw an error', async () => {
        const { updateMovieOperation, getMovieService } = makeSut()
        const movie = makeFakeParams()

        spy.on(getMovieService, 'execute', () => false)

        try {
          await updateMovieOperation.execute(movie)
        } catch (error) {
          expect(error.message).to.be.equal(EnumMessage.MOVIE_NOT_FOUND)
        }
      })
    })
  })
})
