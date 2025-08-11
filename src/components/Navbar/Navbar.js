import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const genres = [
    'Action', 'Drama', 'Comedy', 'Horror', 'Romance', 
    'Thriller', 'Sci-Fi', 'Fantasy', 'Adventure', 
    'Animation', 'Crime', 'Mystery', 'Documentary'
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleTopImdbClick = () => {
    window.open('https://www.imdb.com/chart/top/', '_blank');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <h1>Amicia</h1>
      </div>
      <form className="search-container" onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search Your Favorite Subtitles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <div className="nav-buttons">
        <button className="nav-button">
          <FontAwesomeIcon icon={faClock} className="nav-icon" /> Latest
        </button>
        <div className="dropdown">
          <button className="nav-button dropdown-toggle">Genre</button>
          <div className="dropdown-content">
            {genres.map((genre) => (
              <button key={genre} className="dropdown-item">{genre}</button>
            ))}
          </div>
        </div>
        <button className="nav-button" onClick={handleTopImdbClick}>
          Top IMDb
        </button>
        <button className="nav-button" onClick={() => setIsModalOpen(true)}>
          Contact Us
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            <h2>Contact Us</h2>
            <form className="contact-form">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;