const joi = require('joi')

const getMovieSchema = {
  params: joi.object().keys({
    movie_id: joi.string().required()
  })
}

const listMovieSchema = {
  query: joi.object().keys({
    page: joi.number().options({ convert: true }).min(1).default(1),
    limit: joi.number().options({ convert: true }).min(1).default(10),
    sort: joi.string().default('created_at'),
    sort_type: joi.string().default('desc')
  })
}

const createMovieSchema = {
  body: joi.object().keys({
    title: joi.string().required(),
    year: joi.number().required(),
    studios: joi.array().items(joi.string()).required(),
    producers: joi.array().items(joi.string()).required(),
    winner: joi.boolean().required()
  })
}

const updateMovieSchema = {
  params: joi.object().keys({
    movie_id: joi.string().required()
  }),
  body: joi.object().keys({
    title: joi.string(),
    year: joi.number(),
    studios: joi.array().items(joi.string()),
    producers: joi.array().items(joi.string()),
    winner: joi.boolean()
  })
}

const deleteMovieSchema = {
  params: joi.object().keys({
    movie_id: joi.string().required()
  })
}

module.exports = () => ({
  getMovieSchema,
  listMovieSchema,
  createMovieSchema,
  updateMovieSchema,
  deleteMovieSchema
})
