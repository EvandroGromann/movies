module.exports = ({ movieRepository, logger }) => ({
  execute: async (body) => {
    logger.info('Create movie [CreateMovieService:execute]', body)

    return movieRepository.create(body)
  }
})
