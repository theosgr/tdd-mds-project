export default (bookingRepo) => {

    const listBookings = (_, res) => {
        res.send({
            data: bookingRepo.listBookings()
        })
    }

    const createBooking = (req, res) => {
        const data = req.body
        
        if (data.rentDate <= Date.now()) {
            return res.status(400).send({
                error: "You can't rent a book in the past !"
            })
        }

        const newBooking = bookingRepo.createBooking(data)

        if(newBooking.error) {
            return res.status(400).send({
                error: newBooking.error
            })
        }

        return res.send({
            data: newBooking
        })
    }

    return {
        listBookings,
        createBooking
    }
}