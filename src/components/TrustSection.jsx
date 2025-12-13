import React from 'react';
import { CheckCircle, MapPin, Info } from 'lucide-react';

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
        <section className="py-10 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-10 md:gap-20">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-full backdrop-blur-md">
                            {item.icon}
                        </div>
                        <div className="text-black">
                            <h4 className="font-bold">{item.title}</h4>
                            <p className="text-xs text-gray-900 max-w-[150px]">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustSection;
