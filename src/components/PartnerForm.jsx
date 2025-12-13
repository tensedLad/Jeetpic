import React from 'react';

const PartnerForm = () => {
    return (
        <section id="distributor-enquiry" className="py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="md:w-1/2 space-y-4">
                    <h2 className="text-4xl font-bold text-gray-800 border-none">Partner with Jeetpic.</h2>
                    <p className="text-gray-800 text-lg">
                        Join our distributor network across Kolkata and surrounding regions.
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                        High margin, localized support, and fast delivery.
                    </p>
                </div>

                <div className="md:w-1/3 w-full bg-white rounded-lg shadow-2xl p-6 text-gray-800">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Name</label>
                            <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-red-500" placeholder="Your Name" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Phone</label>
                            <input type="tel" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-red-500" placeholder="e.g. +919812345678" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Area / Pincode</label>
                            <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-red-500" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 mb-1">Business Type</label>
                            <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-red-500">
                                <option>Shopkeeper</option>
                                <option>Distributor</option>
                                <option>Wholesaler</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <button type="button" className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 rounded mt-2 transition-colors">
                            Submit Enquiry
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PartnerForm;
