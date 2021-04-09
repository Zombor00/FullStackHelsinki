const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [ 
  { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', 
    url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, 
  { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
  { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
  { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
  { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
  { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]

describe('totalLikes', () => {
  test('of one blog is the like of the blog itself', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(7)
  })

  test('of many is calculated right', () => {
    const result = listHelper.totalLikes([blogs[1], blogs[2], blogs[3]])
    expect(result).toBe(27)
  })

  test('of many is calculated right v2', () => {
    const result = listHelper.totalLikes([blogs[0], blogs[5]])
    expect(result).toBe(9)
  })

  test('of empty array is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})

describe('favoriteBlog', () => {
  test('of one blog is the blog itself', () => {
    const result = listHelper.favoriteBlog([blogs[0]])
    expect(result).toEqual(blogs[0])
  })

  test('of many is calculated right', () => {
    const result = listHelper.favoriteBlog([blogs[0], blogs[1], blogs[2]])
    expect(result).toEqual(blogs[2])
  })

  test('of many is calculated right v2', () => {
    const result = listHelper.favoriteBlog([blogs[0], blogs[1], blogs[2], blogs[3], blogs[4], blogs[5]])
    expect(result).toEqual(blogs[2])
  })

  test('of empty array is null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })
})