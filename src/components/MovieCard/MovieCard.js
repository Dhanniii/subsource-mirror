import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const createMovieSlug = (movie) => {
    // If movie has a link field, extract just the movie identifier
    if (movie.link) {
      let slug = movie.link;
      // Remove any leading slashes and path prefixes
      slug = slug.replace(/^\/+/, ''); // Remove leading slashes
      slug = slug.replace(/^(series|movie|subtitles)\/+/, ''); // Remove path prefixes
      return slug;
    }
    
    // Fallback: create from title and year
    let slug = movie.title
      .toLowerCase()
      .replace(/\([^)]*\)/g, '') // Remove anything in parentheses
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .trim();
    
    // Add year from title if it contains year in parentheses
    const yearMatch = movie.title.match(/\((\d{4})\)/);
    if (yearMatch) {
      slug += `-${yearMatch[1]}`;
    } else if (movie.year) {
      slug += `-${movie.year}`;
    }
    
    return slug;
  };

  const handleClick = () => {
    if (movie.type === 'series') {
      // For series, parse the link to get series name and season
      if (movie.link) {
        let slug = movie.link;
        // Remove leading slashes and subtitles prefix
        slug = slug.replace(/^\/+/, '');
        slug = slug.replace(/^subtitles\/+/, '');
        
        // Split by / to get series name and season
        const parts = slug.split('/');
        const seriesName = parts[0];
        const season = parts[1] || 'season-1';
        
        navigate(`/series/${seriesName}/${season}`);
      } else {
        // Fallback if no link
        const movieSlug = createMovieSlug(movie);
        navigate(`/series/${movieSlug}/season-1`);
      }
    } else {
      const movieSlug = createMovieSlug(movie);
      navigate(`/movie/${movieSlug}`);
    }
  };

  // Tambahkan error handling untuk gambar
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = '/placeholder.jpg'; // Ganti dengan default image/placeholder
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          loading="lazy"
          onError={handleImageError} // Tambahkan error handler
        />
        <div className="movie-overlay">
          <h2 className="movie-title">{movie.title}</h2>
        </div>
      </div>
      <div className="movie-info">
        <div className="movie-meta">
          {movie.year && <span>{movie.year}</span>}
          {movie.year && movie.country && <span>•</span>}
          {movie.country && <span>{movie.country}</span>}
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