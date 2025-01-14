const { expect, spy } = require('chai')
const ListMovieOperation = require('src/application/operations/movie/ListMovieOperation')

describe('App :: Operations :: Movie :: ListMovieOperation', () => {
  const makeFakeParams = () => ({
    filters: {},
    pagination: { page: 1, limit: 10, sort: 'title', sort_type: 'asc' }
  })

  const makeSut = () => {
    const listMovieService = {
      execute: () => true
    }

    const listMovieOperation = new ListMovieOperation({
      listMovieService
    })

    return {
      listMovieService,
      listMovieOperation
    }
  }

  describe('#execute', () => {
    context('when movie is retrieved with success', () => {
      it('should call listMovieService with correct values', async () => {
        const { listMovieOperation, listMovieService } = makeSut()
        const { filters, pagination } = makeFakeParams()

        spy.on(listMovieService, 'execute')

        await listMovieOperation.execute(filters, pagination)

        expect(listMovieService.execute).to.have.been.called.with(filters, pagination)
      })
    })
  })
})
