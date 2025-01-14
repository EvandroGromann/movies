const { expect, spy } = require('chai')
const EnumMessage = require('src/domain/enums/EnumMessage')
const CreateMovieOperation = require('src/application/operations/movie/CreateMovieOperation')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')

describe('App :: Operations :: Movie :: CreateMovieOperation', () => {
  const makeFakeParams = () => generateModel()

  const makeSut = () => {
    const getMovieService = {
      execute: () => {}
    }

    const createMovieService = {
      execute: () => {}
    }

    const createMovieOperation = new CreateMovieOperation({
      getMovieService,
      createMovieService
    })

    return {
      getMovieService,
      createMovieService,
      createMovieOperation
    }
  }

  describe('#execute', () => {
    context('when movie is created with success', () => {
      it('should call createMovieService with correct values', async () => {
        const { createMovieOperation, getMovieService } = makeSut()
        const movie = makeFakeParams()

        spy.on(getMovieService, 'execute')

        await createMovieOperation.execute(movie)

        expect(getMovieService.execute).to.have.been.called.with({ title: movie.title, year: movie.year })
      })

      it('should call createMovieService with correct values', async () => {
        const { createMovieOperation, createMovieService } = makeSut()
        const movie = makeFakeParams()

        spy.on(createMovieService, 'execute')

        await createMovieOperation.execute(movie)

        expect(createMovieService.execute).to.have.been.called.with(movie)
      })
    })

    context('when movie already exists', () => {
      it('should throw an error', async () => {
        const { createMovieOperation, getMovieService } = makeSut()
        const movie = makeFakeParams()

        spy.on(getMovieService, 'execute', () => true)

        try {
          await createMovieOperation.execute(movie)
        } catch (error) {
          expect(error.message).to.be.equal(EnumMessage.MOVIE_ALREADY_EXISTS)
        }
      })
    })
  })
})
