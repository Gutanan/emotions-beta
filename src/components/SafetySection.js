import React from 'react';
import './SafetySection.css';
import safetyImage from './pictures/SafetySectionPicture.png';

function SafetySection() {
    return (
        <div className="safety-section">
            <div className="safety-content">
                <h2 className="safety-title">No worries about safety.</h2>
                <p className="safety-text">
                    Cutting-edge technology now harnesses the power to detect emotions through state-of-the-art methods, encrypting the data seamlessly before embedding it into smart contracts. Remarkably, these emotions are not centrally stored but instead transparently recorded within blockchains, ensuring unparalleled security and immutability.
                </p>
            </div>
            <img src={safetyImage} alt="Safety" className="safety-image" />
        </div>
    );
}

export default SafetySection;
