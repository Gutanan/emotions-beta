import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { pinJSONToIPFS } from '../code/pinata';
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
    const [cameraReady, setCameraReady] = useState(false); // Stav pro kontrolu připravenosti kamery
    const [sending, setSending] = useState(false); // Stav pro kontrolu, zda se snímky odesílají
    const [intervalId, setIntervalId] = useState(null); // ID intervalu pro pozdější zrušení
    const [emotionsLog, setEmotionsLog] = useState([]); // Pro ukládání emocí

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
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.onloadeddata = () => {
                videoRef.current.play().catch(error => {
                    console.error("Error playing video:", error);
                });
            };

            // Čekáme, dokud nebude video připravené
            videoRef.current.onloadedmetadata = () => {
                setCameraReady(true);
                console.log("Video is ready");
            };
        } catch (error) {
            console.error("Error starting camera:", error);
        }
    };
    useEffect(() => {
        startCamera();
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Přidání dalšího ověření stavu videa
        if (!video || !video.videoWidth || !video.videoHeight||!cameraReady) {
            console.error("Video is not ready yet.");
            return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Vykreslení videa na canvas
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // Získání obrázku jako data URL
        const imageData = canvas.toDataURL('image/png');
        //console.log("Captured base64 image:", imageData);

        // Uložení a odeslání snímku bez prefixu
        if (imageData && imageData.startsWith('data:image/png;base64,')) {
            const base64Image = imageData.split(",")[1];
            sendImageToModel(base64Image);
        } else {
            console.error("Failed to capture image: ", imageData);
        }
    };
    async function sendImageToModel(base64Image) {
        console.log("Sending image to model...");
        try {
            const response = await fetch("https://cnnimg-498983181011.europe-central2.run.app/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ image: base64Image })
            });

            if (!response.ok) {
                console.error(`Server error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Predicted emotion:", data);
            // Přidání emoce do logu
            setEmotionsLog(prevLog => [...prevLog, data.emotion]);
        } catch (error) {
            console.error("Error sending image:", error);
        }
    };

    const startSendingImages = () => {
        setSending(true);
        const id = setInterval(() => {
            captureImage();
        }, 2000); //2 vteřiny

        setIntervalId(id);
    };

    const stopSendingImages = () => {
        setSending(false);
        clearInterval(intervalId);
        setIntervalId(null);
        sendToIPFS();
    };

    const emotionsMap = {
        1: "Calm",
        2: "Sad",
        3: "Neutral",
        4: "Surprised",
        5: "Happy",
        6: "Fearful",
        7: "Disgusted"
    };

    const sendToIPFS = async () => {
        console.log("All captured emotions:", emotionsLog);

        // Převedeme emotionsLog do JSON formátu
        const jsonLog = emotionsLog.map((emotion, index) => ({
            time: `00:${String(index * 2).padStart(2, '0')}`,
            emotionID: emotion,
            emotion: emotionsMap[emotion] || "Unknown"
        }));

        // Převod jsonLog do JSON řetězce pro odeslání
        const jsonString = JSON.stringify(jsonLog);
        console.log(jsonString);

        try {
            // Zavolání funkce pinFileToIPFS s JSON daty
            const result = await pinJSONToIPFS(jsonString); // Zajisti, že pinFileToIPFS očekává JSON řetězec
            setIpfsHash(result.IpfsHash);
            console.log("IPFS Hash:", result.IpfsHash);
        } catch (error) {
            console.error("Error uploading to IPFS:", error);
        }
    };


    const handleAnalyzeClick = () => {
        if (sending) {
            setIsAnalyzing(false);
            stopSendingImages(); // Pokud se odesílá, zastavíme to
        } else {
            setIsAnalyzing(true);
            startCamera(); // Spustíme kameru
            startSendingImages(); // Spustíme odesílání obrázků
        }
    };

    const handleWriteEmotions = async () => {
        if (contract) {
            try {
                await addEntry(contract, ipfsHash);
                console.log("Entry added.");

                await grantAccess(contract);
                console.log("Access granted for " + account);
            } catch (error) {
                console.error("Chyba při volání Write Emotions funkcí:", error);
            }
        }
    };

    const handleSendToEmquestor = async () => {
        if (contract) {
            try {
                const moneySender = "0x3D43B218D3ff842c82B299868A24903891C397D8"; // Zde použijte adresu Emquestera
                const sharedText = ipfsHash;
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
                <video ref={videoRef} style={{ display: cameraReady ? 'block' : 'none' }} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />

                <button className="analyze-button-detail" onClick={handleAnalyzeClick}>
                    {sending ? "Stop" : "Start"}
                </button>
            </div>
            <div className="sc-buttons-video-detail-area">
                {ipfsHash && (
                    <div className="sc-buttons-video-detail-section">
                        <div className="sc-buttons-video-detail">
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