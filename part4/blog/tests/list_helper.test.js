const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '1',
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 2,
    __v: 0
  }
]

const blogs = [
  {
    _id: '1',
    title: 'Unit Tests are Good',
    author: 'Unit Test',
    url: 'url1',
    likes: 15,
    __v: 0
  },
  {
    _id: '2',
    title: 'Eat Your Fruits and Veggies',
    author: 'Fruit',
    url: 'fruiturl',
    likes: 200,
    __v: 0
  },
  {
    _id: '3',
    title: 'Eep Well',
    author: 'Eep',
    url: 'eepurl',
    likes: 50,
    __v: 0
  },
  {
    _id: '4',
    title: 'Meow',
    author: 'Cat',
    url: 'caturl',
    likes: 200,
    __v: 0
  },
  {
    _id: '5',
    title: 'Gym Time',
    author: 'Jim',
    url: 'gymurl',
    likes: 25,
    __v: 0
  },
  {
    _id: '6',
    title: 'Gym Time 2',
    author: 'Jim',
    url: 'gymurl',
    likes: 100,
    __v: 0
  }, 
  {
    _id: '7',
    title: 'Gym Time 3',
    author: 'Jim',
    url: 'gymurl',
    likes: 50,
    __v: 0
  }
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('totalLikes', () => {
  test('empty list returns 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list only has one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0].likes)
  })

  test('total likes of many blogs', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 640)
  })
})

describe('favoriteBlog', () => {
  test ('empty list returns null', () => { 
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test ('favorite blog of list with singular blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test ('favorite blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      _id: '2',
      title: 'Eat Your Fruits and Veggies',
      author: 'Fruit',
      url: 'fruiturl',
      likes: 200,
      __v: 0
    })
  })
})


describe('mostBlogs', () => {
  test ('empty list returns null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test ('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Jim',
      blogs: 3
    })
  })
})

describe('mostLikes', () => {
  test ('empty list returns null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })

  test ('author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Fruit',
      likes: 200
    })
  })
})
