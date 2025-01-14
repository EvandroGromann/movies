module.exports = ({ movieRepository, logger }) => ({
  execute: async (filter) => {
    logger.info('Find movies by filter [FindMovieService:execute]', filter)

    return movieRepository.getAll(filter)
  }
})
