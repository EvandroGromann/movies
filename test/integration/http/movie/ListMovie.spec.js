const { expect } = require('chai')
const movieResponseSchema = require('test/helpers/schemas/MovieResponseSchema')
const request = require('test/helpers/request')

describe('API :: LIST /api/movies/:movie_id', () => {
  context('200 - Ok', async () => {
    it('List movie - success', async () => {
      const { body } = await request()
        .get('/api/movies')
        .expect(200)

      const { error } = movieResponseSchema.list.validate(body)

      expect(error).to.be.not.exist()
      expect(body).to.be.exist()
    })
  })
})
