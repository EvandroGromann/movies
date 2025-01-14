const AsyncMiddleware = require('../../middlewares/AsyncMiddleware')

module.exports = ({
  getMovieOperation,
  listMovieOperation,
  createMovieOperation,
  updateMovieOperation,
  deleteMovieOperation,
  getAwardsIntervalsOperation
}) => ({
  get: AsyncMiddleware(async (ctx) => {
    const { movie_id } = ctx.params

    const movies = await getMovieOperation.execute(movie_id)

    return ctx.res.status(200).json(movies)
  }),
  list: AsyncMiddleware(async (ctx) => {
    const { page, limit, sort, sort_type, ...filter } = ctx.query

    const movies = await listMovieOperation.execute(filter, { page, limit, sort, sort_type })

    return ctx.res.status(200).json(movies)
  }),
  create: AsyncMiddleware(async (ctx) => {
    const { body } = ctx

    const movie = await createMovieOperation.execute(body)

    return ctx.res.status(201).json(movie)
  }),
  update: AsyncMiddleware(async (ctx) => {
    const { movie_id } = ctx.params
    const { body } = ctx

    const movie = await updateMovieOperation.execute(movie_id, body)

    return ctx.res.status(200).json(movie)
  }),
  delete: AsyncMiddleware(async (ctx) => {
    const { movie_id } = ctx.params

    await deleteMovieOperation.execute(movie_id)

    return ctx.res.status(204).send()
  }),
  getAwardsIntervals: AsyncMiddleware(async (ctx) => {
    const intervals = await getAwardsIntervalsOperation.execute()

    return ctx.res.status(200).json(intervals)
  })
})
