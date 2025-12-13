import React from 'react';

const ComparisonTable = () => {
    return (
        <section className="py-16 px-6 md:px-12 text-center">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-10 drop-shadow-md">Jeetpic Vs Leading Brands</h2>

                <div className="max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-blue-900 text-white">
                                <th className="p-4 font-bold">Product</th>
                                <th className="p-4 font-bold">Price</th>
                                <th className="p-4 font-bold">Thickness</th>
                                <th className="p-4 font-bold">Stain Removal Speed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-blue-600 text-white">
                                <td className="p-4 font-bold text-white">Jeetpic</td>
                                <td className="p-4 font-bold text-white">₹79 / 500ml</td>
                                <td className="p-4 text-gray-100">Thick (Clings to rim)</td>
                                <td className="p-4 text-gray-100">Fast — 2-5 min</td>
                            </tr>
                            <tr className="bg-blue-100 text-gray-800">
                                <td className="p-4 font-semibold">Leading Brand</td>
                                <td className="p-4">₹150 / 500ml</td>
                                <td className="p-4">Thin (Runs off)</td>
                                <td className="p-4">Slow — 10+ min</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
