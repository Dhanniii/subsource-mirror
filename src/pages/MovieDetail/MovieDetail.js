import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import movies from '../../data/movies';
import './MovieDetail.css';

const MovieDetail = () => {
  const { movieId } = useParams();
  const movie = movies.find(m => m.id === movieId);

  if (!movie) {
    return (
      <div className="detail-page">
        <Navbar />
        <div className="detail-container">
          <h2>Movie not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Navbar />
      <div className="detail-container">
        <div className="detail-content-wrap">
          <div className="detail-info-section">
            <div className="detail-poster-container">
              <img
                src={movie.poster}
                alt={movie.title}
                className="detail-poster-image"
              />
            </div>
            <div className="detail-content">
              <h1 className="detail-title">{movie.title}</h1>
              <div className="detail-meta">
                <span className="detail-year">{movie.year}</span>
                <span className="detail-separator">•</span>
                <span className="detail-genres">{movie.genres.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Subtitle Table Section */}
          <div className="detail-subtitle-section">
            <h2 className="detail-subtitle-header">Available Subtitles</h2>
            <table className="detail-subtitle-table">
              <thead>
                <tr>
                  <th className="detail-table-header">Language</th>
                  <th className="detail-table-header">Release Name</th>
                  <th className="detail-table-header">H.L.</th>
                  <th className="detail-table-header">Type</th>
                  <th className="detail-table-header">Owner</th>
                  <th className="detail-table-header">Caption</th>
                </tr>
              </thead>
              <tbody>
                <tr className="detail-table-row">
                  <td className="detail-table-cell">
                    <span className="language-tag">✅</span> Arabic
                  </td>
                  <td className="detail-table-cell">{movie.title}.2025.WEB.H264-RBB</td>
                  <td className="detail-table-cell">WEB</td>
                  <td className="detail-table-cell">1</td>
                  <td className="detail-table-cell">ali talal</td>
                  <td className="detail-table-cell">⬛ 🟡 AMZN 2:13:38 🔴 ⬛</td>
                </tr>
                <tr className="detail-table-row">
                  <td className="detail-table-cell">
                    <span className="language-tag">✅</span> Arabic
                  </td>
                  <td className="detail-table-cell">{movie.title}.2025.720p.WEBRip.x264.AAC-[YTS.MX]</td>
                  <td className="detail-table-cell">WEB</td>
                  <td className="detail-table-cell">1</td>
                  <td className="detail-table-cell">muhamed.alnuaimi</td>
                  <td className="detail-table-cell">❤️ ♣️ WEB ♣️ ❤️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;