import React from 'react';
import productImg from '../assets/jeetpic.png';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section id="home" className="py-20 px-6 md:px-12 relative overflow-hidden text-white">

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
                <motion.div
                    className="md:w-1/2 space-y-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight relative">
                        Stop paying for their <br /> TV ads. <br />
                        Start paying for a <br /> cleaner toilet.
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-lg">
                        Better Shine, Less Time. The new standard for Indian toilets.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <motion.button
                            className="bg-red-700 text-white font-semibold py-3 px-6 rounded shadow-lg"
                            whileHover={{ scale: 1.05, backgroundColor: '#991B1B' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/shop')}
                        >
                            Buy Now
                        </motion.button>
                        <motion.button
                            className="bg-white text-gray-900 font-semibold py-3 px-6 rounded shadow-lg"
                            whileHover={{ scale: 1.05, backgroundColor: '#F3F4F6' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => document.getElementById('distributor-form').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Become a Distributor
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    className="md:w-1/2 flex justify-center mt-12 md:mt-0 relative"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <motion.img
                            src={productImg}
                            alt="Jeetpic Bottle"
                            className="w-64 md:w-80 lg:w-96 drop-shadow-2xl cursor-pointer"
                            whileHover={{ scale: 1.1, y: -10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section >
    );
};


export default Hero;
