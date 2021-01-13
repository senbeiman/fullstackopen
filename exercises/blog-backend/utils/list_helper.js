_ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = blogs.reduce((provisionalMax, blog) =>
    provisionalMax < blog.likes ? blog.likes : provisionalMax
    , 0)
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const result = _(blogs).countBy((blog) => blog.author).toPairs().maxBy(_.last)
  return result ? {author: _.head(result), blogs: _.last(result)} : null
}

const mostLikes = (blogs) => {
  return _(blogs).groupBy((blog) => blog.author)
    .toPairs()
    .map((group) => {
      return {author: _.head(group), likes: _.sumBy(_.last(group),(blog) => blog.likes)}
    })
    .maxBy(result => result.likes) || null
}
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
