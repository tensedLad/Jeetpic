import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RefundPolicy = () => {
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
                    <h1 className="text-3xl font-bold">Refund & Cancellation Policy</h1>
                    <p className="text-white/70 mt-2">Last updated: December 27, 2024</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Overview</h2>
                        <p className="text-gray-600 leading-relaxed">
                            At <strong>Jeetpic Industries</strong>, we strive to ensure complete customer satisfaction. This Refund & Cancellation Policy outlines the conditions under which you may cancel an order or request a refund for products purchased through our website <strong>jeetpic.store</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Order Cancellation</h2>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Before Dispatch:</h3>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            You may cancel your order at any time before it is dispatched. To cancel, please contact us immediately via:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Phone: <strong>+91 81002 46362</strong></li>
                            <li>Email: <strong>care.jeetpic@gmail.com</strong></li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            For prepaid orders, a full refund will be processed within 5-7 business days of cancellation.
                        </p>

                        <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">After Dispatch:</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Once an order has been dispatched, it cannot be cancelled. However, you may refuse to accept the delivery, in which case the product will be returned to us. For prepaid orders, a refund will be initiated after we receive the returned product, minus any applicable shipping charges.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Refund Eligibility</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We offer refunds under the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Damaged Products:</strong> If you receive a product that is damaged during transit.</li>
                            <li><strong>Wrong Product:</strong> If you receive a product different from what you ordered.</li>
                            <li><strong>Defective Products:</strong> If the product is defective or does not function as intended.</li>
                            <li><strong>Missing Items:</strong> If items from your order are missing upon delivery.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            <strong>Note:</strong> Refund requests must be raised within <strong>48 hours of delivery</strong>. Requests made after this period may not be entertained.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Non-Refundable Situations</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            Refunds will not be provided in the following cases:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Products that have been opened, used, or tampered with (unless defective).</li>
                            <li>Change of mind after order placement and dispatch.</li>
                            <li>Damage caused by misuse or improper handling by the customer.</li>
                            <li>Products purchased during promotional sales marked as "Final Sale" or "Non-Returnable".</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Refund Process</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            To request a refund, follow these steps:
                        </p>
                        <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-4">
                            <li>Contact us at <strong>care.jeetpic@gmail.com</strong> or <strong>+91 81002 46362</strong> within 48 hours of delivery.</li>
                            <li>Provide your Order ID, reason for refund, and supporting photos/videos (if applicable).</li>
                            <li>Our team will review your request and respond within 2-3 business days.</li>
                            <li>If approved, the product may need to be returned (at our expense for eligible cases).</li>
                            <li>Refund will be processed within <strong>5-7 business days</strong> after approval/return receipt.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Refund Methods</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            Refunds will be credited to the original payment method:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Online Payments (Razorpay):</strong> Refunded to the same credit/debit card, UPI, or bank account used for payment.</li>
                            <li><strong>Cash on Delivery (COD):</strong> Refunded via bank transfer (NEFT/IMPS). You will need to provide your bank account details.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Replacement Policy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            For damaged or defective products, we may offer a replacement instead of a refund, subject to stock availability. The replacement will be shipped at no additional cost to you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Late or Missing Refunds</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            If you haven't received a refund yet:
                        </p>
                        <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-4">
                            <li>Check your bank account again.</li>
                            <li>Contact your credit card company, as it may take some time for the refund to be officially posted.</li>
                            <li>Contact your bank, as there is often some processing time.</li>
                            <li>If you've done all of this and still have not received your refund, please contact us at <strong>care.jeetpic@gmail.com</strong>.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            For any questions or concerns regarding refunds and cancellations, please contact us:
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

export default RefundPolicy;
