const EnumMessage = require('src/domain/enums/EnumMessage')
const BusinesException = require('src/domain/exceptions/BusinessException')

module.exports = class {
  constructor ({ getMovieService, createMovieService }) {
    this.getMovieService = getMovieService
    this.createMovieService = createMovieService
  }

  async execute (movie) {
    this.movie = movie

    await this._verifyIfMovieExists()

    return this._createMovieService()
  }

  async _verifyIfMovieExists (movie_id) {
    const { title, year } = this.movie
    const exists = await this.getMovieService.execute({ title, year })

    if (exists) {
      throw new BusinesException(EnumMessage.MOVIE_ALREADY_EXISTS)
    }
  }

  async _createMovieService () {
    return this.createMovieService.execute(this.movie)
  }
}
