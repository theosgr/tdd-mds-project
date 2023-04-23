import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export default (Booking, User, Book) => {

    function formatDate(date) {
        return moment(date).format('YYYY-MM-DD')
    }
    

    let book1 = new Book('3841922148523', 'Les joies du code', 'Informaticien Joyeux', 'Informatique Edition', 'FR', 13.99)
    let book2 = new Book('9121103912341', 'Cherub - Trafic', 'Robert Muchamore', 'Casterman', 'FR', 7.50)
    let book3 = new Book('9121103912111', 'Cherub - Sang pour sang', 'Robert Muchamore', 'Casterman', 'FR', 8.50)
    let book4 = new Book('2090123491234', 'Comment devenir bon sur League of Legends', 'Rick Le Menteur', 'Riot Books', 'US', 43.99)
    
    const books = [
      book1,
      book2,
      book3,
      book4
    ];

    const date1 = formatDate("19991109") 
    const date2 = formatDate("19810125")
    const date3 = formatDate("19830129")

    let user1 = new User('cef5ee37-15de-4039-8d03-8ecc23d98ecc', 'Grollier', 'Theo', date1, '15 rue de la Grande Motte', '0981234321','test@mail.com')
    let user2 = new User('a70f0f97-8ec0-4d66-8bfc-975357f37a1e', 'Dujardin', 'Jean', date2, '15 rue de la Petite Motte', '0921234321','testj@mail.com')
    let user3 = new User('a2e84855-be23-42fc-81ed-83e807198c9c', 'Henry', 'Thierry', date3, '19 boulevard des Anciens', '0712382910', 'lemail@mail.com')

    const users = [
       user1,
       user2,
       user3
    ]

    const rentDate1 = formatDate("20230712")
    const returnDate1 = formatDate("20230725")
    const rentDate2 = formatDate("20230514")
    const returnDate2 = formatDate("20230614")
    const rentDate3 = formatDate("20231023")
    const returnDate3 = formatDate("20231123")
    const rentDate4 = formatDate('20240210')
    const returnDate4 = formatDate('20240210')

    const bookings = [
        new Booking({
            id: '4d834e69-f34b-4be6-b36e-cadf450d499d',
            rentDate: rentDate1,
            returnDate: returnDate1,
            item: book1,
            user: user1
        }),
        new Booking({
            id: '1d5705c0-97e7-4610-9ff3-ff71420f0a42',
            rentDate: rentDate2,
            returnDate: returnDate2,
            item: book2,
            user: user1
        }),
        new Booking({
            id: '98fc10ba-0339-4290-bd24-536a07781141',
            rentDate: rentDate3,
            returnDate: returnDate3,
            item: book3,
            user: user2
        }),
        new Booking({
            id: '92921cad-fda0-4fb7-8fdb-00ea0dcf1ec6',
            rentDate: rentDate4,
            returnDate: returnDate4,
            item: book1,
            user: user2
        })
    ]

    const listBookings = () => {
        return bookings
    }

    const createBooking = (booking) => {

        if(!users.find(user => user.id === booking.user.id)) {
            return {
                error: "Unknown user"
            }
        }

        if(!books.find(book => book.isbn13 === booking.item.isbn13)) {
            return {
                error: "Unknown book"
            }
        }

        if(bookings.find(b => b.item.isbn13 === booking.item.isbn13 
            && b.rentDate <= booking.returnDate
            && b.returnDate >= booking.rentDate)) {
            return {
                error: "The book is already booked"
            }
        }

        if (booking.rentDate >= booking.returnDate) {
            return {
                error: "The rental date can't be equal or after as the returnal date"
            }
        }
        
        const newBooking = new Booking({
            id: uuidv4(),
            rentDate: booking.rentDate,
            returnDate: booking.returnDate,
            item: {
                title: booking.item.title,
                isbn13: booking.item.isbn13,
                authors: booking.item.authors,
                editor: booking.item.editor,
                langCode: booking.item.langCode,
                price: booking.item.price
            },
            user: {
                id: booking.user.id,
                lastName: booking.user.lastName,
                firstName: booking.user.firstName,
                birthDate: booking.user.birthDate,
                address: booking.user.address,
                phone: booking.user.phone,
                email: booking.user.email,
            }
        })
        bookings.push(newBooking)
        return newBooking
    }

    const getBooking = (id) => {
        return bookings.find(b => b.id === id);
    }

    const getBookingByUser = (id) => {
        if(!users.find(user => user.id === id)) {
            return {
                error: "Unknown user"
            }
        }

        return bookings.filter(booking => booking.user.id === id)
    }

    const getBookingByBook = (isbn) => {
        if(!books.find(book => book.isbn13 == isbn)) {
            return {
                error: "Unknown book"
            }
        }

        return bookings.filter(booking => booking.item.isbn13 === isbn)
    }

    const updateBookingReturnDate = (id, booking) => {
        if (booking.rentDate >= booking.returnDate) {
            return {
                error: "The rental date can't be equal or after as the returnal date"
            }
        }

        const updatedBooking = bookings.find(b => b.id === id);
        if (updatedBooking) {
            updatedBooking.returnDate = booking.returnDate;
            return updatedBooking
        }

        return {
            error: "Unknown booking"
        }
    }

    const deleteBooking = (id) => {
        const deletedBooking = bookings.find(b => b.id === id)
        if (deletedBooking) {
            bookings.splice(bookings.indexOf(deletedBooking), 1)
            return deletedBooking
        }
        return null
    }


    return {
        listBookings,
        createBooking,
        getBooking,
        getBookingByUser,
        getBookingByBook,
        updateBookingReturnDate,
        deleteBooking
    }

}