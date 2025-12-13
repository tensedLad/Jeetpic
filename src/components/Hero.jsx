import React from 'react';
import productImg from '../assets/jeetpic.png';

const Hero = () => {
    return (
        <section id="home" className="py-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 space-y-6">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                        India's Toughest Stain <br /> Remover.
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-lg">
                        Better Shine, Less Time. The new standard for Indian toilets.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded shadow-lg transition transform hover:scale-105">
                            Become a Distributor
                        </button>
                        <button className="bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 rounded shadow-lg transition transform hover:scale-105">
                            See the Difference
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2 flex justify-center mt-12 md:mt-0 relative">
                    <img
                        src={productImg}
                        alt="Jeetpic Bottle"
                        className="w-64 md:w-80 lg:w-96 drop-shadow-2xl hover:scale-105 transition duration-500"
                    />
                </div>
            </div>
        </section>
    );
};


export default Hero;
