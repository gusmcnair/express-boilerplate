const app = require('../src/app')

describe('App', () => {
  
    before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })
  
  before('cleanup', () => db.raw('TRUNCATE TABLE todo RESTART IDENTITY;'));

  afterEach('cleanup', () => db.raw('TRUNCATE TABLE todo RESTART IDENTITY;')); 

  after('disconnect from the database', () => db.destroy()); 
  
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, boilerplate!')
  })
})
