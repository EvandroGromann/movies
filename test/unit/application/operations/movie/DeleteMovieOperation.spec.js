const { expect, spy } = require('chai')
const EnumMessage = require('src/domain/enums/EnumMessage')
const DeleteMovieOperation = require('src/application/operations/movie/DeleteMovieOperation')

describe('App :: Operations :: Movie :: DeleteMovieOperation', () => {
  const makeFakeParams = () => ({
    movie_id: 'any_movie_id'
  })

  const makeSut = () => {
    const getMovieService = {
      execute: () => true
    }

    const deleteMovieService = {
      execute: () => {}
    }

    const deleteMovieOperation = new DeleteMovieOperation({
      getMovieService,
      deleteMovieService
    })

    return {
      getMovieService,
      deleteMovieService,
      deleteMovieOperation
    }
  }

  describe('#execute', () => {
    context('when movie is deleted with success', () => {
      it('should call deleteMovieService with correct values', async () => {
        const { deleteMovieOperation, getMovieService } = makeSut()
        const { movie_id } = makeFakeParams()

        spy.on(getMovieService, 'execute')

        await deleteMovieOperation.execute(movie_id)

        expect(getMovieService.execute).to.have.been.called.with({ _id: movie_id })
      })

      it('should call deleteMovieService with correct values', async () => {
        const { deleteMovieOperation, deleteMovieService } = makeSut()
        const { movie_id } = makeFakeParams()

        spy.on(deleteMovieService, 'execute')

        await deleteMovieOperation.execute(movie_id)

        expect(deleteMovieService.execute).to.have.been.called.with(movie_id)
      })
    })

    context('when movie not exists', () => {
      it('should throw an error', async () => {
        const { deleteMovieOperation, getMovieService } = makeSut()
        const movie = makeFakeParams()

        spy.on(getMovieService, 'execute', () => false)

        try {
          await deleteMovieOperation.execute(movie)
        } catch (error) {
          expect(error.message).to.be.equal(EnumMessage.MOVIE_NOT_FOUND)
        }
      })
    })
  })
})
