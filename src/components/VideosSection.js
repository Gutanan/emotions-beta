import React from "react";
import { useNavigate } from "react-router-dom";
import "./VideosSection.css";

function VideoSection() {
    const navigate = useNavigate();

    const videos = [
        { id: '1', src: 'https://www.youtube.com/embed/qMldEs0rf8o?si=XkzHwTv09vUG5bvW' },
        { id: '2', src: 'https://www.youtube.com/embed/HxXv6k49BNk?si=a8uLb171TZbE9Hzk' }
    ];

    const handleAnalyze = (videoId) => {
        navigate(`/video/${videoId}`);
    };

    return (
        <div className="videos-section">
            {videos.map(video => (
                <div className="video" key={video.id}>
                    <iframe
                        title="video"
                        src={video.src}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                        />
                    <button className="analyze-button" onClick={() => handleAnalyze(video.id)}>Analyze!</button>
                </div>
            ))}
        </div>
    );
}

export default VideoSection;
