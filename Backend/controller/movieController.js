const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  const { title, genre, showtimes, seats } = req.body;
  try {
    const movie = new Movie({ title, genre, showtimes, seats });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getMovies, createMovie };