const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  seats: { type: [Number], required: true },
  showtime: { type: String, required: true },
  totalPrice: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;