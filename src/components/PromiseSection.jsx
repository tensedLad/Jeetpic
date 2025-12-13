import React from 'react';
import { ShieldCheck, Droplet, Smile, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
const PromiseSection = () => {
    const promises = [
        {
            icon: <ShieldCheck size={28} />,
            title: "99.9% Germ Kill",
            desc: "Clinically effective germ elimination."
        },
        {
            icon: <Droplet size={28} />,
            title: "Thick Formula",
            desc: "Clings to rim for longer contact."
        },
        {
            icon: <Smile size={28} />,
            title: "Pleasant Fragrance",
            desc: "Fresh fragrance that lasts."
        },
        {
            icon: <Wallet size={28} />,
            title: "Pocket Friendly",
            desc: "High performance at a lower price."
        }
    ];

    return (
        <section id="why-jeetpic" className="pb-20 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <motion.h2
                        className="text-3xl font-bold text-white drop-shadow-sm"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        The Jeetpic Promise
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {promises.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-gray-800 shadow-lg border border-blue-100"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <motion.div
                                className="p-3 bg-blue-900 text-white rounded-full bg-linear-to-br from-blue-800 to-blue-900"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                {item.icon}
                            </motion.div>
                            <div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Simulated Bottom Badge Growth */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <span className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-semibold border border-white/20">
                        Top Rated in Kolkata 🌟
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default PromiseSection;
