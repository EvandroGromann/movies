module.exports = ({ movieRepository, logger }) => ({
  execute: async (movie_id) => {
    logger.info(`Delete movie ${movie_id} [DeleteMovieService:execute]`)

    return movieRepository.delete({ _id: movie_id })
  }
})
