import React from "react";
import "./VideosCategories.css"

function VideoCategories() {
    return (
        <div className="categories-buttons">
            <button className="category-button">All</button>
            <button className="category-button">Fun</button>
            <button className="category-button">Ads</button>
            <button className="category-button">Streams</button>
            <button className="category-button">Trailers</button>
            <button className="category-button">Games</button>
        </div>
    );
}

export default VideoCategories;