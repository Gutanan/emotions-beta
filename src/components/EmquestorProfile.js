import React from 'react';
import './EmquestorProfile.css';
import ProfilePic from './pictures/ProfilePic.png';
import PieChartEmotions from './pictures/pie_chart_emotions.png';
import LineChartEmotions from './pictures/line_chart_emotions.png';
import { useNavigate } from "react-router-dom";

function EmquestorProfile() {

    const navigate = useNavigate();

    const uploadRedirect = () => {
        navigate(`/upload`);
    };

    return (
        <div className="emq-emquestor-profile">
            <div className="emq-profile-header">
                <div className="emq-user-info">
                    <img src={ProfilePic} alt="User" className="emq-profile-picture" />
                    <div className="emq-user-details">
                        <h2>User123</h2>
                        <p><b>Joined:</b> 21-02-2024</p>
                        <p><b>Age:</b> 21</p>
                    </div>
                </div>
                <div className="emq-wallet">
                    <h3>Wallet</h3>
                    <p>234 Emocoins</p>
                    <div className="emq-wallet-buttons">
                        <button className="emq-wallet-button">Get more EmoCoins</button>
                        <button className="emq-shop-button" onClick={() => uploadRedirect()}>Upload video</button>
                    </div>
                </div>
            </div>

            <p className="emq-dashboard-name">Dashboard</p>
            <div className="emq-dashboard">
                <div className="emq-dashboard-emotions">
                    <p className="emq-dashboard-emotions-number">87</p>
                    <p className="emq-dashboard-emotions-text">EmoCoins spent</p>
                </div>
                <div className="emq-dashboard-emotions">
                    <p className="emq-dashboard-emotions-number">2 435</p>
                    <p className="emq-dashboard-emotions-text">Emotions detected</p>
                </div>
                <img src={PieChartEmotions} alt="Pie Emotions Chart" className="emq-dashboard-image" />
            </div>

            <p className="emq-recent-emotions-name">Detected emotions in real time (time-line)</p>
            <div className="emq-recent-emotions">
                <p className="emq-recent-emotions-video">Add video 13234</p>
                <img src={LineChartEmotions} alt="Recent Emotion" className="emq-recent-emotion-graph" />
            </div>
        </div>
    );
}

export default EmquestorProfile;
