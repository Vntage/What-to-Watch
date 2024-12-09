import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieReview.css';
import * as streamingAvailability from "../index";

const MovieReview = () => {
  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost9000/reviews');
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movieName && review && rating) {
      const newReview = { movieName, review, rating };
      try {
        const response = await axios.post('http://localhost:9000/reviews', newReview);
        setReviews([...reviews, response.data]);
        setMovieName('');
        setReview('');
        setRating(0);
      } catch (err) {
        console.error('Error submitting review:', err);
      }
    } else {
      alert('Please fill in all fields and give a rating!');
    }
  };

  useEffect(() => {
    // Filter movies when the search term changes
    const results = streamingAvailability.searchResult.shows.filter((movie) =>
      movie.title.toLowerCase().includes(movieName.toLowerCase())
    );
    setFilteredMovies(results);
  }, [movieName, streamingAvailability.searchResult.shows]);

  return (
    <div className="movie-review-container">
      <h2>Movie Review and Rating</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Enter movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="Write your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="form-textarea"
        />
        <div className="rating-container">
          <label>Rating: </label>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'selected' : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <button type="submit" className="submit-btn">
          Submit Review
        </button>
      </form>
      <div>
              {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <h3>{movie.title} on IMDB</h3>
              <p><strong>Rating:</strong> {movie.rating}</p>
              <p><strong>Overview:</strong> {movie.overview}</p>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
            </div>
      <div className="reviews-section">
        <h3>All User Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((item, index) => (
            <div key={index} className="review-card">
              <h4>{item.movieName}</h4>
              <p>{item.review}</p>
              <div className="stars">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default MovieReview;
