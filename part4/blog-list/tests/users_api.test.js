const mongoose = require('mongoose')
const supertest = require('supertest')
const usersTestHelper = require('./usersTestHelper')
const User = require('../models/User')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = usersTestHelper.initialUsers
        .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

describe('GET api/users', () => {
    test('users are returned as JSON with status 200', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct number of users are returned', async () => {
        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(usersTestHelper.initialUsers.length)
    })

    test('all fields are defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined() &&
            expect(response.body[0].name).toBeDefined() &&
            expect(response.body[0].username).toBeDefined()
    })

    test('passwordHashes are not returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].passwordHash).not.toBeDefined()
    })
})

describe('POST api/users', () => {
    test('user returned as JSON with status 201 after post', async () => {
        await api
            .post('/api/users')
            .send(usersTestHelper.additionalUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('correct user returned', async () => {
        const response = await api.post('/api/users')
            .send(usersTestHelper.additionalUser)

        expect(response.body.username).toBe(usersTestHelper.additionalUser.username)
    })

    test('user with no user name returns status 400', async () => {
        const userWithNoUsername =
        {
            name: "noname",
            password: "password"
        }

        await api
            .post('/api/users')
            .send(userWithNoUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('user with no password returns status 400', async () => {
        const userWithNoUsername =
        {
            name: "noname",
            password: "password"
        }

        await api
            .post('/api/users')
            .send(userWithNoUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('user with no name is added to database', async () => {
        const userWithNoName =
        {
            username: "ihavenoname",
            password: "password1234"
        }

        await api
            .post('/api/users')
            .send(userWithNoName)
            .expect(201)

        const users = await api.get('/api/users')
        expect(usersTestHelper.usernameInListOfUsers(userWithNoName.username, users))
    })

    test('user with too small of name returns status 400', async () => {
        const userWith2LetterUserNameAnd3LetterPassword =
        {
            username: "jo",
            name: "jo mamma",
            password: "haa"
        }

        await api
            .post('/api/users')
            .send(userWith2LetterUserNameAnd3LetterPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('user with too small of password returns status 400', async () => {
        const userWith2LetterPasswordAnd3LetterName =
        {
            username: "smo",
            name: "iamsmol",
            password: "lo"
        }

        await api
            .post('/api/users')
            .send(userWith2LetterPasswordAnd3LetterName)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('user with 3 letter username and password is added to database', async () => {
        const userWith3LetterPasswordAnd3LetterName =
        {
            username: "yoo",
            name: "heyiwork",
            password: "lol"
        }

        await api
            .post('/api/users')
            .send(userWith3LetterPasswordAnd3LetterName)
            .expect(201)

        const users = await api.get('/api/users')
        expect(usersTestHelper.usernameInListOfUsers(userWith3LetterPasswordAnd3LetterName.username, users))
    })
})

afterAll(() => {
    mongoose.connection.close()
})