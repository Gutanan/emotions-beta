import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VideosSection.css";

function VideoSection() {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Načtení videí z lokálního JSON souboru
        const fetchVideos = async () => {
            try {
                const response = await fetch('/videos.json'); // Cesta k JSON souboru v public složce
                const jsonData = await response.json();
                setVideos(jsonData.videos); // Uložení pole `videos` z JSON do stavu
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchVideos();
    }, []);

    const handleAnalyze = (videoId) => {
        navigate(`/video/${videoId}`);
    };

    return (
        <div className="videos-section">
            {videos.length > 0 ? (
                videos.map((video) => (
                    <div className="video" key={video.id}>
                        <iframe
                            title={video.name}
                            src={video.link}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            frameBorder="0"
                        />
                        <button className="analyze-button" onClick={() => handleAnalyze(video.id)}>Analyze!</button>
                    </div>
                ))
            ) : (
                <p>Loading videos...</p>
            )}
        </div>
    );
}

export default VideoSection;
