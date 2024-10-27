import React, { useEffect, useState } from "react";
import "./UploadVideoSection.css";

function VideoSection() {
    const [account, setAccount] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Načítání existujících videí z lokálního JSON souboru
        const fetchVideos = async () => {
            try {
                const response = await fetch('/videos.json');
                const jsonData = await response.json();
                setVideos(jsonData.videos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchVideos();

        // Zkontrolovat připojení k MetaMask
        const checkConnection = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
            }
        };

        checkConnection();
    }, []);

    const upload = () => {
        // Získání hodnot z inputů
        const link = document.getElementById("link").value;
        const name = document.getElementById("name").value;
        const genre = document.getElementById("genre").value;
        const description = document.getElementById("description").value;
        const age = document.getElementById("age").value;
        const location = document.getElementById("location").value;
        const reward = document.getElementById("reward").value;
        const maxSpend = document.getElementById("max").value;
        const agree = document.getElementById("agree").checked;

        // Kontrola, zda jsou všechny povinné pole vyplněny
        if (!link || !name || !genre || !description || !age || !location || !reward || !maxSpend || !agree) {
            alert("Please fill out all fields and agree to the Terms of Use and Privacy Policy.");
            return;
        }

        // Vypočítat nové ID jako o 1 vyšší než maximální ID v existujících videích
        const newId = videos.reduce((maxId, video) => Math.max(maxId, parseInt(video.id, 10)), 0) + 1;

        // Vytvořit nový záznam
        const newVideo = {
            id: newId.toString(),
            link,
            name,
            genre,
            description,
            age,
            location,
            reward,
            maxSpend,
            agree,
            account
        };

        // Přidat nový záznam do pole videí
        const updatedVideos = [...videos, newVideo];

        // Výpis do konzole
        console.log("Updated Videos:", updatedVideos);
    };

    return (
        <div className="upload-section">
            <h1 className="upload-header">Upload video</h1>
            <div className="upload-input-section">
                <div className="upload-input">
                    <div className="input-item">
                        <label className="input-name">Link</label>
                        <input className="input-item-input" id="link" type="text" placeholder="Url" />
                    </div>
                    <div className="input-item">
                        <label className="input-name">Video name</label>
                        <input className="input-item-input" id="name" type="text" placeholder="Name" />
                    </div>
                    <div className="input-item">
                        <label className="input-name">Select genre</label>
                        <select className="input-item-input-choice" id="genre" defaultValue="">
                            <option value="" disabled>Select genre</option>
                            <option value="Fun">Fun</option>
                            <option value="Ads">Ads</option>
                            <option value="Streams">Streams</option>
                            <option value="Trailers">Trailers</option>
                            <option value="Games">Games</option>
                        </select>
                    </div>
                    <div className="input-item">
                        <label className="input-name">Short description</label>
                        <input className="input-item-input" id="description" type="text" placeholder="Description" />
                    </div>
                </div>
                <div className="upload-input">
                    <div className="input-item">
                        <label className="input-name">Age</label>
                        <input className="input-item-input-range" id="age" type="range" min="18" max="100" />
                    </div>
                    <div className="input-item">
                        <label className="input-name">Location</label>
                        <select className="input-item-input-choice" id="location" defaultValue="">
                            <option value="" disabled>Select location</option>
                            <option value="Czech">Czech</option>
                            <option value="USA">USA</option>
                            <option value="England">England</option>
                            <option value="Germany">Germany</option>
                            <option value="India">India</option>
                        </select>
                    </div>
                    <div className="input-item">
                        <label className="input-name">Reward per user</label>
                        <input className="input-item-input" id="reward" type="text" placeholder="Reward" />
                    </div>
                    <div className="input-item">
                        <label className="input-name">Maximum spend total</label>
                        <input className="input-item-input" id="max" type="text" placeholder="Maximum" />
                    </div>
                    <div className="input-item-checkbox">
                        <input className="input-item-input-checkbox" id="agree" type="checkbox" />
                        <label className="input-name-checkbox">
                            I agree to the <u>Terms of use</u> and <u>Privacy Policy</u>
                        </label>
                    </div>
                </div>
            </div>
            <div className="upload-button-section">
                <div className="upload-button-card">
                    <p className="upload-text"> TOTAL: 35 EmoCoins</p>
                    <button className="upload-button" onClick={upload}>Upload and pay</button>
                </div>
            </div>
        </div>
    );
}

export default VideoSection;
