import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import lemon1 from '../assets/1.png';
import lemon2 from '../assets/2.png';
import lemon3 from '../assets/3.png';

const FloatingLemons = () => {
    const [lemons, setLemons] = useState([]);

    useEffect(() => {
        const lemonImages = [lemon1, lemon2, lemon3];
        const lemonCount = 8; // Limited to 8 as requested
        const newLemons = [];

        for (let i = 0; i < lemonCount; i++) {
            newLemons.push({
                id: i,
                src: lemonImages[Math.floor(Math.random() * lemonImages.length)],
                left: `${Math.random() * 90}%`, // Keep within horizontal bounds
                top: `${Math.random() * 90}%`,  // Keep within vertical bounds
                scale: Math.random() * 1.0 + 0.8, // Increased size: 0.8x to 1.8x
                rotate: Math.random() * 360,
                duration: Math.random() * 10 + 5, // Faster float for more life
                delay: Math.random() * 2,
                floatY: Math.random() * 60 - 30, // Gentle float range
            });
        }
        setLemons(newLemons);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden h-full w-full">
            {lemons.map((lemon) => (
                <motion.img
                    key={lemon.id}
                    src={lemon.src}
                    className="absolute opacity-90 brightness-110 contrast-125 saturate-150 drop-shadow-2xl"
                    style={{
                        left: lemon.left,
                        top: lemon.top,
                        width: `${lemon.scale * 6}rem`,
                        // Removed scroll-linked y transform
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
            ))}
        </div>
    );
};

export default FloatingLemons;
