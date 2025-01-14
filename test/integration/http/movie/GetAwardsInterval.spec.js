const { expect } = require('chai')
const movieResponseSchema = require('test/helpers/schemas/MovieResponseSchema')
const request = require('test/helpers/request')

describe('API :: GET /api/awards/intervals', () => {
  context('200 - Ok', async () => {
    it('Get awards intervals - success', async () => {
      const { body } = await request()
        .get('/api/awards/interval')
        .expect(200)

      const { error } = movieResponseSchema.getAwardsIntervals.validate(body)

      expect(error).to.be.not.exist()
      expect(body).to.be.exist()
      expect(body.min[0].producer).to.be.equal('Joel Silver')
      expect(body.min[0].interval).to.be.equal(1)
      expect(body.min[0].previousWin).to.be.equal(1990)
      expect(body.min[0].followingWin).to.be.equal(1991)
      expect(body.max[0].producer).to.be.equal('Matthew Vaughn')
      expect(body.max[0].interval).to.be.equal(13)
      expect(body.max[0].previousWin).to.be.equal(2002)
      expect(body.max[0].followingWin).to.be.equal(2015)
    })
  })
})
