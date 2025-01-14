const fs = require('fs')
const csv = require('csv-parser')

module.exports = class {
  constructor ({ logger, movieRepository }) {
    this.logger = logger
    this.movieRepository = movieRepository
  }

  async execute () {
    fs.createReadStream('src/infra/database/mongo/migrations/files/movies.csv')
      .pipe(csv({ separator: ';' }))
      .on('data', async (row) => {
        await this.movieRepository.create({
          year: parseInt(row.year),
          title: row.title,
          studios: row.studios.split(/,| and /).map(studio => studio.trim()).filter(studio => studio),
          producers: row.producers.split(/,| and /).map(producer => producer.trim()).filter(producer => producer),
          winner: row.winner === 'yes'
        })
      })
      .on('end', async () => {
        const movies = await this.movieRepository.getAll()
        this.logger.info(`[migration] The ${movies.length} Movies were successfully imported [MovieMigration:execute]`)
      })
  }
}
