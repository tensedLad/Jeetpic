import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
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
                    <h1 className="text-3xl font-bold">Privacy Policy</h1>
                    <p className="text-white/70 mt-2">Last updated: December 27, 2024</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Welcome to Jeetpic Industries ("Company", "we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>jeetpic.store</strong> and use our services.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Information We Collect</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We collect personal information that you voluntarily provide to us when you place an order, express an interest in obtaining information about us or our products and services, or otherwise contact us.
                        </p>
                        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Personal Information Provided by You:</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Name:</strong> Full name for order processing and delivery.</li>
                            <li><strong>Phone Number:</strong> For order updates and delivery coordination.</li>
                            <li><strong>Delivery Address:</strong> Complete address including house number, building, street, city, and pincode.</li>
                            <li><strong>Payment Information:</strong> When you make a payment, our payment processor (Razorpay) securely handles your payment details. We do not store your credit/debit card information.</li>
                        </ul>
                        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">Information Automatically Collected:</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Device and browser information</li>
                            <li>IP address</li>
                            <li>Usage patterns and browsing behavior on our website</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Your Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We use personal information collected via our website for a variety of business purposes:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>To process and fulfill your orders</li>
                            <li>To manage your account and provide customer support</li>
                            <li>To send you order confirmations, updates, and delivery notifications</li>
                            <li>To process payments securely through Razorpay</li>
                            <li>To improve our website and optimize user experience</li>
                            <li>To respond to your inquiries and solve any issues</li>
                            <li>To send promotional communications (with your consent)</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Sharing Your Information</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We may share your information in the following situations:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Payment Processors:</strong> We share payment data with Razorpay for secure transaction processing.</li>
                            <li><strong>Delivery Partners:</strong> Your name, phone number, and address are shared with logistics partners to fulfill delivery.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal requests.</li>
                            <li><strong>Business Transfers:</strong> In case of a merger, acquisition, or sale of assets, your data may be transferred.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Data Security</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            Payment transactions are processed through Razorpay, which is PCI-DSS compliant and uses industry-standard encryption to protect your financial data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Data Retention</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Your Privacy Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            You have certain rights regarding your personal data:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Access:</strong> You can request access to the personal data we hold about you.</li>
                            <li><strong>Correction:</strong> You can request that we correct inaccurate personal data.</li>
                            <li><strong>Deletion:</strong> You can request that we delete your personal data, subject to certain exceptions.</li>
                            <li><strong>Opt-out:</strong> You can opt out of marketing communications at any time.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            To exercise these rights, please contact us at <strong>care.jeetpic@gmail.com</strong> or <strong>+91 81002 46362</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Cookies and Tracking</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may use cookies and similar tracking technologies to access or store information. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Third-Party Services</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of these third-party sites. We encourage you to read the privacy policy of every website you visit.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            We use <strong>Razorpay</strong> for payment processing. Razorpay's privacy policy can be found at <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://razorpay.com/privacy/</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Changes to This Policy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have questions or comments about this policy, you may contact us at:
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

export default PrivacyPolicy;
