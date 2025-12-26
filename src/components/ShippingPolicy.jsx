import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ShippingPolicy = () => {
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
                    <h1 className="text-3xl font-bold">Shipping & Delivery Policy</h1>
                    <p className="text-white/70 mt-2">Last updated: December 27, 2024</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Overview</h2>
                        <p className="text-gray-600 leading-relaxed">
                            At <strong>Jeetpic Industries</strong>, we are committed to delivering your orders in a timely and efficient manner. This Shipping & Delivery Policy outlines our shipping methods, estimated delivery times, and related information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Shipping Coverage</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            We currently ship to all serviceable pin codes across India. Delivery availability is subject to our logistics partners' coverage in your area.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            If your pin code is not serviceable, you will be notified during the checkout process or by our customer support team.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Shipping Charges</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li><strong>Free Shipping:</strong> Currently, we offer FREE shipping on all orders (promotional offer, subject to change).</li>
                            <li>Standard shipping charges, if applicable, will be displayed at checkout.</li>
                            <li>Remote or hard-to-reach areas may incur additional charges.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Estimated Delivery Time</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            Delivery times vary based on your location:
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Location</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Estimated Delivery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-3 text-gray-600 border-b">Metro Cities (Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad)</td>
                                        <td className="px-4 py-3 text-gray-600 border-b">3-5 Business Days</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-gray-600 border-b">Tier 2 & Tier 3 Cities</td>
                                        <td className="px-4 py-3 text-gray-600 border-b">5-7 Business Days</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-gray-600">Remote/Rural Areas</td>
                                        <td className="px-4 py-3 text-gray-600">7-10 Business Days</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            <strong>Note:</strong> Business days are Monday to Saturday, excluding public holidays. Delivery times are estimates and may vary due to unforeseen circumstances.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Order Processing</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            Orders are processed within <strong>1-2 business days</strong> after confirmation. You will receive:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>An order confirmation with your invoice immediately after placing the order.</li>
                            <li>A shipping notification with tracking details once your order is dispatched.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Order Tracking</h2>
                        <p className="text-gray-600 leading-relaxed">
                            We deliver products through <strong>India Post</strong>. To track your order status, please contact our support team via phone or email with your Order ID, and we will provide you with the latest update on your shipment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Delivery Attempts</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            Our delivery partners will make <strong>up to 3 attempts</strong> to deliver your order. If delivery is unsuccessful after 3 attempts:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>The package will be returned to our warehouse.</li>
                            <li>For prepaid orders, a refund will be initiated after deducting applicable shipping charges.</li>
                            <li>For COD orders, no action is required from your end.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Incorrect Address</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Please ensure that you provide accurate and complete delivery information. We are not responsible for delays or non-delivery due to incorrect, incomplete, or outdated addresses provided by the customer. Address changes after dispatch may not be possible.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Damaged or Lost Shipments</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            If your package arrives damaged or is lost during transit:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                            <li>Contact us within <strong>48 hours</strong> of delivery (for damaged products).</li>
                            <li>Provide photos/videos of the damaged packaging and product.</li>
                            <li>We will arrange for a replacement or refund as per our Refund Policy.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Delays</h2>
                        <p className="text-gray-600 leading-relaxed">
                            While we strive to deliver on time, delays may occur due to:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-2">
                            <li>Natural disasters, extreme weather conditions</li>
                            <li>Public holidays and festival seasons</li>
                            <li>Government regulations or restrictions</li>
                            <li>Logistics partner operational issues</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-3">
                            In case of significant delays, we will keep you informed via email or phone.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Contact Us</h2>
                        <p className="text-gray-600 leading-relaxed">
                            For any shipping-related queries, please contact us:
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

export default ShippingPolicy;
