import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { fetchMovieDetail } from '../../data/movies';
import { API_URL } from '../../utils/constants';
import './MovieDetail.css';

const MovieDetail = () => {
  const { movieSlug, seriesSlug, season } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine if this is a series or movie
  const isSeriesPage = Boolean(season); // If season exists, it's a series
  const slug = isSeriesPage ? (seriesSlug || movieSlug) : movieSlug;
  
  // For download, we need the full slug including season for series
  const downloadSlug = isSeriesPage ? `${slug}-${season}` : slug;

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data;
        if (isSeriesPage) {
          // For fetching detail, use the original slug structure
          data = await fetchMovieDetail(`${slug}/${season}`);
        } else {
          data = await fetchMovieDetail(slug);
        }
        
        if (data) {
          setMovieData(data);
        } else {
          setError(isSeriesPage ? 'Series not found' : 'Movie not found');
        }
      } catch (err) {
        setError(isSeriesPage ? 'Failed to load series details' : 'Failed to load movie details');
        console.error('Error fetching detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getDetail();
    }
  }, [movieSlug, seriesSlug, season, isSeriesPage, slug]);

  const handleDownload = async (language, subtitleId) => {
    try {
      console.log('Download params:', {
        downloadSlug,
        language,
        subtitleId,
        isSeriesPage,
        season
      });
      
      // Step 1: Get the download token using the correct slug format
      const tokenResponse = await fetch(`${API_URL}/subtitle/${downloadSlug}/${language}/${subtitleId}`);
      
      if (!tokenResponse.ok) {
        throw new Error(`Failed to get download token: ${tokenResponse.status}`);
      }
      
      const tokenData = await tokenResponse.json();
      console.log('Token data:', tokenData);
      
      if (tokenData.status === 'available' && tokenData.download_token) {
        // Step 2: Use the token to download the subtitle
        const downloadUrl = `${API_URL}/subtitle/download/${tokenData.download_token}`;
        console.log('Download URL:', downloadUrl);
        
        // Create download link
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = tokenData.file_name || `subtitle-${subtitleId}.srt`;
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          try {
            document.body.removeChild(link);
          } catch (cleanupError) {
            console.warn('Cleanup error (non-critical):', cleanupError);
          }
        }, 100);
        
        console.log('Download initiated successfully');
        
      } else {
        console.error('Token data:', tokenData);
        alert('Subtitle tidak tersedia untuk didownload');
      }
    } catch (error) {
      console.error('Error downloading subtitle:', error);
      
      if (error.message.includes('Failed to get download token')) {
        alert('Gagal mendapatkan token download. Silakan coba lagi.');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Masalah koneksi. Silakan periksa internet Anda.');
      } else {
        alert('Gagal mendownload subtitle. Silakan coba lagi.');
      }
    }
  };

  if (loading) {
    return (
      <div className="detail-page">
        <Navbar />
        <div className="detail-container">
          <div className="loading-message">Loading movie details...</div>
        </div>
      </div>
    );
  }

  if (error || !movieData) {
    return (
      <div className="detail-page">
        <Navbar />
        <div className="detail-container">
          <div className="error-message">
            <h2>{error || 'Movie not found'}</h2>
            <p>The movie you're looking for could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  const { movie, subtitles } = movieData;

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
                {movie.rating > 0 && (
                  <>
                    <span className="detail-separator">•</span>
                    <span className="detail-rating">⭐ {movie.rating}</span>
                  </>
                )}
                {movie.votes > 0 && (
                  <span className="detail-votes">({movie.votes} votes)</span>
                )}
              </div>
              {movie.genres && movie.genres.length > 0 && (
                <div className="detail-genres">
                  {movie.genres.map((genre, index) => (
                    <span key={index} className="genre-tag">{genre}</span>
                  ))}
                </div>
              )}
              {movie.imdbLink && (
                <div className="detail-links">
                  <a 
                    href={movie.imdbLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="imdb-link"
                  >
                    View on IMDb
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Subtitle Table Section */}
          <div className="detail-subtitle-section">
            <h2 className="detail-subtitle-header">
              Available Subtitles ({subtitles.length})
            </h2>
            
            {subtitles.length === 0 ? (
              <div className="no-subtitles">
                <p>No subtitles available for this movie.</p>
              </div>
            ) : (
              <table className="detail-subtitle-table">
                <thead>
                  <tr>
                    <th className="detail-table-header">Language</th>
                    <th className="detail-table-header">Release Info</th>
                    <th className="detail-table-header">H.I.</th>
                    <th className="detail-table-header">Rating</th>
                    <th className="detail-table-header">Uploader</th>
                    <th className="detail-table-header">Caption</th>
                    <th className="detail-table-header">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subtitles.map((subtitle, index) => (
                    <tr 
                      key={`${subtitle.id}-${index}`}
                      className="detail-table-row"
                    >
                      <td className="detail-table-cell">
                        <span className="language-tag">
                          {subtitle.language === 'bengali' ? '🇧🇩' : '🌐'}
                        </span>
                        {' '}
                        {subtitle.language ? 
                          subtitle.language.charAt(0).toUpperCase() + subtitle.language.slice(1) 
                          : 'Unknown'
                        }
                      </td>
                      <td className="detail-table-cell">
                        {subtitle.releaseInfo}
                      </td>
                      <td className="detail-table-cell">
                        {subtitle.hearingImpaired ? 'Yes' : 'No'}
                      </td>
                      <td className="detail-table-cell">
                        {subtitle.rating}
                      </td>
                      <td className="detail-table-cell">
                        {subtitle.uploaderDisplayname}
                      </td>
                      <td className="detail-table-cell">
                        Unknown
                      </td>
                      <td className="detail-table-cell">
                        <button 
                          className="download-button"
                          onClick={() => handleDownload(subtitle.language, subtitle.id)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;