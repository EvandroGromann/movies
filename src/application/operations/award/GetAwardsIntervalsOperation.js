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
        const maxInterval = Math.max(...intervals)
        const minInterval = Math.min(...intervals)
        producersIntervals.push({ producer, maxInterval, minInterval, intervals, years })
      }
    })

    const maxInterval = Math.max(...producersIntervals.map(p => p.maxInterval))
    const minInterval = Math.min(...producersIntervals.map(p => p.minInterval))

    const maxProducers = producersIntervals.filter(p => p.maxInterval === maxInterval).map(p => ({
      producer: p.producer,
      interval: p.maxInterval,
      previousWin: p.years[p.intervals.indexOf(p.maxInterval)],
      followingWin: p.years[p.intervals.indexOf(p.maxInterval) + 1]
    }))

    const minProducers = producersIntervals.filter(p => p.minInterval === minInterval).map(p => ({
      producer: p.producer,
      interval: p.minInterval,
      previousWin: p.years[p.intervals.indexOf(p.minInterval)],
      followingWin: p.years[p.intervals.indexOf(p.minInterval) + 1]
    }))

    return {
      min: minProducers,
      max: maxProducers
    }
  }
}
