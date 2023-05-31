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

const initialBlog = () => {
  return [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    },
  ]
}

const initialUser = () => {
  return [
    {
      username: 'michael.chan',
      name: 'Michael Chan',
      password: 'michael123',
    },
    {
      username: 'john.doe',
      name: 'John Doe',
      password: 'johndoe123',
    },
    {
      username: 'steve.smith',
      name: 'Steve Smith',
      password: 'stevesmith123',
    },
  ]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlog,
  initialUser,
}
