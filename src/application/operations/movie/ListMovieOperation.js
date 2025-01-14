module.exports = class {
  constructor ({ listMovieService }) {
    this.listMovieService = listMovieService
  }

  async execute (filter, pagination) {
    return this.listMovieService.execute(filter, pagination)
  }
}
