import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';
import { v4 as uuidv4 } from 'uuid';

chai.use(chaiHttp);

const date1 = new Date('November 09, 1999').toISOString().slice(0, 10); 
const date2 = new Date('January 25, 1981').toISOString().slice(0, 10);

const rentDate1 = new Date('July 12, 2023').toISOString().slice(0, 10); 
const returnDate1 = new Date('July 25, 2023').toISOString().slice(0, 10); 
const rentDate2 = new Date('May 14, 2023').toISOString().slice(0, 10); 
const returnDate2 = new Date('June 14, 2023').toISOString().slice(0, 10); 
const rentDate3 = new Date('October 23, 2023').toISOString().slice(0, 10); 
const returnDate3 = new Date('November 23, 2023').toISOString().slice(0, 10); 

describe('CRUD Booking', function () {
    it('GET /bookings should return successful response with all bookings', function (done) {
        chai.request(api)
            .get('/bookings')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: [
                        {
                            id: '4d834e69-f34b-4be6-b36e-cadf450d499d',
                            rentDate: rentDate1,
                            returnDate: returnDate1,
                            item: {
                                title: "Les joies du code",
                                isbn13: "3841922148523",
                                authors: "Informaticien Joyeux",
                                editor: "Informatique Edition",
                                langCode: "FR",
                                price: 13.99
                            },
                            user: {
                                id: 'cef5ee37-15de-4039-8d03-8ecc23d98ecc',
                                lastName: 'Grollier',
                                firstName: 'Theo',
                                birthDate: date1,
                                address: '15 rue de la Grande Motte',
                                phone: '0981234321',
                                email: 'test@mail.com'
                            }
                        },
                        {
                            id: '1d5705c0-97e7-4610-9ff3-ff71420f0a42',
                            rentDate: rentDate2,
                            returnDate: returnDate2,
                            item: {
                                title: "Cherub - Trafic",
                                isbn13: "9121103912341",
                                authors: "Robert Muchamore",
                                editor: "Casterman",
                                langCode: "FR",
                                price: 7.50  
                            },
                            user: {
                                id: 'cef5ee37-15de-4039-8d03-8ecc23d98ecc',
                                lastName: 'Grollier',
                                firstName: 'Theo',
                                birthDate: date1,
                                address: '15 rue de la Grande Motte',
                                phone: '0981234321',
                                email: 'test@mail.com'
                            }
                        },
                        {
                            id: '98fc10ba-0339-4290-bd24-536a07781141',
                            rentDate: rentDate3,
                            returnDate: returnDate3,
                            item: {
                                title: "Cherub - Trafic",
                                isbn13: "9121103912341",
                                authors: "Robert Muchamore",
                                editor: "Casterman",
                                langCode: "FR",
                                price: 7.50  
                            },
                            user: {
                                id: 'a70f0f97-8ec0-4d66-8bfc-975357f37a1e',
                                lastName: 'Dujardin',
                                firstName: 'Jean',
                                birthDate: date2,
                                address: '15 rue de la Petite Motte',
                                phone: '0921234321',
                                email: 'testj@mail.com'
                            }
                        }
                    ]
                })
                done()
            })
    })
    it('POST /bookings should return a success response with the book created', function (done) {
        const rentDate = new Date('August 15, 2023').toISOString().slice(0, 10); 
        const returnDate = new Date('August 26, 2023').toISOString().slice(0, 10); 
        chai.request(api)
            .post('/bookings')
            .send({
                rentDate: rentDate,
                returnDate: returnDate,
                item: {
                    title: "Les joies du code",
                    isbn13: "3841922148523",
                    authors: "Informaticien Joyeux",
                    editor: "Informatique Edition",
                    langCode: "FR",
                    price: 13.99
                },
                user: {
                    id: 'a70f0f97-8ec0-4d66-8bfc-975357f37a1e',
                    lastName: 'Dujardin',
                    firstName: 'Jean',
                    birthDate: date2,
                    address: '15 rue de la Petite Motte',
                    phone: '0921234321',
                    email: 'testj@mail.com'
                }
            })
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body.data).to.have.property('id');
                chai.expect(res.body.data).to.deep.include({
                    rentDate: rentDate,
                    returnDate: returnDate,
                    item: {
                        title: "Les joies du code",
                        isbn13: "3841922148523",
                        authors: "Informaticien Joyeux",
                        editor: "Informatique Edition",
                        langCode: "FR",
                        price: 13.99
                    },
                    user: {
                        id: 'a70f0f97-8ec0-4d66-8bfc-975357f37a1e',
                        lastName: 'Dujardin',
                        firstName: 'Jean',
                        birthDate: date2,
                        address: '15 rue de la Petite Motte',
                        phone: '0921234321',
                        email: 'testj@mail.com'
                    }
                });
                done();
            });
        })
        it('POST /bookings should return an error if the book is unknown', function (done) {
            const rentDate = new Date('March 15, 2023').toISOString().slice(0, 10); 
            const returnDate = new Date('May 15, 2023').toISOString().slice(0, 10); 
            chai.request(api)
                .post('/bookings')
                .send({
                    rentDate: rentDate,
                    returnDate: returnDate,
                    item: {
                        title: "Cherub - Sang pour Sang",
                        isbn13: "1111111111111",
                        authors: "Robert Muchamore",
                        editor: "Casterman",
                        langCode: "FR",
                        price: 8.50
                    },
                    user: {
                        id: 'a70f0f97-8ec0-4d66-8bfc-975357f37a1e',
                        lastName: 'Dujardin',
                        firstName: 'Jean',
                        birthDate: date2,
                        address: '15 rue de la Petite Motte',
                        phone: '0921234321',
                        email: 'testj@mail.com'
                    }
                })
                .end((_, res) => {
                    chai.expect(res.statusCode).to.equal(400);
                    chai.expect(res.body.data).to.deep.equal({
                        error: `Unknown book`
                    });
                    done();
                });
            })

})