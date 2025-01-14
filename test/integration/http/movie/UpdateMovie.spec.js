const { expect } = require('chai')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')
const movieResponseSchema = require('test/helpers/schemas/MovieResponseSchema')
const request = require('test/helpers/request')
const repositories = require('test/helpers/repositories')

const makeSut = () => ({
  payload: generateModel()
})

describe('API :: PUT /api/movies/:movie_id', () => {
  context('200 - OK', async () => {
    it('Update movie - with all fields on the body', async () => {
      const { payload } = makeSut()
      const { movieRepository } = repositories()

      const movieBefore = await movieRepository.create(payload)

      payload.title = 'New title'

      const { body } = await request()
        .put(`/api/movies/${movieBefore.id}`)
        .send(payload)
        .expect(200)

      const { error } = movieResponseSchema.update.validate(body)

      const movieAfter = await movieRepository.get({ _id: body.id })

      expect(error).to.be.not.exist()
      expect(movieAfter).to.be.exist()
      expect(movieAfter.title).to.be.equal(payload.title)
    })
  })

  context('400 - Bad Request', async () => {
    it('Update movie - without title on the body', async () => {
      const { payload } = makeSut()
      const { movieRepository } = repositories()

      const movie = await movieRepository.create(payload)

      payload.year = 'wrong_year'

      const { body } = await request()
        .put(`/api/movies/${movie.id}`)
        .send(payload)
        .expect(400)

      expect(body).to.be.exist()
      expect(body.message).to.be.equal('Bad Request')
      expect(body.details[0].message).to.be.equal('"year" must be a number')
    })
  })

  context('404 - Not Found', async () => {
    it('Update movie - without title on the body', async () => {
      const { payload } = makeSut()

      const { body } = await request()
        .put('/api/movies/6785e03435ab08eb5a29b1bf')
        .send(payload)
        .expect(404)

      console.log(body)

      expect(body).to.be.exist()
      expect(body.error_type).to.be.equal('not_found')
      expect(body.message).to.be.equal('Movie not found.')
    })
  })
})
