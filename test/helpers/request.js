const supertest = require('supertest')

let request
module.exports = server => {
  if (server && !request) { request = supertest(server.express) }
  return request
}
