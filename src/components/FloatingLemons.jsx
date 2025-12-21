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
        const lemonCount = 20; // Increased total lemons for better distribution
        const newLemons = [];
        let idCounter = 0;

        for (let i = 0; i < lemonCount; i++) {
            const topPercent = Math.random() * 90;
            newLemons.push({
                id: i,
                src: lemonImages[Math.floor(Math.random() * lemonImages.length)],
                left: `${Math.random() * 90}%`,
                top: `${topPercent}%`,
                scale: Math.random() * 1.0 + 0.8,
                rotate: Math.random() * 360,
                duration: Math.random() * 10 + 5,
                delay: Math.random() * 2,
                floatY: Math.random() * 60 - 30,
                // Vertical position for scroll-based opacity
                verticalPosition: topPercent,
            });
        }
        setLemons(newLemons);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimeoutRef.current) return;

            scrollTimeoutRef.current = setTimeout(() => {
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const percent = Math.min(scrollY / windowHeight, 1);
                setScrollPercent(percent);
                scrollTimeoutRef.current = null;
            }, 16); // ~60fps
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
            {lemons.map((lemon) => {
                const threshold = 90 * (1 - scrollPercent * 0.7);
                const distance = threshold - lemon.verticalPosition;
                const opacity = distance > 0 ? Math.min(0.9, distance / 30 * 0.9) : 0;

                return (
                    <motion.img
                        key={lemon.id}
                        src={lemon.src}
                        className="absolute brightness-110 contrast-125 saturate-150 drop-shadow-2xl"
                        style={{
                            left: lemon.left,
                            top: lemon.top,
                            width: `${lemon.scale * 6}rem`,
                            opacity: opacity,
                        }}
                        animate={{
                            y: [0, lemon.floatY, 0],
                            rotate: [lemon.rotate, lemon.rotate + 20, lemon.rotate - 20, lemon.rotate],
                        }}
                        transition={{
                            duration: lemon.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: lemon.delay,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default FloatingLemons;
