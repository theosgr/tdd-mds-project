import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';
import { v4 as uuidv4 } from 'uuid';

chai.use(chaiHttp);


const date1 = new Date('November 09, 1999').toISOString().slice(0, 10); 
const date2 = new Date('January 25, 1981').toISOString().slice(0, 10);
const date3 = new Date('February 14, 1998').toISOString().slice(0, 10);
const date4 = new Date('December 20, 2000').toISOString().slice(0, 10);

const uuidTestNewUser = uuidv4();

describe("CRUD Users", function () {
  it('GET /users should return a success response with all users', function (done) {
    chai.request(api)
    .get('/users')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: [
          {
            id: 'cef5ee37-15de-4039-8d03-8ecc23d98ecc',
            lastName: 'Grollier',
            firstName: 'Theo',
            birthDate: date1,
            address: '15 rue de la Grande Motte',
            phone: '0981234321',
            email: 'test@mail.com'
          },
          {
            id: 'a70f0f97-8ec0-4d66-8bfc-975357f37a1e',
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
    const user =
        {
          lastName: 'Blanchard',
          firstName: 'Hugo',
          birthDate: date4,
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
  it('GET /users/:id should return a success response with the user', function (done) {
    const user =
      {
        id: 'cef5ee37-15de-4039-8d03-8ecc23d98ecc',
        lastName: 'Grollier',
        firstName: 'Theo',
        birthDate: date1,
        address: '15 rue de la Grande Motte',
        phone: '0981234321',
        email: 'test@mail.com'
      }
    chai.request(api)
    .get('/users/cef5ee37-15de-4039-8d03-8ecc23d98ecc')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: user
      })
  })
  done()
})
  it('GET /users/:id should return an error after not found user', function (done) {
    chai.request(api)
    .get('/users/8bb997f4-f52e-4fda-8960-62f63c1431d3')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User with id 8bb997f4-f52e-4fda-8960-62f63c1431d3 not found'
      })
    })
    done()
  })
  it('GET /users/:id should return an error after bad format uuid', function (done) {
    chai.request(api)
    .get('/users/baduuid')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400);
      chai.expect(res.body).to.deep.equal({
        error: `L'ID renseigné n'est pas de type UUID`
      })
    })
    done()
  })
  it('PUT /users/:id should update and return a success response with found user', function (done) {
    const user =
    {
      id: 'a2e84855-be23-42fc-81ed-83e807198c9c',
      lastName: 'Henry',
      firstName: 'Thierry',
      birthDate: date3,
      address: '19 boulevard des Anciens',
      phone: '0712382910',
      email: 'lemaildethierry@mail.com'
    }
    chai.request(api)
    .put('/users/a2e84855-be23-42fc-81ed-83e807198c9c')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        data: {
          id: 'a2e84855-be23-42fc-81ed-83e807198c9c',
          lastName: 'Henry',
          firstName: 'Thierry',
          birthDate: date3,
          address: '19 boulevard des Anciens',
          phone: '0712382910',
          email: 'lemaildethierry@mail.com'
        }
      });
    });
    done();
  });
  it('PUT /users/:id should return an error after not found user', function (done) {
    const user =
    {
      id: 'a2e84855-be23-42fc-81ed-83e807198c9c',
      lastName: 'Henry',
      firstName: 'Thierry',
      birthDate: date3,
      address: '19 boulevard des Anciens',
      phone: '0712382910',
      email: 'lemaildethierrymodifie@mail.com'
    }
    chai.request(api)
    .put('/users/8bb997f4-f52e-4fda-8960-62f63c1431d3')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: `User with id 8bb997f4-f52e-4fda-8960-62f63c1431d3 not found`
      });
    });
    done();
  });
  it('PUT /users/:id should return an error after bad format uuid', function (done) {
    const user =
    {
      id: 'a2e84855-be23-42fc-81ed-83e807198c9c',
      lastName: 'Henry',
      firstName: 'Thierry',
      birthDate: date3,
      address: '19 boulevard des Anciens',
      phone: '0712382910',
      email: 'lemaildethierrymodifie@mail.com'
    }
    chai.request(api)
    .put('/users/baduuid')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400);
      chai.expect(res.body).to.deep.equal({
        error: `L'ID renseigné n'est pas de type UUID`
      });
    });
    done();
  });
  it('DELETE /users/:id should delete the user and return successful response with the user deleted', function (done) {
    const user =
    {
      id: 'a2e84855-be23-42fc-81ed-83e807198c9c',
      lastName: 'Henry',
      firstName: 'Thierry',
      birthDate: date3,
      address: '19 boulevard des Anciens',
      phone: '0712382910',
      email: 'lemaildethierry@mail.com'
    }
    chai.request(api)
    .delete('/users/a2e84855-be23-42fc-81ed-83e807198c9c')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200);
      chai.expect(res.body).to.deep.equal({
        meta: {
          _deleted: user
        }
      });
      done();
    });
  });
  it('DELETE /users/:id should return an error if user not found', function (done) {
    chai.request(api)
    .delete('/users/8bb997f4-f52e-4fda-8960-62f63c1431d3')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404);
      chai.expect(res.body).to.deep.equal({
        error: 'User with id 8bb997f4-f52e-4fda-8960-62f63c1431d3 not found'
      });
    });
    done();
  });
  it('DELETE /users/:id should return an error after bad format uuid', function (done) {
    chai.request(api)
    .delete('/users/baduuid')
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400);
      chai.expect(res.body).to.deep.equal({
        error: `L'ID renseigné n'est pas de type UUID`
      });
    });
    done();
  });
})
