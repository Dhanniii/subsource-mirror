import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import movies from '../../data/movies';
import './MovieGrid.css';

const MovieGrid = () => (
  <section className="movies-section">
    <h2 className="movies-title">Popular</h2>
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </section>
);

export default MovieGrid;