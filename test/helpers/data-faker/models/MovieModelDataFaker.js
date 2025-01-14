const faker = require('test/helpers/data-faker/dataFaker')

const producer1 = faker.name()
const producer2 = faker.name()
const producer3 = faker.name()
const producer4 = faker.name()

const producers = [
  producer1,
  producer2,
  producer3,
  producer4
]

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
  year: Number(faker.year({ min: 1900, max: 2025 })),
  studios: [ faker.company() ],
  producers: [ faker.pickone(producers), faker.name() ],
  winner: params.onlyWinners ? true : faker.bool()
})

module.exports = { generateModel }
