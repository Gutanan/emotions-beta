import React from 'react';
import './HeroSection.css';
import heroImage from './pictures/HeroSectionPicture.png';

function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-text">
                <h1>Analyze emotions <br /> in <span className="highlight">video!</span></h1>
                <p>Is it funny or cringe? Have you ever wondered how your viewers feel when watching your video?</p>
                <button className="discover-btn">Discover more</button>
            </div>
            <div className="hero-image">
                <img src={heroImage} alt="Emotions" />
            </div>
        </section>
    );
}

export default HeroSection;
