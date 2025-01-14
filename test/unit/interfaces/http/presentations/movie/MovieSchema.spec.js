const { expect } = require('chai')
const MovieSchema = require('src/interfaces/http/presentations/movie/MovieSchema')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')

const makeSut = () => {
  const movieSchema = MovieSchema()

  return {
    movieSchema,
    params: { movie_id: 'any_movie_id' },
    query: { page: 1, limit: 10, sort: 'created_at', sort_type: 'desc' },
    body: generateModel()
  }
}

describe('interfaces :: http :: presentation :: movie :: MovieSchema', () => {
  describe('#getMovieSchema', () => {
    context('success', () => {
      it('Should be successfully called', () => {
        const { movieSchema, params } = makeSut()

        const result = movieSchema.getMovieSchema.params.validate(params)

        expect(result.error).to.be.undefined()
      })
    })

    context('failure', () => {
      it('Should be called and return an error', () => {
        const { movieSchema, params } = makeSut()
        delete params.movie_id

        const result = movieSchema.getMovieSchema.params.validate(params)

        expect(result.error).not.to.be.undefined()
      })
    })
  })

  describe('#listMovieSchema', () => {
    context('success', () => {
      it('Should be successfully called', () => {
        const { movieSchema, query } = makeSut()

        const result = movieSchema.listMovieSchema.query.validate(query)

        expect(result.error).to.be.undefined()
      })
    })

    context('failure', () => {
      it('Should be called and return an error', () => {
        const { movieSchema, query } = makeSut()
        query.page = 'wrong_page'

        const result = movieSchema.listMovieSchema.query.validate(query)

        expect(result.error).not.to.be.undefined()
      })
    })
  })

  describe('#createMovieSchema', () => {
    context('success', () => {
      it('Should be successfully called', () => {
        const { movieSchema, body } = makeSut()

        const result = movieSchema.createMovieSchema.body.validate(body)

        expect(result.error).to.be.undefined()
      })
    })

    context('failure', () => {
      it('Should be called and return an error', () => {
        const { movieSchema, body } = makeSut()
        delete body.title

        const result = movieSchema.createMovieSchema.body.validate(body)

        expect(result.error).not.to.be.undefined()
      })
    })
  })

  describe('#updateMovieSchema', () => {
    context('success', () => {
      it('Should be successfully called', () => {
        const { movieSchema, body, params } = makeSut()

        const resultBody = movieSchema.updateMovieSchema.body.validate(body)
        const resultParam = movieSchema.updateMovieSchema.params.validate(params)

        expect(resultBody.error).to.be.undefined()
        expect(resultParam.error).to.be.undefined()
      })
    })

    context('failure', () => {
      it('Should be called and return an error', () => {
        const { movieSchema, body } = makeSut()
        delete body.title

        const resultParam = movieSchema.updateMovieSchema.params.validate({})

        expect(resultParam.error).not.to.be.undefined()
      })
    })
  })
})
