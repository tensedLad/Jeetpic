import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
const PartnerForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <section id="distributor-form" className="py-16 px-6 md:px-12 relative overflow-hidden text-gray-900">
            <motion.div
                className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="md:w-1/2 space-y-4">
                    <h2 className="text-4xl font-bold text-gray-800 border-none">Why Partner with Jeetpic?</h2>
                    <p className="text-gray-800 text-lg">
                        Join our distributor network across Kolkata and surrounding regions.
                    </p>
                    <div className="flex flex-col items-center space-y-4 w-full">
                        {/* Layer 1: The Peak */}
                        <motion.div
                            className="bg-white border-l-4 border-gray-200 p-4 rounded shadow-sm w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="font-bold text-gray-900 text-sm">High Margins & Performance Bonuses</p>
                        </motion.div>

                        {/* Layer 2: The Speed */}
                        <motion.div
                            className="bg-white border-l-4 border-gray-200 p-4 rounded shadow-sm w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <p className="font-bold text-gray-900 text-sm">Fast Delivery & Localized Support</p>
                        </motion.div>

                        {/* Layer 3: The Flexibility */}
                        <motion.div
                            className="bg-white border-l-4 border-gray-200 p-4 rounded shadow-sm w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <p className="font-bold text-gray-900 text-sm">Flexible MOQ (Minimum Order Quantity)</p>
                        </motion.div>

                        {/* Layer 4: The Foundation */}
                        <motion.div
                            className="bg-white border-l-4 border-gray-200 p-4 rounded shadow-sm w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="font-bold text-gray-900 text-sm">100% Stock Buyback & Zero Dead Stock Risk</p>
                        </motion.div>
                    </div>
                </div>

                <div className="md:w-1/3 w-full bg-white rounded-lg shadow-2xl p-6 text-gray-800 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!isSuccess ? (
                            <motion.form
                                key="form"
                                className="space-y-4"
                                onSubmit={handleSubmit}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Name</label>
                                    <input required type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-red-500 transition-colors" placeholder="Your Name" />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Phone</label>
                                    <input required type="tel" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-red-500 transition-colors" placeholder="e.g. +919812345678" />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Area / Pincode</label>
                                    <input required type="text" className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-red-500 transition-colors" />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Business Type</label>
                                    <select className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:border-red-500 transition-colors">
                                        <option>Shopkeeper</option>
                                        <option>Distributor</option>
                                        <option>Wholesaler</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-red-700 text-white font-bold py-3 rounded mt-2 flex justify-center items-center"
                                    whileHover={{ scale: 1.02, backgroundColor: '#991B1B' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        "Submit Enquiry"
                                    )}
                                </motion.button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                className="flex flex-col items-center justify-center py-10 space-y-4 text-center"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                >
                                    <CheckCircle size={64} className="text-green-500" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
                                <p className="text-gray-600">We have received your enquiry and will contact you shortly.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
};

export default PartnerForm;
