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
    })
  })
})
