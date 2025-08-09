import React from 'react';
import './Header.css';
import MovieGrid from '../MovieGrid/MovieGrid';

const Header = () => {
  const scrollToBackground = () => {
    const banner = document.querySelector('.banner-container');
    if (banner) {
      banner.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMovieGrid = () => {
    const movieGrid = document.querySelector('.movies-section');
    if (movieGrid) {
      movieGrid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePartnerClick = () => {
    window.open('https://ldarchive.site', '_blank');
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1></h1>
          <h2 className="subtitle">Temukan Subtitle terbaik untuk Film dan Series favoritmu.</h2>
          <ul className="features-list">
            <li>Easily find and download subtitles for your favorite movies and series.</li>
            <li>Compatible with multiple movie versions.</li>
            <li>Download your subtitle to your personal Drive.</li>
            <li>Get subtitle recommendations based on the movie genres you watch.</li>
            
          </ul>
          <div className="button-group">
            <button className="join-button" onClick={scrollToBackground}>How to Apply Subtitle</button>
            <button className="login-button" onClick={scrollToMovieGrid}>Discover</button>
          </div>
        </div>
      </header>
      <section className="game-section">
        <h2 className="game-title"></h2>
        <p className="game-subtitle">Our Partner</p>
        <button className="play-button" onClick={handlePartnerClick}>
          LDarchive.site
        </button>
      </section>
      <MovieGrid />
      <div className="banner-container">
        <img 
          src="https://cdn.discordapp.com/attachments/1397420970767024168/1403292192671272960/1754639327-picsaygh.jpg?ex=68970532&is=6895b3b2&hm=8b5fb21e6c683adda9ee5bba464ae78971af7e22a11f284e435fc3e215752a97&"
          alt="Banner" 
          className="banner-image" 
        />
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="social">
            <h3>Social</h3>
            <ul>
              <li><a href="#">Discord</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
          <div className="information">
            <h3>Information</h3>
            <ul>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="howlongtobeat">
            <h3>AMICia</h3>
            <p>© 2025 Amicia Web Subtitles. All rights reserved. No part of this website or its content, including subtitles, may be reproduced, distributed, or transmitted in any form without prior written permission from the copyright owner.</p>
            <p>Amicia Web Subtitles® is a registered mark and may only be used with explicit written consent. <a href="#"></a> | <a href="#"></a></p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Header;