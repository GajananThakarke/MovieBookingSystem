const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  showtimes: [{ type: String, required: true }],
  seats: { type: Number, required: true, default: 60 }
});

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;