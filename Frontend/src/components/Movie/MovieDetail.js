import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtime, setShowtime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`/api/movies/${id}`);
      setMovie(response.data);
    };

    fetchMovie();
  }, [id]);

  const handleShowtimeChange = e => {
    setShowtime(e.target.value);
  };

  const handleSelectShowtime = () => {
    navigate(`/book/${id}/${showtime}`);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.genre}</p>
      <select onChange={handleShowtimeChange} value={showtime}>
        <option value="" disabled>Select Showtime</option>
        {movie.showtimes.map(time => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>
      <button onClick={handleSelectShowtime}>Select Showtime</button>
    </div>
  );
};

export default MovieDetail;