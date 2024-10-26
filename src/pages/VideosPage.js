import React from 'react';
import './VideosPage.css';
import VideosCategories from '../components/VideosCategories';
import VideosSection from '../components/VideosSection';

function VideosPage() {
    return (
        <div className="videos-container">
            <VideosCategories />
            <VideosSection />
        </div>
    );
}

export default VideosPage;
