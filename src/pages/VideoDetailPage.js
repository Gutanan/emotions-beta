import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pinFileToIPFS } from '../code/pinata';
import { connectWallet, addEntry, grantAccess, shareWith } from '../code/smartContractService';
import './VideoDetailPage.css';

function VideoDetail() {
    const { videoId } = useParams();
    const [videoSrc, setVideoSrc] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [ipfsHash, setIpfsHash] = useState('');
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/videos.json'); // Cesta k JSON souboru v public složce
                const jsonData = await response.json();

                const video = jsonData.videos.find(v => v.id === videoId);
                if (video) {
                    setVideoSrc(video.link); // Nastavíme URL pro iframe
                } else {
                    console.error("Video not found");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchVideos();
        handleConnectWallet(); // Připojení k peněžence při načtení komponenty
    }, [videoId]);

    const handleConnectWallet = async () => {
        try {
            const { account, contract } = await connectWallet();
            setAccount(account);
            setContract(contract);
        } catch (error) {
            console.error("Chyba při připojení k peněžence:", error);
        }
    };

    const startCamera = async () => {
        videoRef.current.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
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

    const handleWriteEmotions = async () => {
        if (contract) {
            try {
                await addEntry(contract, "Emotions HASH");
                console.log("Entry added.");

                await grantAccess(contract);
                console.log("Access granted.");
            } catch (error) {
                console.error("Chyba při volání Write Emotions funkcí:", error);
            }
        }
    };

    const handleSendToEmquestor = async () => {
        if (contract) {
            try {
                const moneySender = "0x3D43B218D3ff842c82B299868A24903891C397D8"; // Zde použijte adresu moneySenderu
                const sharedText = "Emotions HASH";
                const cashAmount = "0.005"; // Částka v Etheru

                await shareWith(contract, moneySender, sharedText, cashAmount);
                console.log("Shared with Emquestor.");
            } catch (error) {
                console.error("Chyba při volání Send to Emquestor:", error);
            }
        }
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
                <video ref={videoRef} style={{ display: isAnalyzing ? 'block' : 'none' }} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
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
                            <button className="drop-data-button" onClick={handleWriteEmotions}>Write Emotions</button>
                            <button className="send-data-button" onClick={handleSendToEmquestor}>Send to Emquestor</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VideoDetail;
