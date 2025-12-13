import React from 'react';
import { ShieldCheck, Droplet, Smile, Wallet } from 'lucide-react';

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
        <section id="why-jeetpic" className="pb-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white drop-shadow-sm">The Jeetpic Promise</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {promises.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-gray-800 shadow-lg border border-blue-100 hover:shadow-xl transition">
                            <div className="p-3 bg-blue-900 text-white rounded-full">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromiseSection;
