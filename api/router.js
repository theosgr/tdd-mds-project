
export default (controlers, app) => {
  app.get('/statusCheck', controlers.statusCheck.getStatus);
  app.get('/books', controlers.bookCtrl.listBooks);
  app.post('/books', controlers.bookCtrl.createBook);
  app.get('/books/:id', controlers.bookCtrl.getBook);
  app.put('/books/:id', controlers.bookCtrl.updateBook);
  app.delete('/books/:id', controlers.bookCtrl.deleteBook);

  app.get('/users', controlers.userCtrl.listUsers);
  app.post('/users', controlers.userCtrl.createUser);
  app.put('/users/:id', controlers.userCtrl.updateUser);
  app.get('/users/:id', controlers.userCtrl.getUser);
  app.delete('/users/:id', controlers.userCtrl.deleteUser);

  app.get('/bookings', controlers.bookingCtrl.listBookings);
  app.post('/bookings', controlers.bookingCtrl.createBooking);
  app.get('/bookings/:id', controlers.bookingCtrl.getBooking);
  app.get('/bookings/users/:id', controlers.bookingCtrl.getBookingByUser);
  app.get('/bookings/items/:isbn', controlers.bookingCtrl.getBookingByBook);
  app.put('/bookings/:id', controlers.bookingCtrl.updateBookingReturnDate);
  app.delete('/bookings/:id', controlers.bookingCtrl.deleteBooking);
}
