import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen() {
    return (
        <div className="loading-screen">
            <motion.div
                className="loading-screen__content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="loading-screen__logo"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Savana Taylor
                </motion.h1>
                <motion.div
                    className="loading-screen__line"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.p
                    className="loading-screen__tagline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    Boutique
                </motion.p>
            </motion.div>
        </div>
    );
}
