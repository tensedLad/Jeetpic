import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer id="contact" className="py-8 px-6 md:px-12 bg-red-700 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto drop-shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <motion.div
                        className="mb-4 md:mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <h4 className="font-bold text-lg">Jeetpic</h4>
                        <p className="text-xs text-white mt-1 font-medium">Made in Kolkata - Quality Guarantee</p>
                        <p className="text-xs text-white mt-1 font-medium">Address: 123, Industrial Estate, Kolkata, West Bengal</p>
                    </motion.div>

                    <motion.div
                        className="flex space-x-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {[<Facebook size={16} />, <Instagram size={16} />, <Twitter size={16} />].map((icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="p-2 border border-white rounded hover:bg-blue-800 transition block"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
                <motion.div
                    className="text-center mt-6 text-[10px] text-white font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    © 2025 Jeetpic. All rights reserved.
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
