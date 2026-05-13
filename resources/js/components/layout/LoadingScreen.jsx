import React from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <div className="loading-screen__content">
                <h1 className="loading-screen__logo">Savana Taylor</h1>
                <div className="loading-screen__line" />
                <p className="loading-screen__tagline">Boutique</p>
            </div>
        </div>
    );
}
