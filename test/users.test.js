import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe("CRUD Users", function () {
  it('GET /users should return a success response with all users', function (done) {
    chai.request(api)
    .get('/users')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: [
          {
            id: 'user1',
            lastName: 'Grollier',
            firstName: 'Theo',
            birthDate: '1999-11-08T23:00:00.000Z',
            address: '15 rue de la Grande Motte',
            phone: '0981234321',
            email: 'test@mail.com'
          },
          {
            id: 'user2',
            lastName: 'Dujardin',
            firstName: 'Jean',
            birthDate: '1981-01-24T23:00:00.000Z',
            address: '15 rue de la Petite Motte',
            phone: '0921234321',
            email: 'testj@mail.com'
          }
        ]
    })
  })
  done()
  })
  it('POST /users should create a user and return a success response with the user', function (done) {
    const user = [
        {
          id: 'user3',
          lastName: 'Blanchard',
          firstName: 'Hugo',
          birthDate: '2000-12-01T21:00:00.000Z',
          address: '15 rue de la Grande Motte',
          phone: '0981234321',
          email: 'test@mail.com'
        }
    ]
    chai.request(api)
    .post('/users')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(201);
      chai.expect(res.body).to.deep.equal({
        data: user
      })
  })
  done()
  })
})
