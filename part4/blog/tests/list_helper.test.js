const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Bedbean Explores Rito',
        author: 'Bedbean',
        url: 'test.url',
        likes: 49824,
        __v: 0
      }
    ]
  
    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Bedbean Explores Rito',
          author: 'Bedbean',
          url: 'test.url',
          likes: 2,
          __v: 0
        },
        {
            _id: '2498723489789274',
            title: 'Jett Takes on Pearl',
            author: 'Jett',
            url: 'test.url',
            likes: 300,
            __v: 0
          },
          {
            _id: '1029834982734',
            title: 'Eating Food',
            author: 'Bread',
            url: 'test.url',
            likes: 1,
            __v: 0
          }
      ]

    test('empty list', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('list with one blog', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(49824)
    })

    test('list with multiple blog posts', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(303)
      })

  })

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Bedbean Explores Rito',
          author: 'Bedbean',
          url: 'test.url',
          likes: 49824,
          __v: 0
        }
      ]
    
      const listWithMultipleBlogs = [
          {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Bedbean Explores Rito',
            author: 'Bedbean',
            url: 'test.url',
            likes: 2,
            __v: 0
          },
          {
              _id: '2498723489789274',
              title: 'Jett Takes on Pearl',
              author: 'Jett',
              url: 'test.url',
              likes: 300,
              __v: 0
            },
            {
              _id: '1029834982734',
              title: 'Eating Food',
              author: 'Bread',
              url: 'test.url',
              likes: 1,
              __v: 0
            }
        ]

    test('empty list', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBe("Blogs do not exist")
    })

    test('list with one blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('list with multiple blogs', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        expect(result).toEqual(listWithMultipleBlogs[1])
    })
})

describe('most blogs', () => {
  const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Bedbean Explores Rito',
        author: 'Bedbean',
        url: 'test.url',
        likes: 49824,
        __v: 0
      }
    ]
  
    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Bedbean Explores Rito',
          author: 'Bedbean',
          url: 'test.url',
          likes: 2,
          __v: 0
        },
        {
            _id: '2498723489789274',
            title: 'Jett Takes on Pearl',
            author: 'Jett',
            url: 'test.url',
            likes: 300,
            __v: 0
          },
          {
            _id: '1029834982734',
            title: 'Eating Food',
            author: 'Jett',
            url: 'test.url',
            likes: 1,
            __v: 0
          }
      ]

    const answer1 = {author: 'Bedbean', blogs: 1}
    const answer2 = {author: 'Jett', blogs: 2}

    test('empty list', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toBe("Blogs do not exist")
    })
  
    test('list with one blog', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual(answer1)
  })

  test('list with multiple blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual(answer2)
})

})

describe('most likes', () => {
  const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Bedbean Explores Rito',
        author: 'Bedbean',
        url: 'test.url',
        likes: 49824,
        __v: 0
      }
    ]
  
    const listWithMultipleBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Bedbean Explores Rito',
          author: 'Bedbean',
          url: 'test.url',
          likes: 2,
          __v: 0
        },
        {
            _id: '2498723489789274',
            title: 'Jett Takes on Pearl',
            author: 'Jett',
            url: 'test.url',
            likes: 300,
            __v: 0
          },
          {
            _id: '1029834982734',
            title: 'Eating Food',
            author: 'Jett',
            url: 'test.url',
            likes: 1,
            __v: 0
          }
      ]

    const answer1 = {author: 'Bedbean', likes: 49824}
    const answer2 = {author: 'Jett', likes: 301}

    test('empty list', () => {
        const result = listHelper.mostLikes([])
        expect(result).toBe("Blogs do not exist")
    })
  
    test('list with one blog', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual(answer1)
  })

  test('list with multiple blogs', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toEqual(answer2)
})

})