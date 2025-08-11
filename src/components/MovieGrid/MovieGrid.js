import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { fetchMovies } from '../../data/movies';
import './MovieGrid.css';

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  return (
    <section className="movies-section">
      <h2 className="movies-title">Popular</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;