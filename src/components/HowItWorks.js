import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
    return (
        <section className="how-it-works">
            <h2>How it works?</h2>
            <div className="steps">
                <div className="step">
                    <div className="icon">1</div>
                    <p><strong>Upload video</strong></p>
                    <p>Creators upload their videos to measure the emotional reactions of viewers.</p>
                </div>
                <div className="step">
                    <div className="icon">2</div>
                    <p><strong>Analyze reactions</strong></p>
                    <p>The target audience watches the videos, with a camera recording their reactions.</p>
                </div>
                <div className="step">
                    <div className="icon">3</div>
                    <p><strong>Reward respondents</strong></p>
                    <p>Get rewards in the form of Emocoins!</p>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
