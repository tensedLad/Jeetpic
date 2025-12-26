import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsAndConditions = () => {
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
                    <h1 className="text-3xl font-bold">Terms and Conditions</h1>
                    <p className="text-white/70 mt-2">Last updated: December 27, 2024</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Agreement to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and <strong>Jeetpic Industries</strong> ("Company", "we", "us", or "our"), concerning your access to and use of the <strong>jeetpic.store</strong> website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms and Conditions, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Products and Services</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We offer the following products through our website:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Jeetpic Toilet Cleaner</li>
                            <li>Winyle Floor Cleaner</li>
                            <li>Winyle Phynyl</li>
                            <li>Combo Packs and other cleaning products</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            All products are subject to availability. We reserve the right to discontinue any product at any time. Product descriptions, images, and prices are subject to change without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Pricing and Payment</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            <strong>Pricing:</strong> All prices displayed on our website are in Indian Rupees (INR) and include applicable taxes (GST) unless otherwise stated.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            <strong>Payment Methods:</strong> We accept the following payment methods:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Online Payment:</strong> Credit/Debit Cards, UPI, Net Banking, Wallets (via Razorpay)</li>
                            <li><strong>Cash on Delivery (COD):</strong> Pay in cash at the time of delivery</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            <strong>Prepaid Discount:</strong> Orders paid online may be eligible for discounts as displayed at checkout. These offers are subject to change.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            All payments are processed securely through <strong>Razorpay</strong>. We do not store your complete credit/debit card details on our servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Order Placement and Acceptance</h2>
                        <p className="text-gray-600 leading-relaxed">
                            When you place an order through our website, you are making an offer to purchase the products. We reserve the right to accept or reject your order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraudulent activity.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            An order confirmation will be sent to you upon successful placement. This confirmation is an acknowledgment and does not constitute acceptance. Acceptance occurs when we dispatch the order.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Delivery</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We aim to deliver products within 3-7 business days from the date of order confirmation, depending on your location. Delivery times may vary due to unforeseen circumstances.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Free shipping may be available on select orders as displayed during checkout.</li>
                            <li>You are responsible for providing accurate delivery information.</li>
                            <li>Risk of loss and title for products passes to you upon delivery.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">6. User Responsibilities</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            By using this website, you represent and warrant that:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>You are at least 18 years of age or have parental/guardian consent.</li>
                            <li>All information you provide is accurate, current, and complete.</li>
                            <li>You will not use the site for any unlawful or unauthorized purpose.</li>
                            <li>You will not attempt to interfere with the proper functioning of the website.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Intellectual Property</h2>
                        <p className="text-gray-600 leading-relaxed">
                            All content on this website, including but not limited to text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of Jeetpic Industries and is protected by Indian and international copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Limitation of Liability</h2>
                        <p className="text-gray-600 leading-relaxed">
                            In no event shall Jeetpic Industries, its directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Indemnification</h2>
                        <p className="text-gray-600 leading-relaxed">
                            You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of your use of the Site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Governing Law</h2>
                        <p className="text-gray-600 leading-relaxed">
                            These Terms shall be governed by and defined following the laws of India. Jeetpic Industries and yourself irrevocably consent that the courts of Kolkata, West Bengal shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Changes to Terms</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Terms and Conditions. It is your responsibility to periodically review these Terms and Conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have any questions about these Terms and Conditions, you can contact us:
                        </p>
                        <div className="bg-gray-50 rounded-xl p-6 mt-4">
                            <p className="font-bold text-gray-800">Jeetpic Industries</p>
                            <p className="text-gray-600">XYZ Street, Kolkata</p>
                            <p className="text-gray-600">West Bengal, India</p>
                            <p className="text-gray-600 mt-2">Email: <strong>care.jeetpic@gmail.com</strong></p>
                            <p className="text-gray-600">Phone: <strong>+91 81002 46362</strong></p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
