module.exports = () => ({
  toEntity: ({ _id, title, year, studios, producers, winner }) => ({
    id: _id?.toString(),
    title,
    year,
    studios,
    producers,
    winner
  })
})
