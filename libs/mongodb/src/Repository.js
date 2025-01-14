module.exports = class Repository {
  constructor ({ Model, mapper, logger }) {
    this.Model = Model.model
    this.mapper = mapper
    this.logger = logger
  }

  async count (query) {
    return await this.Model.countDocuments(query)
  }

  async findPaginated (filter = {}, pagination) {
    const options = {
      page: Number(pagination.page),
      limit: Number(pagination.limit),
      sort: {}
    }

    if (pagination.sort && pagination.sort_type) {
      options.sort[pagination.sort] = pagination.sort_type
    }

    const result = await this.Model.paginate(filter, options)

    return {
      docs: result.docs.map(doc => this.mapper.toEntity(doc)),
      total: result.totalDocs,
      limit: result.limit,
      page: result.page,
      pages: result.totalPages
    }
  }

  async get (query) {
    const response = await this.Model.findOne(query).lean()

    if (!response) return null

    return this.mapper.toEntity(response)
  }

  async getAll (query, sort = {}, limit = null) {
    const response = await this.Model.find(query).sort(sort).limit(limit)
    return this._response(response)
  }

  async create (entity) {
    try {
      const response = await this.Model(entity).save()
      return this.mapper.toEntity(response)
    } catch (error) {
      this._throw(error)
    }
  }

  async delete (query) {
    return await this.Model.deleteOne(query)
  }

  async aggregate (pipeline) {
    const response = await this.Model.aggregate(pipeline)
    return this._response(response)
  }

  async update (query, entity, options = { new: true, upsert: false }) {
    try {
      const response = await this.Model.findOneAndUpdate(query, entity, options)
      return this._response(this.mapper.toEntity(response))
    } catch (error) {
      this._throw(error)
    }
  }

  async updateMany (query, payload) {
    try {
      return await this.Model.updateMany(query, payload)
    } catch (error) {
      this._throw(error)
    }
  }

  _response (response) {
    if (!response) {
      return null
    }

    return response
  }

  _throw (error) {
    this.logger.error(error)
    throw error
  }
}
