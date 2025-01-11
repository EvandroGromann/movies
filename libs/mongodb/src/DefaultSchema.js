const { Schema } = require('mongoose')

const defaultSchema = new Schema({
  created_at: {
    type: Date,
    set: (date) => _formatDate(date)
  },
  updated_at: {
    type: Date,
    set: (date) => _formatDate(date)
  }
})

const _formatDate = (date) => {
  return Date(date).toISOString()
}

module.exports = defaultSchema
