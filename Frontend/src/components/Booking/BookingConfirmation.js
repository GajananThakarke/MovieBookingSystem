import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await axios.get(`/api/bookings/${bookingId}`);
      setBooking(response.data);
    };

    fetchBooking();
  }, [bookingId]);

  if (!booking) return <div>Loading...</div>;

  return (
    <div>
      <h1>Booking Confirmation</h1>
      <p>Movie: {booking.movie.title}</p>
      <p>Showtime: {booking.showtime}</p>
      <p>Seats: {booking.seats.join(', ')}</p>
      <p>Total Price: ${booking.totalPrice}</p>
    </div>
  );
};

export default BookingConfirmation;