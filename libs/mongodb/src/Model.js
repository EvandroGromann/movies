module.exports = class Model {
  constructor ({ collectionName, modelName, providerConnection }) {
    this.collectionName = modelName || collectionName
    this.modelName = collectionName
    const schema = this.getSchema()
    schema.options.autoIndex ??= true

    this.model = providerConnection.connection.model(this.modelName, schema)
  }

  getSchema () {
    throw new Error('You need to override the method "getSchema".')
  }
}
