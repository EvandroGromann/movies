let repositories

module.exports = (container) => {
  if (repositories) return repositories

  repositories = Object.keys(container).filter((key) => key.includes('Repository')).reduce((acc, key) => {
    acc[key] = container[key]
    return acc
  }, {})

  return repositories
}
