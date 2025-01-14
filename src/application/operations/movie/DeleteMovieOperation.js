const EnumMessage = require('src/domain/enums/EnumMessage')
const NotFoundException = require('src/domain/exceptions/NotFoundException')

module.exports = class {
  constructor ({ getMovieService, deleteMovieService }) {
    this.getMovieService = getMovieService
    this.deleteMovieService = deleteMovieService
  }

  async execute (movie_id) {
    this.movie_id = movie_id

    await this._verifyIfMovieExists()

    return this._deleteMovieService()
  }

  async _verifyIfMovieExists () {
    const exists = await this.getMovieService.execute({ _id: this.movie_id })

    if (!exists) {
      throw new NotFoundException(EnumMessage.MOVIE_NOT_FOUND)
    }
  }

  async _deleteMovieService () {
    return this.deleteMovieService.execute(this.movie_id)
  }
}
