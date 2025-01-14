module.exports = ({ movieController, movieSchema }) => {
  const { getMovieSchema, listMovieSchema, createMovieSchema, updateMovieSchema, deleteMovieSchema } = movieSchema

  return [
    {
      method: 'get',
      path: '/movies/:movie_id',
      validation: {
        ...getMovieSchema
      },
      handler: [
        movieController.get
      ],
      tags: [ 'movie' ]
    },
    {
      method: 'get',
      path: '/movies',
      validation: {
        ...listMovieSchema
      },
      handler: [
        movieController.list
      ],
      tags: [ 'movie' ]
    },
    {
      method: 'post',
      path: '/movies',
      validation: {
        ...createMovieSchema
      },
      handler: [
        movieController.create
      ],
      tags: [ 'movie' ]
    },
    {
      method: 'put',
      path: '/movies/:movie_id',
      validation: {
        ...updateMovieSchema
      },
      handler: [
        movieController.update
      ],
      tags: [ 'movie' ]
    },
    {
      method: 'delete',
      path: '/movies/:movie_id',
      validation: {
        ...deleteMovieSchema
      },
      handler: [
        movieController.delete
      ],
      tags: [ 'movie' ]
    },
    {
      method: 'get',
      path: '/awards/interval',
      validation: {},
      handler: [
        movieController.getAwardsIntervals
      ],
      tags: [ 'movie' ]
    }
  ]
}
