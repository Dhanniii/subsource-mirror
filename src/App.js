import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/search/Search';
import './styles/global.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Header />
          </>
        } />
        <Route path="/movie/:movieSlug" element={<MovieDetail />} />
        <Route path="/movie/:seriesSlug/:season" element={<MovieDetail />} />
        <Route path="/series/:seriesSlug/:season" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;