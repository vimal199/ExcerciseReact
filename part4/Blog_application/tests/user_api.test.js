const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/User')
describe('Invalid users are not created', () => {
    test('username must be at least 3 characters long.', async () => {
        const test_user = {
            name: "Tofgfgf",
            userName: "Da",
            password: "Xyz@123456"
        }
        const returned_user = await api.post('/api/users').send(test_user).expect(400)
        // expect(returned_user.body.error).toBe('')
    }, 100000
    )
    test.only('username must be given', async () => {
        const test_user = {
            name: "Tofgfgf",
            password: "Xyz@123456"
        }
        const returned_user = await api.post('/api/users').send(test_user).expect(400)
        expect(returned_user.body.error).toBe('User_blog validation failed: userName: Path `userName` is required.')
    }, 100000
    )
})
afterAll(
    async () => {
        await mongoose.connection.close()
    }
)
