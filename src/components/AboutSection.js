import React from 'react';
import './AboutSection.css';
import heroImage from './pictures/HeroSectionPicture.png';

function AboutPage() {
    return (
        <div className="about-container">
            <h2 className="about-subtitle">What is Emotions!?</h2>
            <p className="about-description">
                Emotions! is a platform that enables the detection of emotions in videos. It is based on Web 3.0 technology and can be utilized either as an Emoter (a person
                who watches videos and allows their emotions to be analyzed in exchange for a reward in the form of Emocoins) or as an Emquestor (someone who seeks to
                understand how people emotionally react to videos).
            </p>

            <h2 className="about-subtitle">Why Web 3.0?</h2>
            <p className="about-description">
                Emotions! utilizes Web 3.0 technology to leverage its decentralized, secure, and transparent infrastructure. Web 3.0 allows Emotions! to operate on a
                blockchain, ensuring that all transactions and emotional analyses are immutable and traceable. This decentralization not only enhances privacy and security for
                users but also facilitates direct interactions between Emoters and Emquestors without the need for intermediaries. Furthermore, Web 3.0 enables smart
                contracts, automating the reward system for Emoters in a transparent and efficient manner. The use of Web 3.0 technologies aligns with the platform's
                commitment to maintaining user sovereignty over personal data and fostering a community-driven environment where contributions are fairly rewarded.
            </p>

            <h2 className="about-subtitle">Who is Emoter?</h2>
            <p className="about-description">
                An Emoter is an individual who watches videos with their camera turned on and shares their emotional reactions with an Emquestor. To participate, an Emoter
                must register and pay an entry fee, which covers the costs of emotion analysis in case they decide not to share their emotions. If an Emoter chooses to share
                their emotions, they receive a reward, which can then be used to purchase tickets in our "Shop". This system ensures that Emoters are compensated for their
                participation and contribution, while also covering the necessary expenses to analyze the emotions without sharing them.
            </p>

            <h2 className="about-subtitle">Who is Emquestor?</h2>
            <p className="about-description">
                An Emquestor is a user on the Emotions! platform who seeks to understand how individuals emotionally react to videos. Emquestors are typically content
                creators, marketers, researchers, or anyone interested in the emotional responses elicited by video content. They submit videos for analysis and rely on the
                data provided by Emoters—individuals who watch these videos and share their emotional reactions. In exchange for the insights gained, Emquestors must
                compensate Emoters in the form of Emocoins, the platform's digital currency. This payment system ensures that Emoters are fairly rewarded for their
                participation and contribution of emotional data, fostering a mutually beneficial relationship between Emoters and Emquestors.
            </p>

            <h2 className="about-subtitle">What is Emocoin</h2>
            <p className="about-description">
                Emocoin is tied to cryptocurrency, functioning as the specialized digital currency of the Emotions! platform. This connection to cryptocurrency technology
                ensures secure, transparent, and decentralized transactions. By leveraging blockchain technology, Emocoin transactions are immutable and traceable,
                providing a high level of security and privacy for users. This integration with cryptocurrency allows for seamless global transactions, enabling users from
                different parts of the world to participate and be rewarded for their contributions without the complexities of traditional banking systems.
            </p>

            <h2 className="about-subtitle">How do we detect Emotions</h2>
            <p className="about-description">
                Emotions are detected on the Emotions! platform by capturing the user's facial expressions through their camera during video viewing sessions. This data is
                then analyzed using advanced artificial intelligence (AI) algorithms that are capable of identifying and interpreting a wide range of emotional responses. Once
                detected, these emotions are securely encrypted and recorded on the user's blockchain ledger. This process ensures the privacy and security of the data, as
                the blockchain's decentralized and immutable nature makes it virtually impossible to alter or access the information without authorization. The use of AI for
                emotion detection allows for a nuanced and accurate understanding of user reactions, while blockchain technology provides a transparent and secure method
                of storing this sensitive data.
            </p>

            <div className="help-section">
                <div className="help-text">
                    <h3 className="help-title">Need a help?</h3>
                    <button className="help-button">Contact support</button>
                </div>
                <div className="help-image">
                    <img src={heroImage} alt="Help Illustration" />
                </div>
            </div>

        </div>
    );
}

export default AboutPage;
