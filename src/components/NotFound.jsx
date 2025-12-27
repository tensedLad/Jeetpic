import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-white flex items-center justify-center px-4">
            <motion.div
                className="text-center max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 404 Text */}
                <motion.div
                    className="mb-8"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <h1 className="text-9xl font-bold text-white drop-shadow-lg">404</h1>
                </motion.div>

                {/* Message */}
                <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
                <p className="text-white/80 text-lg mb-8">
                    Sorry, the page you're looking for doesn't exist or has been removed.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </motion.button>
                    <motion.button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 bg-red-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Home size={20} />
                        Home
                    </motion.button>
                </div>

                {/* Help Text */}
                <p className="text-white/60 text-sm mt-8">
                    Need help? <a href="/#contact" className="text-white underline hover:text-white/80">Contact us</a>
                </p>
            </motion.div>
        </div>
    );
};

export default NotFound;
