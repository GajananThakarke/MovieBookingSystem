import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import MovieList from './components/Movie/MovieList';
import MovieDetail from './components/Movie/MovieDetail';
import SeatSelection from './components/Booking/SeatSelection';
import BookingConfirmation from './components/Booking/BookingConfirmation';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/book/:movieId/:showtime" element={<SeatSelection />} />
          <Route path="/confirmation/:bookingId" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;