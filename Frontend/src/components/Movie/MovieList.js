import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <p>{movie.genre}</p>
            <Link to={`/movies/${movie._id}`}>View Showtimes</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;