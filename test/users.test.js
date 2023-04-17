import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';
import { v4 as uuidv4 } from 'uuid';

chai.use(chaiHttp);

describe("CRUD Users", function () {
  it('GET /users should return a success response with all users', function (done) {
    let date1 = new Date('November 09, 1999').toISOString().slice(0, 10); 
    let date2 = new Date('January 25, 1981').toISOString().slice(0, 10);
    let date3 = new Date('February 14, 1998').toISOString().slice(0, 10);
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
            birthDate: date1,
            address: '15 rue de la Grande Motte',
            phone: '0981234321',
            email: 'test@mail.com'
          },
          {
            id: 'user2',
            lastName: 'Dujardin',
            firstName: 'Jean',
            birthDate: date2,
            address: '15 rue de la Petite Motte',
            phone: '0921234321',
            email: 'testj@mail.com'
          },
          {
            id: 'a2e84855-be23-42fc-81ed-83e807198c9c',
            lastName: 'Henry',
            firstName: 'Thierry',
            birthDate: date3,
            address: '19 boulevard des Anciens',
            phone: '0712382910',
            email: 'lemail@mail.com'
          }
        ]
    })
  })
  done()
  })
  it('POST /users should create a user and return a success response with the user', function (done) {
    let date = new Date('December 20, 2000').toISOString().slice(0, 10);
    const user =
        {
          id: uuidv4(),
          lastName: 'Blanchard',
          firstName: 'Hugo',
          birthDate: date,
          address: '15 rue de la Grande Motte',
          phone: '0981234321',
          email: 'test@mail.com'
        }
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
  it('POST /users should return a bad request if id isnt UUID', function (done) {
    let date = new Date('December 25, 1994').toISOString().slice(0, 10);
    const user =
        {
          id: 'notauuid',
          lastName: 'Neymar',
          firstName: 'Jean',
          birthDate: date,
          address: '15 rue de la Moyenne Motte',
          phone: '0911234321',
          email: 'testtest@mail.com'
        }
    chai.request(api)
      .post('/users')
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(400);
        chai.expect(res.body).to.deep.equal({
          error: {
            message: `L'ID renseigné n'est pas de type UUID`
          }
        });
      });
      done();
  });
  it('PUT /users/:id should return a success response with found user', function (done) {
    let date = new Date('February 14, 1998').toISOString().slice(0, 10);
    const user =
    {
          id: 'a2e84855-be23-42fc-81ed-83e807198c9c',
          lastName: 'Henry',
          firstName: 'Thierry',
          birthDate: date,
          address: '19 boulevard des Anciens',
          phone: '0712382910',
          email: 'lemail@mail.com'
    }
    chai.request(api)
    .put('/books/a2e84855-be23-42fc-81ed-83e807198c9c')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          id: 'a2e84855-be23-42fc-81ed-83e807198c9c',
          lastName: 'Henry',
          firstName: 'Thierry',
          birthDate: date,
          address: '19 boulevard des Anciens',
          phone: '0712382910',
          email: 'lemail@mail.com'
        }
      });
    });
    done();
  });
})
