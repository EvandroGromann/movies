let provider

module.exports = providerConnection => {
  if (providerConnection && !provider) { provider = providerConnection }

  return ({
    async clear () {
      const connection = await provider.connect()
      for (const collection of Object.keys(connection.collections)) {
        await connection.collections[collection].deleteMany({})
      }
    },
    async insertOne (collection, data, options = undefined) {
      const connection = await provider.connect()
      return await connection.collections[collection].insertOne(data, options)
    },
    async query (collection, query) {
      const connection = await provider.connect()
      return await connection.collections[collection].find(query).toArray()
    }
  })
}
