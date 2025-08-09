import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {  // Changed from { movies } to { movie }
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <div className="movie-overlay">
          <h2 className="movie-title">{movie.title}</h2>
        </div>
      </div>
      <div className="movie-info">
        <div className="movie-meta">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.country}</span>
        </div>
        <div className="movie-genres">
          {movie.genres && movie.genres.map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;