import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SeatSelection = () => {
  const { movieId, showtime } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`/api/movies/${movieId}`);
      setMovie(response.data);
    };

    fetchMovie();
  }, [movieId]);

  const handleSeatClick = seat => {
    setSelectedSeats(prev => (
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    ));
  };

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const response = await axios.post('/api/bookings', {
        movieId,
        seats: selectedSeats,
        showtime,
        totalPrice: selectedSeats.length * 10 // Assume each ticket is $10
      }, config);

      navigate(`/confirmation/${response.data._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{showtime}</p>
      <div>
        {Array.from({ length: 60 }).map((_, index) => (
          <button
            key={index}
            disabled={movie.seats.includes(index)}
            className={selectedSeats.includes(index) ? 'selected' : ''}
            onClick={() => handleSeatClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button onClick={handleBooking}>Book Seats</button>
    </div>
  );
};

export default SeatSelection;