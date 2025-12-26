import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-[#2563EB] text-white py-6 px-4">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>
                    <h1 className="text-3xl font-bold">Contact Us</h1>
                    <p className="text-white/70 mt-2">We're here to help!</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-lg p-8">

                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Get in Touch</h2>
                        <p className="text-gray-600">
                            Have questions about our products or your order? We'd love to hear from you. Reach out to us using any of the methods below.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Phone */}
                        <div className="bg-blue-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Phone className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                                <p className="text-gray-600 text-sm mb-2">Call us for immediate assistance</p>
                                <a href="tel:+918100246362" className="text-blue-600 font-bold text-lg hover:underline">
                                    +91 81002 46362
                                </a>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-green-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Mail className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                                <p className="text-gray-600 text-sm mb-2">Send us an email anytime</p>
                                <a href="mailto:care.jeetpic@gmail.com" className="text-green-600 font-bold text-lg hover:underline">
                                    care.jeetpic@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-purple-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Address</h3>
                                <p className="text-gray-600 text-sm mb-2">Visit our registered office</p>
                                <p className="text-purple-600 font-medium">
                                    XYZ Street<br />
                                    Kolkata<br />
                                    West Bengal, India
                                </p>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-orange-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Business Hours</h3>
                                <p className="text-gray-600 text-sm mb-2">We're available during</p>
                                <p className="text-orange-600 font-medium">
                                    Monday - Saturday<br />
                                    10:00 AM - 7:00 PM IST
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp CTA */}
                    <div className="mt-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-center text-white">
                        <h3 className="text-xl font-bold mb-2">Quick Support via WhatsApp</h3>
                        <p className="text-green-100 mb-4">
                            Get instant responses to your queries on WhatsApp!
                        </p>
                        <a
                            href="https://wa.me/918100246362?text=Hi%2C%20I%20have%20a%20query%20about%20Jeetpic%20products."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-green-600 font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-10 border-t border-gray-200 pt-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="font-semibold text-gray-800">How can I track my order?</p>
                                <p className="text-gray-600 text-sm mt-1">
                                    Once your order is shipped, you will receive a tracking number via SMS/Email. You can use this to track your shipment.
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="font-semibold text-gray-800">What if I receive a damaged product?</p>
                                <p className="text-gray-600 text-sm mt-1">
                                    Please contact us within 48 hours of delivery with photos/videos of the damage. We will arrange a replacement or refund.
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="font-semibold text-gray-800">How long does delivery take?</p>
                                <p className="text-gray-600 text-sm mt-1">
                                    Delivery typically takes 3-7 business days depending on your location. Metro cities receive orders faster.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;
