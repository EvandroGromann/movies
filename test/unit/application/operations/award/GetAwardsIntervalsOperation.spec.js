const { expect, spy } = require('chai')
const GetAwardsIntervalsOperation = require('src/application/operations/award/GetAwardsIntervalsOperation')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')

describe('App :: Operations :: Movie :: GetAwardsIntervalsOperation', () => {
  const movies = generateModel(15, { onlyWinners: true })

  const makeSut = () => {
    const findMovieService = {
      execute: () => movies
    }

    const getAwardsIntervalsOperation = new GetAwardsIntervalsOperation({
      findMovieService
    })

    return {
      findMovieService,
      getAwardsIntervalsOperation
    }
  }

  describe('#execute', () => {
    context('when movie is retrieved with success', () => {
      it('should call findMovieService with correct values', async () => {
        const { getAwardsIntervalsOperation, findMovieService } = makeSut()

        spy.on(findMovieService, 'execute')

        const response = await getAwardsIntervalsOperation.execute()

        expect(findMovieService.execute).to.have.been.called.with({ winner: true })
        expect(response).to.be.an('object')
        expect(response).to.have.property('min')
        expect(response).to.have.property('max')
      })
    })
  })
})
