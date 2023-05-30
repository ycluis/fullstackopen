const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0
  blogs.forEach((blog) => (likes += blog.likes))
  return likes
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr))
  delete mostLikes.__v
  delete mostLikes._id
  delete mostLikes.url

  return mostLikes
}

const mostBlogs = (blogs) => {
  let count = 0
  let currMax = 1
  let author = {}

  for (const i of blogs) {
    for (const j of blogs) {
      if (i.author === j.author) {
        count++
      }
      if (currMax < count) {
        currMax = count
        author = { ...i }
      }
    }
    count = 0
  }

  return {
    author: author.author,
    blogs: currMax,
  }
}

const mostLikes = (blogs) => {
  let likes = 0
  let currMax = 0
  let author = {}

  for (const i of blogs) {
    for (const j of blogs) {
      if (i.author === j.author) {
        likes += j.likes
      }
      if (currMax < likes) {
        currMax = likes
        author = { ...i }
      }
    }
    likes = 0
  }

  return {
    author: author.author,
    likes: currMax,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
