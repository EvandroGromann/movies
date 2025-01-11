const express = require('express')
const helmet = require('helmet')
const noCache = require('nocache')
const { scopePerRequest } = require('awilix-express')

class Server {
  constructor ({ config, router, logger, container }) {
    this.config = config
    this.logger = logger
    this.express = express()
    this.express.use(helmet())
    this.express.use(noCache())
    this.express.use(scopePerRequest(container))
    this.express.use(router)
  }

  start () {
    return new Promise(resolve => {
      const server = this.express.listen(this.config.port, () => {
        const { port } = server.address()
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`)
        resolve()
      })
    })
  }
}

module.exports = Server
