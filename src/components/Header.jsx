import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-[#B91C1C] text-white shadow-md">
            <div className="max-w-7xl mx-auto py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <div className="text-2xl font-bold italic tracking-wider">Jeetpic</div>
                    <nav className="hidden md:flex space-x-6 text-sm font-medium">
                        <a href="#home" className="hover:text-gray-200">Home</a>
                        <a href="#why-jeetpic" className="hover:text-gray-200">Why Jeetpic</a>
                        <a href="#distributor-enquiry" className="hover:text-gray-200">Distributor Enquiry</a>
                        <a href="#contact" className="hover:text-gray-200">Contact</a>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="bg-white hover:bg-gray-100 text-black text-sm font-semibold py-2 px-4 rounded shadow-sm transition-colors">
                        Become a Distributor
                    </button>
                    <button className="border border-white hover:bg-white hover:text-[#B91C1C] text-white text-sm font-semibold py-2 px-4 rounded flex items-center gap-2 transition-colors">
                        <ShoppingCart size={16} />
                        Buy Now
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
