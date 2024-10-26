import React from 'react';
import './RolesSection.css';
import emoterIcon from './pictures/RolesSectionEmoter.png';
import emquestorIcon from './pictures/RolesSectionEmquester.png';

function RolesSection() {
    return (
        <div className="roles-section">
            <div className="role-card emoter-card">
                <div className="top-section">
                    <img src={emoterIcon} alt="Emoter Icon" className="role-icon" />
                    <div className="role-description">
                        <h3 className="role-title emoter-title">Emoter</h3>
                        <p className="role-subtitle">I want to watch videos and earn rewards!</p>
                        <p className="role-text">
                            An Emoter is a person who participates in the novel practice of watching videos and monetizing their emotional responses. Here's how the process is typically structured.
                        </p>
                    </div>
                </div>
                <div className="bottom-section">
                    <ul className="steps-list">
                        <li>1. Register</li>
                        <li>2. Pay registration fee</li>
                        <li>3. Watch videos</li>
                        <li>4. Earn Emocoins</li>
                        <li>5. Redeem rewards!</li>
                    </ul>
                    <div className="button-group">
                        <button className="emoter-btn">Become Emoter</button>
                        <button className="learn-more-btn">Learn more</button>
                    </div>
                </div>
            </div>

            <div className="role-card emquestor-card">
                <div className="top-section">
                    <img src={emquestorIcon} alt="Emquestor Icon" className="role-icon" />
                    <div className="role-description">
                        <h3 className="role-title emquestor-title">Emquestor</h3>
                        <p className="role-subtitle">I want to analyze my videos!</p>
                        <p className="role-text">
                            Emquestor is an individual who engages in the process of having emotional reactions analyzed by Emoters while watching videos. This intriguing procedure is structured as follows:
                        </p>
                    </div>
                </div>
                <div className="bottom-section">
                    <ul className="steps-list">
                        <li>1. Register</li>
                        <li>2. Upload video</li>
                        <li>3. Enter rewards for your Emoters</li>
                        <li>4. Wait</li>
                        <li>5. View results and analysis</li>
                    </ul>
                    <div className="button-group">
                        <button className="emquestor-btn">Become Emquestor</button>
                        <button className="learn-more-btn">Learn more</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RolesSection;
