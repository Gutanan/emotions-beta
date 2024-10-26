import React from 'react';
import './ShopSection.css';
import barbieImage from './pictures/movie_barbie.png';

function ShopContent() {
    return (
        <div className="content-list">
            <div className="content-item">
                <div className="content-details">
                    <img src={barbieImage} alt="Barbie" className="content-image" />
                    <div className="content-details-text">
                        <h3 className="content-title">Barbie</h3>
                        <p className="content-subtitle">Cinema City</p>
                    </div>
                </div>
                <div className="purchase-info">
                    <p className="emo-coins">4 EmoCoins</p>
                    <p className="tickets-available">100 Available</p>
                    <button className="buy-button">Buy</button>
                </div>
            </div>
        </div>
    );
}

export default ShopContent;
