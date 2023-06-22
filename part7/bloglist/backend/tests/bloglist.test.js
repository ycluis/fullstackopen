const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Blog Total Likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of total', () => {
    const blogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = listHelper.initialBlog()

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('Blog Most Likes', () => {
  test('of most likes blog', () => {
    const blogs = listHelper.initialBlog()

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('Author with most blogs', () => {
  test('of author with most blogs', () => {
    const blogs = listHelper.initialBlog()

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('Blog with most likes', () => {
  test('of blog with most likes', () => {
    const blogs = listHelper.initialBlog()

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
