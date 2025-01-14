const { expect } = require('chai')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')
const movieResponseSchema = require('test/helpers/schemas/MovieResponseSchema')
const request = require('test/helpers/request')
const repositories = require('test/helpers/repositories')

const makeSut = () => ({
  payload: generateModel()
})

describe('API :: POST /api/movies', () => {
  context('201 - Created', async () => {
    it('Create movie - with all fields on the body', async () => {
      const { payload } = makeSut()

      const { body } = await request()
        .post('/api/movies')
        .send(payload)
        .expect(201)

      const { error } = movieResponseSchema.create.validate(body)

      const { movieRepository } = repositories()

      const movie = await movieRepository.get({ _id: body.id })

      expect(error).to.be.not.exist()
      expect(movie).to.be.exist()
      expect(movie).to.be.deep.equal(body)
    })
  })

  context('400 - Bad Request', async () => {
    it('Create movie - without title on the body', async () => {
      const { payload } = makeSut()

      delete payload.title

      const { body } = await request()
        .post('/api/movies')
        .send(payload)
        .expect(400)

      expect(body).to.be.exist()
      expect(body.message).to.be.equal('Bad Request')
      expect(body.details[0].message).to.be.equal('"title" is required')
    })
  })
})
