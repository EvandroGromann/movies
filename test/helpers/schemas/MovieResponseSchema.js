const joi = require('joi')

const movieSchema = joi.object().keys({
  id: joi.string().required(),
  title: joi.string().required(),
  year: joi.number().required(),
  studios: joi.array().items(joi.string()).required(),
  producers: joi.array().items(joi.string()).required(),
  winner: joi.boolean().required()
})

module.exports = {
  get: movieSchema,
  list: joi.object().keys({
    docs: joi.array().items(movieSchema).required(),
    total: joi.number().required(),
    limit: joi.number().required(),
    page: joi.number().required(),
    pages: joi.number().required()
  }),
  create: movieSchema,
  update: movieSchema,
  getAwardsIntervals: joi.object().keys({
    min: joi.array().items(joi.object().keys({
      producer: joi.string().required(),
      interval: joi.number().required(),
      previousWin: joi.number().required(),
      followingWin: joi.number().required()
    })),
    max: joi.array().items(joi.object().keys({
      producer: joi.string().required(),
      interval: joi.number().required(),
      previousWin: joi.number().required(),
      followingWin: joi.number().required()
    }))
  })
}
