import moment from "moment"
import { validate as uuidValidate} from 'uuid';

export default (bookingRepo) => {

    const listBookings = (_, res) => {
        res.send({
            data: bookingRepo.listBookings()
        })
    }

    const createBooking = (req, res) => {
        const data = req.body

        if (data.rentDate <= moment().format("YYYY-MM-DD") || data.returnDate <= moment().format("YYYY-MM-DD")) {
            return res.status(400).send({
                error: {
                    message: "You can't rent or return a book in the past !"
                }
            })
        }

        const newBooking = bookingRepo.createBooking(data)

        if(newBooking.error) {
            return res.status(400).send({
                error: {
                    message: newBooking.error
                }
            })
        }

        return res.send({
            data: newBooking
        })
    }

    const getBooking = (req, res) => {
        const id = req.params.id;
      
        if (!uuidValidate(id)) {
            return res.status(400).send({
              error: {
                message: `L'ID renseigné n'est pas de type UUID`
              } 
            })      
        }

        const booking = bookingRepo.getBooking(id);

        if (booking) {
            return res.send({
                data: booking
            })
        }

        return res.status(404).send({
            error: {
                message: `The booking with id ${id} wasn't found`
            }
        })
      
    }
    
    const getBookingByUser = (req, res) => {      
        const id = req.params.id;
      
        if (!uuidValidate(id)) {
            return res.status(400).send({
              error: {
                message: `L'ID renseigné n'est pas de type UUID`
              } 
            })      
        }

        const bookings = bookingRepo.getBookingByUser(id)

        if (bookings.error) {
            return res.status(404).send({
                error: {
                    message: bookings.error
                }
            })
        }

        if (bookings.length === 0) {
            return res.status(201).send({
                logInfo: "This user owns 0 booking at the moment"
            })
        }

        return res.send({
            data: bookings
        })
    }

    const getBookingByBook = (req, res) => {
        const isbn = req.params.isbn;

        if (isbn.length != 13) {
            return res.status(400).send({
              error: {
                message: `L'ISBN est incorrect : 13 chiffres attendus`
              }
            });
        }

        const bookings = bookingRepo.getBookingByBook(isbn)

        if (bookings.error) {
            return res.status(404).send({
                error: {
                    message: bookings.error
                }
            })
        }

        if (bookings.length === 0) {
            return res.status(201).send({
                logInfo: "This book is associated to 0 booking at the moment"
            })
        }

        return res.send({
            data: bookings
        })
    }

    const updateBookingReturnDate = (req, res) => {
        const id = req.params.id;
        const data = req.body
      
        if (!uuidValidate(id)) {
            return res.status(400).send({
              error: {
                message: `L'ID renseigné n'est pas de type UUID`
              } 
            })      
        }

        const booking = bookingRepo.updateBookingReturnDate(id, data)

        if(booking.error) {
            return res.status(400).send({
                error: {
                    message: booking.error
                }
            })
        }

        return res.send({
            data: booking
        })
    }

    const deleteBooking = (req, res) => {
        const id = req.params.id

        if (!uuidValidate(id)) {
            return res.status(400).send({
              error: {
                message: `L'ID renseigné n'est pas de type UUID`
              } 
            })      
        }

        const bookingToDelete = bookingRepo.deleteBooking(id)

        if (bookingToDelete) {
            return res.send({
                data: bookingToDelete
            })
        }

        return res.status(404).send({
            error: {
                message: "Unknown booking"
            }
        })

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