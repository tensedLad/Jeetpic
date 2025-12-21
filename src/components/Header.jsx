import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <motion.header
            className="fixed top-0 left-0 w-full z-50 bg-[#B91C1C] text-white shadow-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <motion.div
                        onClick={() => navigate('/')}
                        className="text-2xl font-bold italic tracking-wider cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        Jeetpic
                    </motion.div>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <a href="#home" className="hover:text-gray-200">Home</a>
                        <a href="#why-jeetpic" className="hover:text-gray-200">Why Jeetpic</a>
                        <a href="#distributor-enquiry" className="hover:text-gray-200">Distributor Enquiry</a>
                        <a href="#contact" className="hover:text-gray-200">Contact</a>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <motion.button
                        className="bg-white hover:bg-gray-100 text-black text-sm font-semibold py-2 px-4 rounded shadow-sm transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Become a Distributor
                    </motion.button>
                    <motion.button
                        onClick={() => navigate('/shop')}
                        className="border border-white hover:bg-white hover:text-[#B91C1C] text-white text-sm font-semibold py-2 px-4 rounded flex items-center gap-2 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ShoppingCart size={16} />
                        Buy Now
                    </motion.button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
