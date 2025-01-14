const { expect } = require('chai')
const movieResponseSchema = require('test/helpers/schemas/MovieResponseSchema')
const request = require('test/helpers/request')
const repositories = require('test/helpers/repositories')

describe('API :: GET /api/movies/:movie_id', () => {
  context('200 - Ok', async () => {
    it('Get movie - success', async () => {
      const { movieRepository } = repositories()

      const movie = await movieRepository.get()

      const { body } = await request()
        .get(`/api/movies/${movie.id}`)
        .expect(200)

      const { error } = movieResponseSchema.get.validate(body)

      expect(error).to.be.not.exist()
      expect(body).to.be.exist()
      expect(body).to.be.deep.equal(movie)
    })
  })

  context('404 - Not Found', async () => {
    it('Get movie - when movie not exists', async () => {
      const { body } = await request()
        .get('/api/movies/6785e03435ab08eb5a29b1bf')
        .expect(404)

      expect(body).to.be.exist()
      expect(body.error_type).to.be.equal('not_found')
      expect(body.message).to.be.equal('Movie not found.')
    })
  })
})
