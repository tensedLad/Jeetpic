import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import lemon1 from '../assets/1.png';
import lemon2 from '../assets/2.png';
import lemon3 from '../assets/3.png';

const FloatingLemons = () => {
    const [lemons, setLemons] = useState([]);

    useEffect(() => {
        const lemonImages = [lemon1, lemon2, lemon3];
        const newLemons = [];
        let idCounter = 0;

        // Configuration for tiered distribution to control density gradually
        const tiers = [
            { count: 8, minTop: 2, maxTop: 30 },   // Top tier: High density (8 lemons)
            { count: 6, minTop: 30, maxTop: 60 },  // Middle tier: Medium density (6 lemons)
            { count: 4, minTop: 60, maxTop: 90 }   // Bottom tier: Lower density (4 lemons)
        ];

        tiers.forEach(tier => {
            const countPerSide = tier.count / 2;

            for (let i = 0; i < tier.count; i++) {
                const isLeft = i < countPerSide;

                // Random position within the tier's vertical range
                const randomTop = Math.random() * (tier.maxTop - tier.minTop) + tier.minTop;

                // Random position for left/right side
                // Left: 0-40%, Right: 60-100% (keeping center clear for content)
                const randomLeft = isLeft
                    ? Math.random() * 40
                    : (Math.random() * 40 + 60);

                newLemons.push({
                    id: idCounter++,
                    src: lemonImages[Math.floor(Math.random() * lemonImages.length)],
                    left: `${randomLeft}%`,
                    top: `${randomTop}%`,
                    scale: Math.random() * 1.0 + 0.8, // 0.8x to 1.8x
                    rotate: Math.random() * 360,
                    duration: Math.random() * 10 + 5,
                    delay: Math.random() * 2,
                    floatY: Math.random() * 60 - 30,
                });
            }
        });
        setLemons(newLemons);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden w-full h-full">
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
