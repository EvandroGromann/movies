module.exports = ({ movieRepository, logger }) => ({
  execute: async (movie_id, body) => {
    logger.info(`Update movie ${movie_id} [UpdateMovieService:execute]`, body)

    return movieRepository.update({ _id: movie_id }, body)
  }
})
