const { expect, spy } = require('chai')
const MovieController = require('src/interfaces/http/presentations/movie/MovieController')
const HttpResponse = require('src/domain/constants/HttpResponse')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')

describe('Interfaces :: Http :: Presentations :: Movie :: MovieController', () => {
  const makeSut = () => {
    const getMovieOperation = {
      execute: () => {}
    }

    const listMovieOperation = {
      execute: () => {}
    }

    const createMovieOperation = {
      execute: () => {}
    }

    const updateMovieOperation = {
      execute: () => {}
    }

    const deleteMovieOperation = {
      execute: () => {}
    }

    const getAwardsIntervalsOperation = {
      execute: () => {}
    }

    const movieController = MovieController({
      getMovieOperation,
      listMovieOperation,
      createMovieOperation,
      updateMovieOperation,
      deleteMovieOperation,
      getAwardsIntervalsOperation
    })

    return {
      movieController,
      getMovieOperation,
      listMovieOperation,
      createMovieOperation,
      updateMovieOperation,
      deleteMovieOperation,
      getAwardsIntervalsOperation
    }
  }

  describe('#get', () => {
    const makeFakeCtx = () => ({
      params: {
        movie_id: 'any_movie_id'
      },
      res: {
        status: (statusCode) => ({
          json: (data) => ({
            statusCode,
            ...data
          })
        })
      }
    })

    context('when movie is successfully retrieved', () => {
      it('Should call GetMovieOperation with correct values', async () => {
        const ctx = makeFakeCtx()
        const { movieController, getMovieOperation } = makeSut()

        spy.on(getMovieOperation, 'execute')

        const response = await movieController.get(ctx)

        expect(getMovieOperation.execute).to.have.been.called.with(ctx.params.movie_id)
        expect(response).to.be.deep.equal({ statusCode: HttpResponse.code.OK })
      })
    })
  })

  describe('#list', () => {
    const makeFakeCtx = () => ({
      query: { page: 1, limit: 10, sort: 'any_sort', sort_type: 'asc' },
      res: {
        status: (statusCode) => ({
          json: (data) => ({
            statusCode,
            ...data
          })
        })
      }
    })

    context('when movies list is successfully retrieved', () => {
      it('Should call GetMovieOperation with correct values', async () => {
        const ctx = makeFakeCtx()
        const { movieController, listMovieOperation } = makeSut()

        spy.on(listMovieOperation, 'execute')

        const response = await movieController.list(ctx)

        expect(listMovieOperation.execute).to.have.been.called.with()
        expect(response).to.be.deep.equal({ statusCode: HttpResponse.code.OK })
      })
    })
  })

  describe('#create', () => {
    const makeFakeCtx = () => ({
      body: generateModel(),
      res: {
        status: (statusCode) => ({
          json: (data) => ({
            statusCode,
            ...data
          })
        })
      }
    })

    context('when movie is successfully created', () => {
      it('Should call CreateMovieOperation with correct values', async () => {
        const ctx = makeFakeCtx()
        const { movieController, createMovieOperation } = makeSut()

        spy.on(createMovieOperation, 'execute')

        const response = await movieController.create(ctx)

        expect(createMovieOperation.execute).to.have.been.called.with(ctx.body)
        expect(response).to.be.deep.equal({ statusCode: HttpResponse.code.CREATED })
      })
    })
  })

  describe('#update', () => {
    const makeFakeCtx = () => ({
      body: generateModel(),
      params: {
        movie_id: 'any_movie_id'
      },
      res: {
        status: (statusCode) => ({
          json: (data) => ({
            statusCode,
            ...data
          })
        })
      }
    })

    context('when movie is successfully updated', () => {
      it('Should call UpdateMovieOperation with correct values', async () => {
        const ctx = makeFakeCtx()
        const { movieController, updateMovieOperation } = makeSut()

        spy.on(updateMovieOperation, 'execute')

        const response = await movieController.update(ctx)

        expect(updateMovieOperation.execute).to.have.been.called.with(ctx.body)
        expect(response).to.be.deep.equal({ statusCode: HttpResponse.code.OK })
      })
    })
  })

  describe('#delete', () => {
    const makeFakeCtx = () => ({
      params: {
        movie_id: 'any_movie_id'
      },
      res: {
        status: (statusCode) => ({
          send: () => ({
            statusCode
          })
        })
      }
    })

    context('when movie is successfully deleted', () => {
      it('Should call UpdateMovieOperation with correct values', async () => {
        const ctx = makeFakeCtx()
        const { movieController, deleteMovieOperation } = makeSut()

        spy.on(deleteMovieOperation, 'execute')

        const response = await movieController.delete(ctx)

        expect(deleteMovieOperation.execute).to.have.been.called.with(ctx.params.movie_id)
        expect(response).to.be.deep.equal({ statusCode: HttpResponse.code.NO_CONTENT })
      })
    })
  })

  describe('#getAwardsIntervals', () => {
    const makeFakeCtx = () => ({
      res: {
        status: (statusCode) => ({
          json: (data) => ({
            statusCode,
            ...data
          })
        })
      }
    })

    context('when awards intervals is successfully retrieved', () => {
      it('Should call UpdateMovieOperation with correct values', async () => {
        const ctx = makeFakeCtx()
        const { movieController, getAwardsIntervalsOperation } = makeSut()

        spy.on(getAwardsIntervalsOperation, 'execute')

        const response = await movieController.getAwardsIntervals(ctx)

        expect(getAwardsIntervalsOperation.execute).to.have.been.called.with()
        expect(response).to.be.deep.equal({ statusCode: HttpResponse.code.OK })
      })
    })
  })
})
