const mongoose = require('mongoose')

module.exports = class ProviderConnection {
  constructor ({ config }) {
    this.mongoose = mongoose
  }

  async connect (url) {
    if (this.connection && this._isConnected()) {
      return this.connection
    }

    try {
      const options = this._getOptions()
      this.url = url
      this.mongoose.pluralize(null)

      this.connection = this.mongoose.createConnection(this.url, options)
      this._setListeners()
      this.connection = await this.connection.asPromise()

      return this.connection
    } catch (error) {
      console.log('[mongodb] connection error')
      throw error
    }
  }

  _isConnected () {
    return this.connection?.readyState === 1
  }

  close (force = false) {
    try {
      this.logger.info('[mongodb] Closing connection')
      return this.connection.close(force)
    } catch (error) {
      this.logger.error(`[mongodb] Error closing connection ${error.message}`)
      throw error
    }
  }

  _getOptions () {
    return {
      readPreference: 'nearest',
      maxPoolSize: 5
    }
  }

  _setListeners () {
    this.connection.on('connected', () => console.log('[mongodb] connection established'))
    this.connection.on('disconnected', () => console.log('[mongodb] connection lost'))
    this.connection.on('reconnected', () => console.log('[mongodb] reconnection established'))
    this.connection.on('reconnectedFailed', () => {
      console.log('[mongodb] reconnection failed, killing process')
      process.exit(1)
    })
  }
}
