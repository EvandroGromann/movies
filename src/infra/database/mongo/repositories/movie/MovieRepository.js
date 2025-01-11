const { Repository } = require('libs/mongodb')

module.exports = class MovieRepository extends Repository {
  constructor ({ movieModel, movieMapper, logger }) {
    super({
      Model: movieModel,
      mapper: movieMapper,
      logger
    })
  }
}
