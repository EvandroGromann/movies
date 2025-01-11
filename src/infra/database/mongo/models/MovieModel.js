const { Model, Schema } = require('libs/mongodb')
const Paginate = require('mongoose-paginate')

module.exports = class MovieModel extends Model {
  constructor ({ providerConnection }) {
    super({ providerConnection, collectionName: 'movies' })
  }

  getSchema () {
    const MovieSchema = new Schema({
      title: String,
      year: Number,
      studios: [ String ],
      producers: [ String ],
      winner: Boolean
    }, {
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      versionKey: false
    })

    MovieSchema.plugin(Paginate)

    return MovieSchema
  }
}
