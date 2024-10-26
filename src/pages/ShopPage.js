import React from 'react';
import './ShopPage.css';
import Wallet from '../components/ShopWalletSection';
import ShopContent from '../components/ShopSection';

function Shop() {
    return (
        <div className="shop-container">
            <Wallet />
            <ShopContent />
        </div>
    );
}

export default Shop;

