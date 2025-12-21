import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
const ComparisonTable = () => {
    const stats = [
        { feature: "Where your money goes", jeetpic: "Stays in India", other: "Foreign MNC", isJeetpicBetter: true },
        { feature: "Formula Density", jeetpic: "Extra Thick", other: "Standard", isJeetpicBetter: true },
        { feature: "Scrubbing Effort", jeetpic: "2-3 minutes", other: "5-7 minutes", isJeetpicBetter: true },
        { feature: "Hard Water Action", jeetpic: "Effective Cleaning", other: "Loses Power", isJeetpicBetter: true },
        { feature: "Fragrance", jeetpic: "Long-lasting Fresh", other: "Moderate", isJeetpicBetter: true },
    ];

    return (
        <section id="why-jeetpic" className="py-16 px-6 md:px-12 text-center relative overflow-hidden scroll-mt-32">
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">See why Jeetpic is the smarter choice</h2>
                    <p className="text-blue-100 mb-10">Better Performance. Lower Price. Maximum Profit.</p>
                </motion.div>

                <motion.div
                    className="max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl bg-white overflow-x-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-white text-lg">
                                <th className="p-5 font-bold bg-gray-800">Feature</th>
                                <th className="p-5 font-bold bg-blue-800">Jeetpic</th>
                                <th className="p-5 font-bold bg-red-700">Leading Brand</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                                >
                                    <td className="p-4 font-semibold text-gray-800">{row.feature}</td>
                                    <td className="p-4 font-bold text-gray-900 bg-blue-50/50">
                                        <div className="flex items-center gap-2">
                                            {row.isJeetpicBetter === true && <Check className="text-green-600" size={20} />}
                                            {row.isJeetpicBetter === "equal" && <span className="w-5"></span>}
                                            {row.jeetpic}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        <div className="flex items-center gap-2">
                                            {row.isJeetpicBetter === true && <X className="text-red-500" size={20} />}
                                            {row.isJeetpicBetter === "equal" && <span className="w-5"></span>}
                                            {row.other}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    <motion.div
                        className="p-6 bg-gray-50 bg-linear-to-b from-gray-50 to-gray-100"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="text-xl font-bold text-gray-900">Better Shine, Less Time. The new standard for Indian toilets.</h3>


                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default ComparisonTable;
