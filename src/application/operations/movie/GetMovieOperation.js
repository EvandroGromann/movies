const EnumMessage = require('src/domain/enums/EnumMessage')
const NotFoundException = require('src/domain/exceptions/NotFoundException')

module.exports = class {
  constructor ({ getMovieService }) {
    this.getMovieService = getMovieService
  }

  async execute (movie_id) {
    const movie = await this.getMovieService.execute({ _id: movie_id })

    if (!movie) {
      throw new NotFoundException(EnumMessage.MOVIE_NOT_FOUND)
    }

    return movie
  }
}
