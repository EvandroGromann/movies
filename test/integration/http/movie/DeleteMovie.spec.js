const { expect } = require('chai')
const request = require('test/helpers/request')
const repositories = require('test/helpers/repositories')

describe('API :: DELETE /api/movies/:movie_id', () => {
  context('204 - No Content', async () => {
    it('Delete movie - with all fields on the body', async () => {
      const { movieRepository } = repositories()

      const movie = await movieRepository.get()

      const { body } = await request()
        .delete(`/api/movies/${movie.id}`)
        .expect(204)

      const movieAfter = await movieRepository.get({ _id: movie.id })

      expect(body).to.be.empty()
      expect(movieAfter).to.be.not.exist()
    })
  })

  context('404 - Not Found', async () => {
    it('Delete movie - without title on the body', async () => {
      const { body } = await request()
        .delete('/api/movies/6785e03435ab08eb5a29b1bf')
        .expect(404)

      expect(body).to.be.exist()
      expect(body.error_type).to.be.equal('not_found')
      expect(body.message).to.be.equal('Movie not found.')
    })
  })
})
