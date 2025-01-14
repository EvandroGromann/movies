const { expect } = require('chai')
const MovieRoutes = require('src/interfaces/http/presentations/movie/MovieRoutes')
describe('Interfaces :: Http :: Presentations :: movie :: MovieRoutes', () => {
  it('should MovieRoutes return a array with valid properties', () => {
    const parameters = {
      body: {},
      headers: [],
      params: []
    }

    const container = {
      authenticationMiddleware: {
        execute: () => {}
      },
      movieSchema: {
        createMovieSchema: parameters,
        updateMovieSchema: parameters
      },
      movieController: {
        create: {},
        update: {}
      }
    }

    const movieIntentRoutes = MovieRoutes(container)
    expect(movieIntentRoutes).to.be.an('array')
    expect(movieIntentRoutes[0]).to.have.a.property('method')
    expect(movieIntentRoutes[0]).to.have.a.property('path')
    expect(movieIntentRoutes[0]).to.have.a.property('tags')
    expect(movieIntentRoutes[0]).to.have.a.property('validation')
    expect(movieIntentRoutes[0]).to.have.a.property('handler')
  })
})
