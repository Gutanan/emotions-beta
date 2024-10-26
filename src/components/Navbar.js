// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsConnected(true);
                }
            }
        };

        checkConnection();
    }, []);

    const connect = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                setIsConnected(true);
            } catch (error) {
                console.error('Connection Error:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">Emotions!</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/videos">Videos</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            <div className="auth-buttons">
                {isConnected ? (
                    <span className="account-info">Connected as: {account}</span>
                ) : (
                    <button className="login-btn" onClick={connect}>Connect MetaMask</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
