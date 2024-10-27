import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VideosPage from './pages/VideosPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import VideoDetailPage from './pages/VideoDetailPage'
import UploadVideoPage from "./pages/UploadVideoPage";

function App() {
  return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
              <Route path="/upload" element={<UploadVideoPage />} />
              <Route path="/video/:videoId" element={<VideoDetailPage />} />

          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
