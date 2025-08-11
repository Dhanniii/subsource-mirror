import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import MovieCard from '../../components/MovieCard/MovieCard';
import { searchMovies } from '../../data/movies';
import './Search.css';

const Search = () => {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchMovies(q);
        if (alive) setResults(data);
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => { alive = false; };
  }, [q]);

  return (
    <div className="search-page">
      <Navbar />
      <div className="search-container">
        <h2 className="search-title">Search results for "{q}"</h2>
        
        {loading && (
          <div className="search-loading">
            🔍 Searching for movies...
          </div>
        )}
        
        {!loading && !results.length && q.trim() && (
          <div className="search-no-results">
            😔 No movies found for "{q}". Try a different search term.
          </div>
        )}
        
        {!loading && !!results.length && (
          <>
            <div className="search-results-count">
              Found {results.length} movie{results.length !== 1 ? 's' : ''}
            </div>
            <div className="movies-grid">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;