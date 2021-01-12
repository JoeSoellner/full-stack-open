const mongoose = require('mongoose')
const supertest = require('supertest')
const testHelper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testHelper.testBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('GET api/blogs', () => {
    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct number of blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })

    test('id is defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('POST api/blogs', () => {
    const newBlog = {
        title: "jimbo and jumbo",
        author: "big jim",
        url: "https://blogblog",
        likes: 8
    }
    const blogWithoutLikesProperty = {
        title: "no one likes me",
        author: "big sad",
        url: "https://ihavenolikes",
    }

    test('posted blog is returned as JSON', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('length of blogs is increased by one after posting a blog', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)

        const blogs = await api.get('/api/blogs')

        expect(blogs.body).toHaveLength(testHelper.testBlogs.length + 1)
    })

    test('blogs contain posted blog title', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)

        const blogs = await api.get('/api/blogs')

        const blogsTitles = blogs.body.map(blog => blog.title)
        expect(blogsTitles).toContain(newBlog.title)
    })

    test('blogs with no likes property defaults to 0', async () => {
        await api
            .post('/api/blogs')
            .send(blogWithoutLikesProperty)

        const blogs = await api.get('/api/blogs')

        const addedBlog = blogs.body.find(blog => blog.title === blogWithoutLikesProperty.title)
        expect(addedBlog.likes).toBe(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
}) 