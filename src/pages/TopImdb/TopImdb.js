import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './TopImdb.css';

const TopImdb = () => {
  return (
    <div className="topimdb-page">
      <Navbar />
      <div className="topimdb-container">
        <h1 className="topimdb-title">Top IMDb Movies</h1>
        {/* Add your top IMDb content here */}
      </div>
    </div>
  );
};

export default TopImdb;