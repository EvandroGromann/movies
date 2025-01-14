module.exports = ({ movieRepository, logger }) => ({
  execute: async (filter, pagination) => {
    logger.info('List movies by filter [ListMovieService:execute]', { filter, pagination })

    return movieRepository.findPaginated(filter, pagination)
  }
})
