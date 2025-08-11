import { API_URL } from '../utils/constants';

// Normalisasi data movie untuk UI
const transformMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  year: movie.releaseYear?.toString?.() || movie.release_year?.toString?.() || '',
  poster: movie.poster,
  subtitles: movie.subtitles,
  downloads: movie.total_downloads,
  totalSubtitles: movie.total_subtitles || movie.subtitleCount,
  link: movie.link,
  genres: movie.genres || [],
  country: movie.country || ''
});

// Normalisasi data series untuk UI
const transformSeries = (series) => ({
  id: series.id,
  title: series.full_name,
  year: series.release_year?.toString?.() || '',
  poster: series.poster,
  subtitles: series.subtitles,
  downloads: series.total_downloads,
  totalSubtitles: series.total_subtitles,
  link: series.link,
  genres: series.genres || [],
  country: series.country || ''
});

// Transform subtitle data
const transformSubtitle = (subtitle) => ({
  id: subtitle.id,
  language: subtitle.language,
  caption: "Unknown", // Always set to "Unknown"
  releaseInfo: subtitle.release_info || "Unknown",
  hearingImpaired: subtitle.hearing_impaired,
  rating: subtitle.rating || "unrated",
  releaseType: subtitle.release_type || "Other",
  uploaderDisplayname: subtitle.uploader_displayname || "Unknown",
  uploadDate: subtitle.upload_date,
  link: subtitle.link
});

// Helper function to convert movie title to URL slug
const movieTitleToSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// Ambil daftar movie dan series (home)
const fetchMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/home`);
    const data = await response.json();
    
    // Ambil movies dan series
    const movies = (data.movies || []).map(transformMovie);
    const series = (data.series || []).map(transformSeries);
    
    // Gabungkan keduanya
    return [...movies, ...series];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Search movie ke API Flask
const searchMovies = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    const items = data.movies || data.results || [];
    return items.map(transformMovie);
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// Fetch movie detail with subtitles
const fetchMovieDetail = async (movieSlug) => {
  try {
    const response = await fetch(`${API_URL}/subtitles/${movieSlug}`);
    const data = await response.json();
    
    if (data.movie) {
      const transformedMovie = {
        id: data.movie.id,
        title: data.movie.title,
        year: data.movie.release_year?.toString?.() || '',
        poster: data.movie.poster,
        genres: data.movie.source_data?.genres || [],
        rating: data.movie.source_data?.rating || 0,
        votes: data.movie.source_data?.votes || 0,
        imdbLink: data.movie.source_data?.link || '',
        type: data.movie.type || 'movie',
        mediaType: data.media_type || 'movie'
      };

      const transformedSubtitles = (data.subtitles || []).map(transformSubtitle);

      return {
        movie: transformedMovie,
        subtitles: transformedSubtitles
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching movie detail:', error);
    return null;
  }
};

// Fetch series detail with subtitles
const fetchSeriesDetail = async (seriesSlug, season) => {
  try {
    const response = await fetch(`${API_URL}/subtitles/${seriesSlug}/${season}`);
    const data = await response.json();
    
    if (data.movie) {
      const transformedSeries = {
        id: data.movie.id,
        title: data.movie.title,
        year: data.movie.release_year?.toString?.() || '',
        poster: data.movie.poster,
        genres: data.movie.source_data?.genres || [],
        rating: data.movie.source_data?.rating || 0,
        votes: data.movie.source_data?.votes || 0,
        imdbLink: data.movie.source_data?.link || '',
        type: 'series',
        season: season,
        mediaType: data.media_type || 'series'
      };

      const transformedSubtitles = (data.subtitles || []).map(transformSubtitle);

      return {
        movie: transformedSeries,
        subtitles: transformedSubtitles
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching series detail:', error);
    return null;
  }
};

export { fetchMovies, searchMovies, fetchMovieDetail, fetchSeriesDetail, movieTitleToSlug };