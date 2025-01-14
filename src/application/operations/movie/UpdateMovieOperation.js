const EnumMessage = require('src/domain/enums/EnumMessage')
const NotFoundException = require('src/domain/exceptions/NotFoundException')

module.exports = class {
  constructor ({ getMovieService, updateMovieService }) {
    this.getMovieService = getMovieService
    this.updateMovieService = updateMovieService
  }

  async execute (movie_id, body) {
    this.movie_id = movie_id
    this.body = body

    await this._verifyIfMovieExists()

    return this._updateMovieService()
  }

  async _verifyIfMovieExists () {
    const exists = await this.getMovieService.execute({ _id: this.movie_id })

    if (!exists) {
      throw new NotFoundException(EnumMessage.MOVIE_NOT_FOUND)
    }
  }

  async _updateMovieService () {
    return this.updateMovieService.execute(this.movie_id, this.body)
  }
}
