import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="py-8 px-6 md:px-12 bg-red-700 text-white">
            <div className="max-w-7xl mx-auto drop-shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h4 className="font-bold text-lg">Jeetpic</h4>
                        <p className="text-xs text-white mt-1 font-medium">Made in Kolkata - Quality Guarantee</p>
                        <p className="text-xs text-white mt-1 font-medium">Address: 123, Industrial Estate, Kolkata, West Bengal</p>
                    </div>

                    <div className="flex space-x-4">
                        <a href="#" className="p-2 border border-white rounded hover:bg-blue-800 transition"><Facebook size={16} /></a>
                        <a href="#" className="p-2 border border-white rounded hover:bg-blue-800 transition"><Instagram size={16} /></a>
                        <a href="#" className="p-2 border border-white rounded hover:bg-blue-800 transition"><Twitter size={16} /></a>
                    </div>
                </div>
                <div className="text-center mt-6 text-[10px] text-white font-medium">
                    © 2025 Jeetpic. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
