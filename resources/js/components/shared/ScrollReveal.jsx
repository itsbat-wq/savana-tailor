import React from 'react';
import { motion } from 'framer-motion';

const defaultVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function ScrollReveal({
    children,
    variants = defaultVariants,
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
}) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-50px' }}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.4, 0, 0.2, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
