const faker = require('test/helpers/data-faker/dataFaker')

const winner = [ true, false ]

const generateModel = (quantity = 1, params = {}) => {
  if (quantity > 1) {
    const objs = []
    for (let index = 0; index < quantity; index++) {
      objs.push(createMerchant(params))
    }
    return objs
  }

  return createMerchant(params)
}

const createMerchant = (params) => ({
  title: faker.sentence({ words: 4 }),
  year: faker.year({ min: 1895, max: 2025 }),
  studios: [ faker.company() ],
  producers: [ faker.name() ],
  winner: faker.pickone(winner)
})

module.exports = { generateModel }
