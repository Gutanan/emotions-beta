import React, {useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import {pinFileToIPFS} from '../code/pinata';
import './VideoDetailPage.css';

function VideoDetail() {
    const { videoId } = useParams();
    const videos = {
        '1': 'https://www.youtube.com/embed/qMldEs0rf8o?si=XkzHwTv09vUG5bvW',
        '2': 'https://www.youtube.com/embed/HxXv6k49BNk?si=a8uLb171TZbE9Hzk',
    };

    const videoSrc = videos[videoId] || '';
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [ipfsHash, setIpfsHash] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
        videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({video: true});
        videoRef.current.play();
    };

    const handleStop = async () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);


            canvas.toBlob(async (blob) => {
                const result = await pinFileToIPFS(blob);
                setIpfsHash(result.IpfsHash);
            }, 'image/jpeg');

            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        } else {
            console.error("No active video stream to stop.");
        }
    };

    const handleAnalyzeClick = () => {
        setIsAnalyzing(prev => {
            const newState = !prev;

            if (newState) {
                startCamera();
            } else {
                handleStop();
            }
            return newState;
        });
    };

    return (
        <div className="video-detail-content">
            <div className="video-detail">
                {videoSrc && (
                    <iframe
                        className="detail"
                        title="video"
                        src={videoSrc}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                )}
                {isAnalyzing && (
                    <div className="status-message">Analyzing...</div>
                )}
                <video ref={videoRef} style={{ display: isAnalyzing ? 'block' : 'none'}} />
                <canvas ref={canvasRef} style={{ display: 'none' }}/>
                <button className="analyze-button-detail" onClick={handleAnalyzeClick}>
                    {isAnalyzing ? "Stop" : "Start"}
                </button>
            </div>
            <div className="sc-buttons-video-detail-area">
                {ipfsHash && (
                    <div className="sc-buttons-video-detail-section">
                        <p>IPFS Hash: {ipfsHash}</p>
                        <div className="sc-buttons-video-detail">
                            <button className="view-data-button" onClick={() => {
                                const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', `image_${ipfsHash}.jpg`);
                                document.body.appendChild(link);
                                link.click();
                                link.remove();
                            }}>View Emotions</button>
                            <button className="drop-data-button">Drop Emotions</button>
                            <button className="send-data-button">Send to Emquestor</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoDetail;
