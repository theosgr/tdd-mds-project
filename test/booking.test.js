import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';
import moment from 'moment';

chai.use(chaiHttp);

const date1 = formatDate("19991109") 
const date2 = formatDate("19810125")


const rentDate1 = formatDate("20230712")
const returnDate1 = formatDate("20230725")
const rentDate2 = formatDate("20230514")
const returnDate2 = formatDate("20230614")
const rentDate3 = formatDate("20231023")
const returnDate3 = formatDate("20231123")
const rentDate4 = formatDate('20240210')
const returnDate4 = formatDate('20240210')

function formatDate(date) {
    return moment(date).format('YYYY-MM-DD')
}

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
                            title: "Cherub - Sang pour sang",
                            isbn13: "9121103912111",
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
                    },
                    {
                        id: '92921cad-fda0-4fb7-8fdb-00ea0dcf1ec6',
                        rentDate: rentDate4,
                        returnDate: returnDate4,
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
                    }
                ]
            })
            done()
        })
    })
    it('POST /bookings should return a success response with the book created', function (done) {
        const rentDate = formatDate("20230815")
        const returnDate = formatDate("20230826")
        chai.request(api)
        .post('/bookings')
        .send({
            rentDate: rentDate,
            returnDate: returnDate,
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
        })
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(200);
            chai.expect(res.body.data).to.have.property('id');
            chai.expect(res.body.data).to.deep.include({
                rentDate: rentDate,
                returnDate: returnDate,
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
            });
            done();
        });
    })
    it('POST /bookings should return an error if the book is unknown', function (done) {
        const rentDate = formatDate("20240315")
        const returnDate = formatDate("20240329")
        chai.request(api)
        .post('/bookings')
        .send({
            rentDate: rentDate,
            returnDate: returnDate,
            item: {
                title: "Cherub - Sang pour Sang",
                isbn13: "1239",
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
            chai.expect(res.body).to.deep.include({
                error: {
                    message: 'Unknown book'
                }
            });
            done();
        });
    })
    it('POST /bookings should return an error if the user is unknown', function (done) {
        const rentDate = formatDate("20240315")
        const returnDate = formatDate("20240329")
        chai.request(api)
        .post('/bookings')
        .send({
            rentDate: rentDate,
            returnDate: returnDate,
            item: {
                title: "Cherub - Sang pour Sang",
                isbn13: "9121103912111",
                authors: "Robert Muchamore",
                editor: "Casterman",
                langCode: "FR",
                price: 8.50
            },
            user: {
                id: '058dd7ed-1b72-427b-bbac-d597e11d51ef',
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
            chai.expect(res.body).to.deep.include({
                error: {
                    message: 'Unknown user'
                }
            });
            done();
        });
    })
    it('POST /bookings should return an error if the book is already booked', function (done) {
        const rentDate = formatDate("20231025")
        const returnDate = formatDate("20231030")
        chai.request(api)
        .post('/bookings')
        .send({
            rentDate: rentDate,
            returnDate: returnDate,
            item: {
                title: "Cherub - Sang pour Sang",
                isbn13: "9121103912111",
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
            chai.expect(res.body).to.deep.include({
                error: {
                    message: 'The book is already booked'
                }
            });
            done();
        });
    })
    it('POST /bookings should return an error if the rent date is after the return date', function (done) {
        const rentDate = formatDate("20240329")
        const returnDate = formatDate("20240315")
        chai.request(api)
        .post('/bookings')
        .send({
            rentDate: rentDate,
            returnDate: returnDate,
            item: {
                title: "Cherub - Sang pour Sang",
                isbn13: "9121103912111",
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
            chai.expect(res.body).to.deep.include({
                error: {
                    message: "The rental date can't be equal or after as the returnal date"
                }
            });
            done();
        });
    })
    it('POST /bookings should return an error if the rental or returnal date is before today', function (done) {
        const rentDate = formatDate("20230123")
        const returnDate = formatDate("20230523")
        chai.request(api)
        .post('/bookings')
        .send({
            rentDate: rentDate,
            returnDate: returnDate,
            item: {
                title: "Cherub - Sang pour Sang",
                isbn13: "9121103912111",
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
            chai.expect(res.body).to.deep.include({
                error: {
                    message:"You can't rent or return a book in the past !"
                }
            });
            done();
        });
    })
    it('GET /bookings/:id should return a success response with the booking', function (done) {
        chai.request(api)
        .get('/bookings/4d834e69-f34b-4be6-b36e-cadf450d499d')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(200);
            chai.expect(res.body).to.deep.equal({
                data: {
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
                }
            })
            done();
        });
    })
    it('GET /bookings/:id should return a 404 if booking not found', function (done) {
        chai.request(api)
        .get('/bookings/907ac6b3-033a-4685-831a-e811e200273a')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(404);
            chai.expect(res.body).to.deep.equal({
                error: {
                    message: "The booking with id 907ac6b3-033a-4685-831a-e811e200273a wasn't found"
                }
            })
            done();
        });
    })
    it('GET /bookings/:id should return a 400 if uuid not correct', function (done) {
        chai.request(api)
        .get('/bookings/baduuid')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(400);
            chai.expect(res.body).to.deep.equal({
                error: {
                    message: "L'ID renseigné n'est pas de type UUID"
                }
            })
            done();
        });
    })
    it('GET /bookings/users/:id should return a successful response with bookings associated to the user', function (done) {
        chai.request(api)
        .get('/bookings/users/cef5ee37-15de-4039-8d03-8ecc23d98ecc')
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
                    }
                ]
            })
            done();
        });
    })
    it('GET /bookings/users/:id should return a 201 and a message if 0 booking', function (done) {
        chai.request(api)
        .get('/bookings/users/a2e84855-be23-42fc-81ed-83e807198c9c')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(201);
            chai.expect(res.body).to.deep.equal({
                logInfo: "This user owns 0 booking at the moment"
            })
            done();
        });
    })
    it('GET /bookings/users/:id should return an error if the user doesnt exist', function (done) {
        chai.request(api)
        .get('/bookings/users/69d9d321-645e-44b4-a888-65b1b840cbb6')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(404);
            chai.expect(res.body).to.deep.equal({
                error: {
                    message: 'Unknown user'
                }
            })
            done();
        });
    })
    it('GET /bookings/users/:id should return an error if bad uuid', function (done) {
        chai.request(api)
        .get('/bookings/users/baduuid')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(400);
            chai.expect(res.body).to.deep.equal({
                error: {
                    message: "L'ID renseigné n'est pas de type UUID"
                }
            })
            done();
        });
    })
    it('GET /bookings/items/:isbn should return a successful response with bookings associated to the book', function (done) {
        chai.request(api)
        .get('/bookings/items/3841922148523')
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
                        id: '92921cad-fda0-4fb7-8fdb-00ea0dcf1ec6',
                        rentDate: rentDate4,
                        returnDate: returnDate4,
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
                    }
                ]
            })
            done();
        });
    })
    it('GET /bookings/items/:isbn should return a 201 and a message if 0 booking', function (done) {
        chai.request(api)
        .get('/bookings/items/2090123491234')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(201);
            chai.expect(res.body).to.deep.equal({
                logInfo: "This book is associated to 0 booking at the moment"
            })
            done();
        });
    })
    it('GET /bookings/items/:isbn should return an error if the book doesnt exist', function (done) {
        chai.request(api)
        .get('/bookings/items/9993339991113')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(404);
            chai.expect(res.body).to.deep.equal({
                error: {
                    message: 'Unknown book'
                }
            })
            done();
        });
    })
    it('GET /bookings/items/:isbn should return an error if bad isbn', function (done) {
        chai.request(api)
        .get('/bookings/items/badisbn')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(400);
            chai.expect(res.body).to.deep.equal({
                error: {
                    message: `L'ISBN est incorrect : 13 chiffres attendus`
                }
            })
            done();
        });
    })
    it('PUT /bookings/:id should return succesful response and the booking with return date update', function (done) {
        const newDateReturn = formatDate("20231125")
        const booking = {
            id: '98fc10ba-0339-4290-bd24-536a07781141',
            rentDate: rentDate3,
            returnDate: returnDate3,
            item: {
                title: "Cherub - Sang pour sang",
                isbn13: "9121103912111",
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
        }

        booking.returnDate = newDateReturn

        chai.request(api)
            .put('/bookings/98fc10ba-0339-4290-bd24-536a07781141')
            .send(booking)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200)
                chai.expect(res.body).to.deep.equal({
                    data: {
                        id: '98fc10ba-0339-4290-bd24-536a07781141',
                        rentDate: rentDate3,
                        returnDate: newDateReturn,
                        item: {
                        title: "Cherub - Sang pour sang",
                        isbn13: "9121103912111",
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
                    }
                })
                done()
            })
    })
    it('PUT /bookings/:id should return an error 400 bad return date ', function (done) {
        const newDateReturn = formatDate("20230912")
        const booking = {
            id: '98fc10ba-0339-4290-bd24-536a07781141',
            rentDate: rentDate3,
            returnDate: returnDate3,
            item: {
                title: "Cherub - Sang pour sang",
                isbn13: "9121103912111",
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
        }

        booking.returnDate = newDateReturn

        chai.request(api)
            .put('/bookings/98fc10ba-0339-4290-bd24-536a07781141')
            .send(booking)
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(400)
                chai.expect(res.body).to.deep.equal({
                    error: {
                        message: "The rental date can't be equal or after as the returnal date"
                    }
                })
                done()
            })
    })
    it('PUT /bookings/:id should return an error if bad uuid', function (done) {
        const booking = {
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
        }
        chai.request(api)
        .put('/bookings/baduuid')
        .send(booking)
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(400);
            chai.expect(res.body).to.deep.equal({
                error: {
                    message: "L'ID renseigné n'est pas de type UUID"
                }
            })
            done();
        });
    })
    it('PUT /bookings/:id should return an error unknown booking', function (done) {
        const booking = {
            id: '06bdf47e-352a-49ab-bd96-bf49594cced6',
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
        }
        chai.request(api)
        .put('/bookings/06bdf47e-352a-49ab-bd96-bf49594cced6')
        .send(booking)
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(400);
            chai.expect(res.body).to.deep.equal({
                error: {
                    message: "Unknown booking"
                }
            })
            done();
        });
    })
    it('DELETE /bookings/:id should return a success response and the booking deleted', function (done) {
        chai.request(api)
            .delete('/bookings/1d5705c0-97e7-4610-9ff3-ff71420f0a42')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: {
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
                    }

                });
                done();
            })
        })
    it('DELETE /bookings/:id should return an error if the booking doesnt exist', function (done) {
        chai.request(api)
            .delete('/bookings/04f80008-4f1c-4dc6-a65a-eaaff5f13b48')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(404);
                chai.expect(res.body).to.deep.equal({
                    error: {
                        message: "Unknown booking"
                    }
                });
                done();
            })
        })
        it('DELETE /bookings/:id should return an error if bad uuid', function (done) {
            chai.request(api)
                .delete('/bookings/baduuid')
                .end((_, res) => {
                    chai.expect(res.statusCode).to.equal(400);
                    chai.expect(res.body).to.deep.equal({
                        error: {
                            message: "L'ID renseigné n'est pas de type UUID"
                        }
                    });
                    done();
                })
        })
})