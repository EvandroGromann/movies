module.exports = class {
  constructor ({ findMovieService }) {
    this.findMovieService = findMovieService
  }

  async execute () {
    await this._getWinnerMovies()
    return this._getAwardsIntervals()
  }

  async _getWinnerMovies () {
    this.winners = await this.findMovieService.execute({ winner: true })
  }

  async _getAwardsIntervals () {
    const producersMap = new Map()

    this.winners.forEach(winner => {
      winner.producers.forEach(producer => {
        if (!producersMap.has(producer)) {
          producersMap.set(producer, [])
        }
        producersMap.get(producer).push(winner.year)
      })
    })

    const producersIntervals = []

    producersMap.forEach((years, producer) => {
      if (years.length > 1) {
        years.sort((a, b) => a - b)
        const intervals = years.slice(1).map((year, index) => year - years[index])
        intervals.forEach((interval, index) => {
          producersIntervals.push({
            producer,
            interval,
            previousWin: years[index],
            followingWin: years[index + 1]
          })
        })
      }
    })

    const maxInterval = Math.max(...producersIntervals.map(p => p.interval))
    const minInterval = Math.min(...producersIntervals.map(p => p.interval))

    const maxProducers = producersIntervals.filter(p => p.interval === maxInterval)
    const minProducers = producersIntervals.filter(p => p.interval === minInterval)

    return {
      min: minProducers,
      max: maxProducers
    }
  }
}
