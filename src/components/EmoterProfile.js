import React from 'react';
import './EmoterProfile.css';
import ProfilePic from './pictures/ProfilePic.png';
import PieChartEmotions from './pictures/pie_chart_emotions.png';
import LineChartEmoCoins from './pictures/line_chart_emocoins.png';
import LineChartEmotions from './pictures/line_chart_emotions.png';

function EmoterProfile() {
    return (
        <div className="emoter-profile">
            <div className="profile-header">
                <div className="user-info">
                    <img src={ProfilePic} alt="User" className="profile-picture" />
                    <div className="user-details">
                        <h2>User123</h2>
                        <p><b>Joined:</b> 21-02-2024</p>
                        <p><b>Age:</b> 21</p>
                    </div>
                </div>
                <div className="wallet">
                    <h3>Wallet</h3>
                    <p>124 Emocoins</p>
                    <div className="wallet-buttons">
                        <button className="wallet-button">Get more EmoCoins</button>
                        <button className="shop-button">Go to the shop</button>
                    </div>
                </div>
            </div>

            <p className="dashboard-name">Dashboard</p>
            <div className="dashboard">
                <div className="dashboard-emotions">
                    <p className="dashboard-emotions-number">1 983</p>
                    <p className="dashboard-emotions-text">detected Emotions</p>
                </div>
                <img src={PieChartEmotions} alt="Pie Emotions Chart" className="dashboard-image" />
                <img src={LineChartEmoCoins} alt="Emocoins Earned Chart" className="dashboard-image" />
            </div>

            <p className="recent-emotions-name">Your Recent Emotions</p>
            <div className="recent-emotions">
                <p className="recent-emotions-video">Add video 13234</p>
                <img src={LineChartEmotions} alt="Recent Emotion" className="recent-emotion-graph" />
            </div>
        </div>
    );
}

export default EmoterProfile;
