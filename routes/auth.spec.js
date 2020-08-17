const server = require('../server')
const db = require('../database/dbConfig')
const request = require('supertest')


const user = {
  username: 'Test User',
  password: '1234567890'
}

describe('tests auth route', () => {
  it('/api/auth/register - should return 201 (created)', () => {
    const runTest = request(server)
    .post('/api/auth/register')
    .send(user)
    .expect(201)
  })

  it('/api/auth/register - should return 400 (bad request)', async () => {
    const runTest = await request(server)
    .post('/api/auth/register')
    .send('')
    expect(runTest.status).toBe(400)
  })

  it('/api/auth/login - should return 401 (not found)', () => {
    const runTest = request(server)
    .post('/api/auth/login')
    .send({
      username: 'JoeBiden',
      password: '987654321'
    })
    .expect(401)
  })

  it('/api/auth/login - should return 500 (server error)', () => {
    const runTest = request(server)
    .post('/api/auth/login')
    .send(user+user)
    .expect(500)
  })
})