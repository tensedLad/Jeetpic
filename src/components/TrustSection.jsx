import React from 'react';
import { CheckCircle, MapPin, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustSection = () => {
    const items = [
        {
            icon: <CheckCircle className="text-black" size={32} />,
            title: "Quality Guarantee",
            desc: "100% money back if not satisfied."
        },
        {
            icon: <MapPin className="text-black" size={32} />,
            title: "Made in Kolkata",
            desc: "Locally manufactured excellence."
        },
        {
            icon: <Info className="text-black" size={32} />,
            title: "Local Support",
            desc: "Customer support just a call away."
        }
    ];

    return (
        <section className="py-10 px-6 md:px-12 text-gray-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-10 md:gap-20">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                        <motion.div
                            className="bg-white/10 p-3 rounded-full backdrop-blur-md"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            {item.icon}
                        </motion.div>
                        <div className="text-black">
                            <h4 className="font-bold">{item.title}</h4>
                            <p className="text-xs text-gray-900 w-full md:max-w-[150px]">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* Local Pride Section (Added based on request logic) */}
            <motion.div
                className="text-center mt-8 text-gray-800 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
            >
                <p className="text-sm italic font-medium">Proudly serving West Bengal since 2025.</p>
            </motion.div>
        </section>
    );
};

export default TrustSection;
