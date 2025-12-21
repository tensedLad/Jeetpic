import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import FloatingLemons from './FloatingLemons';
import { database } from '../firebase';
import { ref, push, set, query, orderByChild, limitToLast, get } from 'firebase/database';
import pdfMake from "pdfmake/build/pdfmake";
import { generateInvoiceNumber, getInvoiceDocDefinition } from '../utils/invoiceGenerator';

const QuickStorePage = () => {
    const [cart, setCart] = useState({
        jeetpic: 0,
        winyle: 0,
        phynyl: 0,
        combo: 0
    });

    const [currentImageIndex, setCurrentImageIndex] = useState({
        jeetpic: 0,
        winyle: 0,
        phynyl: 0,
        combo: 0
    });

    const [details, setDetails] = useState({
        name: '',
        phone: '',
        address: '',
        pincode: ''
    });

    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [storedOrderData, setStoredOrderData] = useState(null);

    // Check for stored order data on component mount
    useEffect(() => {
        const storedData = localStorage.getItem('jeetpic_order_data');
        if (storedData) {
            try {
                const orderData = JSON.parse(storedData);
                setStoredOrderData(orderData);
                setOrderPlaced(true);
                // Clear the stored data after showing confirmation
                localStorage.removeItem('jeetpic_order_data');
            } catch (error) {
                console.error('Error parsing stored order data:', error);
                localStorage.removeItem('jeetpic_order_data');
            }
        }
    }, []);

    const products = [
        {
            id: 'jeetpic',
            name: 'Jeetpic Toilet Cleaner',
            price: 150,
            images: [
                '/jeetpic.png',
                'https://via.placeholder.com/150x150?text=Jeetpic+Label',
                'https://via.placeholder.com/150x150?text=Jeetpic+Back'
            ],
            description: 'Better Shine, Less Time',
            specs: '500ml • 99.9% Germ Kill'
        },
        {
            id: 'winyle',
            name: 'Winyle Floor Cleaner',
            price: 120,
            images: [
                '/winyle.png',
                'https://via.placeholder.com/150x150?text=Winyle+Label',
                'https://via.placeholder.com/150x150?text=Winyle+Usage'
            ],
            description: 'Clean floors effortlessly',
            specs: '1L • Multi-Surface'
        },
        {
            id: 'phynyl',
            name: 'Winyle Phynyl',
            price: 80,
            images: [
                '/phynyl.png',
                'https://via.placeholder.com/150x150?text=Phynyl+Label',
                'https://via.placeholder.com/150x150?text=Phynyl+Ingredients'
            ],
            description: 'Powerful disinfectant',
            specs: '500ml • Hospital Grade'
        },
        {
            id: 'combo',
            name: 'Combo Pack (2 Jeetpic + 1 Winyle)',
            price: 399,
            images: [
                '/combo.png',
                'https://via.placeholder.com/150x150?text=Combo+Pack+Open',
                'https://via.placeholder.com/150x150?text=Combo+Contents'
            ],
            description: 'Best Seller - Save more!',
            specs: '2.5L Total • Complete Kit',
            bestseller: true
        }
    ];

    const updateQuantity = (productId, change) => {
        setCart(prev => ({
            ...prev,
            [productId]: Math.max(0, prev[productId] + change)
        }));
    };

    const navigateImage = (productId, direction) => {
        setCurrentImageIndex(prev => {
            const currentIndex = prev[productId];
            const product = products.find(p => p.id === productId);
            const maxIndex = product.images.length - 1;

            if (direction === 'next') {
                return { ...prev, [productId]: currentIndex >= maxIndex ? 0 : currentIndex + 1 };
            } else {
                return { ...prev, [productId]: currentIndex <= 0 ? maxIndex : currentIndex - 1 };
            }
        });
    };

    const calculateTotal = () => {
        const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
            const product = products.find(p => p.id === id);
            return sum + (product.price * qty);
        }, 0);

        const gst = subtotal * 0.18;
        const shipping = subtotal > 299 ? 0 : 40;
        const total = subtotal + gst + shipping;

        return { subtotal, gst, shipping, total };
    };

    const nextStep = () => {
        if (currentStep === 1 && totalItems === 0) {
            alert('Please select at least one product');
            return;
        }
        if (currentStep === 2 && (!details.name || !details.phone || !details.address)) {
            alert('Please fill in all required delivery details');
            return;
        }
        setCurrentStep(prev => Math.min(3, prev + 1));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(1, prev - 1));
    };

    const handleSendToWhatsApp = async () => {
        setLoading(true);

        try {
            const orderData = {
                customer: details,
                items: cart,
                amount: calculateTotal().total
            };

            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (result.whatsappUrl) {
                window.location.href = result.whatsappUrl;
            } else {
                // Fallback
                const fallbackMessage = `*NEW ORDER* 🚀\n------------------\n*Name:* ${details.name}\n*Location:* ${details.address} (${details.pincode})\n------------------\n*Items:*\n${Object.entries(cart).filter(([_, qty]) => qty > 0).map(([id, qty]) => `• ${products.find(p => p.id === id).name} x ${qty}`).join('\n')}\n------------------\n*Total to Pay: ₹${calculateTotal().total}* (COD)`;
                const whatsappUrl = `https://wa.me/919830117727?text=${encodeURIComponent(fallbackMessage)}`;
                window.location.href = whatsappUrl;
            }
        } catch (error) {
            console.error('Order placement failed:', error);
            // Fallback to WhatsApp
            const fallbackMessage = `*NEW ORDER* 🚀\n------------------\n*Name:* ${details.name}\n*Location:* ${details.address} (${details.pincode})\n------------------\n*Items:*\n${Object.entries(cart).filter(([_, qty]) => qty > 0).map(([id, qty]) => `• ${products.find(p => p.id === id).name} x ${qty}`).join('\n')}\n------------------\n*Total to Pay: ₹${calculateTotal().total}* (COD)`;
            const whatsappUrl = `https://wa.me/919830117727?text=${encodeURIComponent(fallbackMessage)}`;
            window.location.href = whatsappUrl;
        } finally {
            setLoading(false);
        }
    };

    const generateInvoicePDF = (orderData) => {
        const docDefinition = getInvoiceDocDefinition(orderData);
        pdfMake.createPdf(docDefinition).download(`Jeetpic_Invoice_${orderData.orderNumberFormatted}.pdf`);
    };

    const handlePlaceOrder = async () => {
        if (!details.name || !details.phone || !details.address) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);

        try {
            const orderRef = ref(database, 'orders');

            // 1. Fetch last invoice number
            let lastInvoiceNumber = null;
            // Use default ordering (by key) which is chronological for Firebase push IDs
            // This avoids the need for manual index creation on 'orderNumberFormatted'
            const lastOrderQuery = query(orderRef, limitToLast(1));
            const snapshot = await get(lastOrderQuery);

            if (snapshot.exists()) {
                const lastOrder = Object.values(snapshot.val())[0];
                lastInvoiceNumber = lastOrder.orderNumberFormatted;
            }

            // 2. Generate new invoice number
            const newInvoiceNumber = generateInvoiceNumber(lastInvoiceNumber);

            const newOrderRef = push(orderRef);

            const timestamp = new Date().toISOString();

            // Create list of processed items for easier invoice generation later
            const processedItems = Object.entries(cart)
                .filter(([_, qty]) => qty > 0)
                .map(([id, qty]) => {
                    const product = products.find(p => p.id === id);
                    return {
                        name: product.name,
                        quantity: qty,
                        price: product.price,
                        total: product.price * qty
                    };
                });

            const orderData = {
                orderId: newOrderRef.key,
                orderNumber: newInvoiceNumber, // Legacy ID for fallback
                orderNumberFormatted: newInvoiceNumber, // New Main ID
                timestamp: timestamp,
                customer: details,
                items: cart,
                processedItems: processedItems, // Saved for easy invoice gen
                totals: calculateTotal(),
                status: 'pending', // Initial status
                device: 'web'
            };

            // Push to Firebase
            await set(newOrderRef, orderData);

            // Store for confirmation page
            setStoredOrderData(orderData);
            setOrderPlaced(true);

            // Generate PDF immediately
            generateInvoicePDF(orderData);

            // Clear local storage if any (legacy)
            localStorage.removeItem('jeetpic_order_data');

        } catch (error) {
            console.error('Order placement failed:', error);
            alert(`Error: ${error.message}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const { subtotal, gst, shipping, total } = calculateTotal();
    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-white text-white relative">
            <FloatingLemons />
            <div className="relative z-10">
                {orderPlaced ? (
                    /* Order Confirmation Page - Only show invoice */
                    <div className="max-w-4xl mx-auto p-6">
                        <div className="bg-white text-gray-900 rounded-lg shadow-md p-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
                                <p className="text-gray-600">Your invoice has been downloaded automatically.</p>
                            </div>

                            <h3 className="text-xl font-semibold mb-6 text-center">Order Invoice</h3>

                            {/* Invoice Header */}
                            <div className="border-b border-gray-200 pb-4 mb-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold text-lg">Jeetpic Order</h4>
                                        <p className="text-sm text-gray-600">Order #{storedOrderData ? storedOrderData.orderNumber : Date.now()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Date: {storedOrderData ? new Date(storedOrderData.timestamp).toLocaleDateString() : new Date().toLocaleDateString()}</p>
                                        <p className="text-sm text-gray-600">Payment: Cash on Delivery</p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Details */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold mb-2">Delivery Details</h4>
                                <div className="text-sm space-y-1">
                                    <p><span className="font-medium">Name:</span> {storedOrderData ? storedOrderData.customer.name : details.name}</p>
                                    <p><span className="font-medium">Phone:</span> {storedOrderData ? storedOrderData.customer.phone : details.phone}</p>
                                    <p><span className="font-medium">Address:</span> {storedOrderData ? storedOrderData.customer.address : details.address}</p>
                                    {(storedOrderData ? storedOrderData.customer.pincode : details.pincode) && <p><span className="font-medium">Pincode:</span> {storedOrderData ? storedOrderData.customer.pincode : details.pincode}</p>}
                                </div>
                            </div>

                            {/* Products Table */}
                            <div className="mb-6">
                                <h4 className="font-semibold mb-3">Items Ordered</h4>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-semibold">Product</th>
                                                <th className="px-4 py-2 text-center text-sm font-semibold">Qty</th>
                                                <th className="px-4 py-2 text-right text-sm font-semibold">Unit Price</th>
                                                <th className="px-4 py-2 text-right text-sm font-semibold">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(storedOrderData ? storedOrderData.items : cart).filter(([_, qty]) => qty > 0).map(([id, qty]) => {
                                                const product = products.find(p => p.id === id);
                                                return (
                                                    <tr key={id} className="border-t border-gray-200">
                                                        <td className="px-4 py-3">
                                                            <div>
                                                                <p className="font-medium text-sm">{product.name}</p>
                                                                <p className="text-xs text-gray-500">{product.specs}</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-center text-sm">{qty}</td>
                                                        <td className="px-4 py-3 text-right text-sm">₹{product.price}</td>
                                                        <td className="px-4 py-3 text-right text-sm font-medium">₹{(product.price * qty).toFixed(2)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal ({storedOrderData ? Object.values(storedOrderData.items).reduce((sum, qty) => sum + qty, 0) : totalItems} items):</span>
                                        <span>₹{(storedOrderData ? storedOrderData.totals.subtotal : subtotal).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>GST (18%):</span>
                                        <span>₹{(storedOrderData ? storedOrderData.totals.gst : gst).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping:</span>
                                        <span className={(storedOrderData ? storedOrderData.totals.shipping : shipping) === 0 ? 'text-green-600 font-medium' : ''}>
                                            {(storedOrderData ? storedOrderData.totals.shipping : shipping) === 0 ? 'FREE' : `₹${storedOrderData ? storedOrderData.totals.shipping : shipping}`}
                                        </span>
                                    </div>
                                    <hr className="my-3" />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total Amount:</span>
                                        <span className="text-red-600">₹{(storedOrderData ? storedOrderData.totals.total : total).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                    <p className="text-green-800 font-medium">✅ Your order has been successfully placed!</p>
                                    <p className="text-green-600 text-sm mt-1">Your invoice has been downloaded automatically.</p>
                                </div>
                                <button
                                    onClick={() => generateInvoicePDF(storedOrderData)}
                                    className="bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-900 flex items-center justify-center gap-2 mx-auto mb-4"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Invoice Again
                                </button>
                                <button
                                    onClick={() => {
                                        // Reset the form for a new order
                                        setCart({
                                            jeetpic: 0,
                                            winyle: 0,
                                            phynyl: 0,
                                            combo: 0
                                        });
                                        setDetails({
                                            name: '',
                                            phone: '',
                                            address: '',
                                            pincode: ''
                                        });
                                        setCurrentStep(1);
                                        setOrderPlaced(false);
                                        setStoredOrderData(null);
                                    }}
                                    className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 mx-auto"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Place New Order
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Full Shop Interface */
                    <>
                        {/* Header */}
                        <div className="bg-[#B91C1C] text-white p-6">
                            <div className="max-w-4xl mx-auto flex items-center justify-between">
                                <h1 className="text-3xl font-bold">Shop Jeetpic</h1>
                                <div className="text-center">
                                    <p className="text-lg font-semibold">100% Swadeshi</p>
                                </div>
                                <motion.button
                                    className="bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-lg flex items-center gap-2 border border-white"
                                    whileHover={{ scale: 1.05, backgroundColor: '#991B1B' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="text-sm">{totalItems} items</span>
                                </motion.button>
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto p-6">
                            {/* Step Indicator */}
                            <div className="flex justify-center mb-8">
                                <div className="flex items-center space-x-4">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-300'}`}>
                                        1
                                    </div>
                                    <div className={`w-12 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-300'}`}>
                                        2
                                    </div>
                                    <div className={`w-12 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= 3 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 text-gray-300'}`}>
                                        3
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold">
                                    {currentStep === 1 && 'Select Products'}
                                    {currentStep === 2 && 'Delivery Details'}
                                    {currentStep === 3 && 'Review Order'}
                                </h2>
                            </div>
                            {currentStep === 1 && (
                                <div className="space-y-4 mb-8">
                                    {products.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            className="bg-white text-gray-900 rounded-lg border border-gray-100 shadow-md p-6 flex items-center gap-6 cursor-pointer"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            whileHover={{
                                                scale: 1.005,
                                                y: -1,
                                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                                backgroundColor: 'rgba(249, 250, 251, 0.8)'
                                            }}
                                            whileTap={{ scale: 0.995 }}
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                // Reset to first image when opening detail
                                                setCurrentImageIndex(prev => ({ ...prev, [product.id]: 0 }));
                                            }}
                                        >
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-24 h-24 object-cover rounded-xl bg-gray-100"
                                                    onError={(e) => e.target.src = `https://via.placeholder.com/150x150?text=${product.name}`}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg text-slate-800 mb-1">{product.name}</h3>
                                                <p className="text-gray-500 text-sm mb-2">{product.specs}</p>
                                                <p className="text-red-600 font-bold text-xl">₹{product.price}</p>
                                                {product.bestseller && (
                                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded mt-2 inline-block">Best Seller</span>
                                                )}
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center bg-gray-100 rounded-full p-1">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateQuantity(product.id, -1);
                                                        }}
                                                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4 text-gray-600" />
                                                    </button>
                                                    <span className="mx-3 font-bold text-gray-800 min-w-[2rem] text-center">{cart[product.id]}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            updateQuantity(product.id, 1);
                                                        }}
                                                        className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Customer Details */}
                            {currentStep === 2 && (
                                <div className="bg-white text-gray-900 rounded-lg shadow-md p-6 mb-8">
                                    <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Full Name *"
                                            value={details.name}
                                            onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))}
                                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number *"
                                            value={details.phone}
                                            onChange={(e) => setDetails(prev => ({ ...prev, phone: e.target.value }))}
                                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <textarea
                                            placeholder="Full Address *"
                                            value={details.address}
                                            onChange={(e) => setDetails(prev => ({ ...prev, address: e.target.value }))}
                                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                                            rows="3"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Pincode"
                                            value={details.pincode}
                                            onChange={(e) => setDetails(prev => ({ ...prev, pincode: e.target.value }))}
                                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Order Summary */}
                            {currentStep === 3 && (
                                <div className="bg-white text-gray-900 rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between">
                                            <span>Subtotal:</span>
                                            <span>₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>GST (18%):</span>
                                            <span>₹{gst.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping:</span>
                                            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total:</span>
                                            <span>₹{total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading || totalItems === 0}
                                        className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-5 h-5" />
                                                Place Order
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Back
                                </button>
                                {currentStep < 3 ? (
                                    <button
                                        onClick={nextStep}
                                        className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700"
                                    >
                                        Next
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </>
                )}

                {/* Product Detail Overlay */}
                {selectedProduct && !orderPlaced && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>

                            {/* Left Side - Image with Slider */}
                            <div className="md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
                                <img
                                    src={selectedProduct.images[currentImageIndex[selectedProduct.id]]}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => e.target.src = `https://via.placeholder.com/600x600?text=${selectedProduct.name}`}
                                />

                                {/* Navigation buttons for large image */}
                                {selectedProduct.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => navigateImage(selectedProduct.id, 'prev')}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => navigateImage(selectedProduct.id, 'next')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>

                                        {/* Image indicators */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {selectedProduct.images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(prev => ({ ...prev, [selectedProduct.id]: index }))}
                                                    className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex[selectedProduct.id]
                                                        ? 'bg-white'
                                                        : 'bg-white/50 hover:bg-white/70'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right Side - Details */}
                            <div className="md:w-1/2 p-8 flex flex-col">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                                    <p className="text-gray-600 text-sm mb-4">{selectedProduct.specs}</p>
                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        {selectedProduct.description}. Experience the power of premium cleaning with our specially formulated products that deliver exceptional results every time.
                                    </p>
                                    <div className="text-3xl font-bold text-red-600 mb-4">₹{selectedProduct.price}</div>
                                    {selectedProduct.bestseller && (
                                        <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">Best Seller</span>
                                    )}
                                </div>

                                {/* Quantity Controls - Bottom */}
                                <div className="mt-8">
                                    <div className="flex items-center justify-center bg-gray-100 rounded-full p-2">
                                        <button
                                            onClick={() => updateQuantity(selectedProduct.id, -1)}
                                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                        >
                                            <Minus className="w-6 h-6 text-gray-600" />
                                        </button>
                                        <span className="mx-6 font-bold text-2xl text-gray-800 min-w-[3rem] text-center">{cart[selectedProduct.id]}</span>
                                        <button
                                            onClick={() => updateQuantity(selectedProduct.id, 1)}
                                            className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                        >
                                            <Plus className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default QuickStorePage;