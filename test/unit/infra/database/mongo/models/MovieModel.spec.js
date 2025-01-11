const mongoose = require('mongoose')
const { expect, spy } = require('chai')
const MovieModel = require('src/infra/database/mongo/models/MovieModel')
const { generateModel } = require('test/helpers/data-faker/models/MovieModelDataFaker')

function invalidateData (data) {
  for (const item in data) {
    if (typeof data[item] === 'object' && !Array.isArray(data[item])) {
      invalidateData(data[item])
    } else {
      data[item] = []
    }
  }
}

describe('Infra :: Database :: Mongo :: Models :: MovieModel', () => {
  afterEach(() => {
    mongoose.models = {}
  })

  context('when mongoose schema ins initilized', () => {
    let providerConnection

    before(() => {
      providerConnection = {
        connection: {
          model: (name, schema) => ({ name, schema })
        }
      }
    })

    it('Should call ProviderConnection with correct value', () => {
      spy.on(providerConnection.connection, 'model')

      // eslint-disable-next-line no-new
      new MovieModel({
        providerConnection
      })

      expect(providerConnection.connection.model).to.be.called()
    })

    it('should return the correct model name and schema', () => {
      const { name, schema } = new MovieModel({
        providerConnection
      }).model

      expect(name).to.be.equal('movies')
      expect(schema).to.exist()
    })
  })

  context('when schema field types are wrong', () => {
    let providerConnection, Movie

    before(() => {
      providerConnection = {
        connection: {
          model: (name, schema) => mongoose.model(name, schema)
        }
      }

      Movie = new MovieModel({ providerConnection })
    })

    it('should throw error when for invalid data', async () => {
      const data = generateModel()

      invalidateData(data)

      const expectedKeysWithErrors = [
        'title',
        'year',
        'winner'
      ]

      const model = Movie.model(data)
      const error = model.validateSync()

      expect(error.errors).to.have.all.keys(expectedKeysWithErrors)
    })
  })
})
