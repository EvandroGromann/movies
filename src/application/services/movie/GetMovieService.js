module.exports = ({ movieRepository, logger }) => ({
  execute: async (filter) => {
    logger.info('Get movie by filter [GetMovieService:execute]', filter)

    return movieRepository.get(filter)
  }
})
