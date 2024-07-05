const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

const createBooking = async (req, res) => {
  const { movieId, seats, showtime, totalPrice } = req.body;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) throw new Error('Movie not found');

    // Check if seats are available
    const unavailableSeats = seats.filter(seat => !movie.seats.includes(seat));
    if (unavailableSeats.length > 0) {
      throw new Error('Some seats are unavailable');
    }

    const booking = new Booking({
      user: req.user.id,
      movie: movieId,
      seats,
      showtime,
      totalPrice
    });
    await booking.save();

    // Update movie seats
    movie.seats = movie.seats.filter(seat => !seats.includes(seat));
    await movie.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createBooking };