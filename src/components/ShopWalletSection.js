import React from 'react';
import './ShopWalletSection.css';
import shopImage from "./pictures/shop_section.png";

function Wallet() {
    return (
        <div className="wallet-section">
            <div className="wallet-space">
                <h1 className="page-name">Shop</h1>
                <div className="wallet">
                    <h2>Your Wallet</h2>
                    <p className="emo-coins">124 EmoCoins</p>
                    <button className="get-more-coins">Get more EmoCoins</button>
                </div>
            </div>
            <div className="image-space">
                <img src={shopImage} alt="Barbie" className="shop-image" />
            </div>
        </div>
    );
}

export default Wallet;
