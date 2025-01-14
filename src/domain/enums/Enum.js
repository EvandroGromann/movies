module.exports = (data) => ({
  ...data,
  values: () => Object.values(data),
  keys: () => Object.keys(data)
})
