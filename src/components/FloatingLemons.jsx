import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import lemon1 from '../assets/1.png';
import lemon2 from '../assets/2.png';
import lemon3 from '../assets/3.png';

const FloatingLemons = () => {
    const [lemons, setLemons] = useState([]);
    const [scrollPercent, setScrollPercent] = useState(0);
    const scrollTimeoutRef = useRef(null);

    useEffect(() => {
        const lemonImages = [lemon1, lemon2, lemon3];
        const lemonCount = 18; // Slightly more for better feel
        const newLemons = [];

        for (let i = 0; i < lemonCount; i++) {
            newLemons.push({
                id: i,
                src: lemonImages[Math.floor(Math.random() * lemonImages.length)],
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 95}%`,
                scale: Math.random() * 0.7 + 0.5, // Brighter mix of sizes
                rotate: Math.random() * 360,
                duration: Math.random() * 6 + 4, // Faster, more active floating
                delay: Math.random() * 5,
                floatY: Math.random() * 80 - 40, // More pronounced vertical movement
                floatX: Math.random() * 40 - 20, // Added slight side-to-side drift
            });
        }
        setLemons(newLemons);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
            {lemons.map((lemon) => (
                <motion.img
                    key={lemon.id}
                    src={lemon.src}
                    className="absolute brightness-110 contrast-125 saturate-150 drop-shadow-xl"
                    style={{
                        left: lemon.left,
                        top: lemon.top,
                        width: `${lemon.scale * 6}rem`,
                        opacity: 0.7,
                    }}
                    animate={{
                        y: [0, lemon.floatY, 0],
                        x: [0, lemon.floatX, 0],
                        rotate: [lemon.rotate, lemon.rotate + 25, lemon.rotate - 25, lemon.rotate],
                    }}
                    transition={{
                        duration: lemon.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: lemon.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingLemons;
