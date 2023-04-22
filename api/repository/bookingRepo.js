import { v4 as uuidv4 } from 'uuid';

export default (Booking, User, Book) => {
    let book1 = new Book('3841922148523', 'Les joies du code', 'Informaticien Joyeux', 'Informatique Edition', 'FR', 13.99)
    let book2 = new Book('9121103912341', 'Cherub - Trafic', 'Robert Muchamore', 'Casterman', 'FR', 7.50)
    
    const books = [
      book1,
      book2
    ];

    let date1 = new Date('November 09, 1999')
    date1 = date1.toISOString().slice(0, 10);
    let date2 = new Date('January 25, 1981')
    date2 = date2.toISOString().slice(0, 10);

    let user1 = new User('cef5ee37-15de-4039-8d03-8ecc23d98ecc', 'Grollier', 'Theo', date1, '15 rue de la Grande Motte', '0981234321','test@mail.com')
    let user2 = new User('a70f0f97-8ec0-4d66-8bfc-975357f37a1e', 'Dujardin', 'Jean', date2, '15 rue de la Petite Motte', '0921234321','testj@mail.com')

    const users = [
       user1,
       user2
    ]

    const rentDate1 = new Date('July 12, 2023').toISOString().slice(0, 10); 
    const returnDate1 = new Date('July 25, 2023').toISOString().slice(0, 10); 
    const rentDate2 = new Date('May 14, 2023').toISOString().slice(0, 10); 
    const returnDate2 = new Date('June 14, 2023').toISOString().slice(0, 10); 
    const rentDate3 = new Date('October 23, 2023').toISOString().slice(0, 10); 
    const returnDate3 = new Date('November 23, 2023').toISOString().slice(0, 10); 

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
            item: book2,
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


    return {
        listBookings,
        createBooking
    }

}