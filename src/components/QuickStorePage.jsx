import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingCart, X, ChevronLeft, ChevronRight, Download, CreditCard, User, Phone, MapPin, Hash, ShoppingBag, Truck, ClipboardCheck } from 'lucide-react';
import FloatingLemons from './FloatingLemons';
import { database } from '../firebase';
import { ref, push, set, query, orderByChild, limitToLast, get } from 'firebase/database';
import pdfMake from "pdfmake/build/pdfmake";
import { generateInvoiceNumber, getInvoiceDocDefinition } from '../utils/invoiceGenerator';
import { usePageTracking, useCartTracking } from '../hooks/useTracking';
import { trackConversion, trackCheckoutStarted } from '../utils/trackingService';

const QuickStorePage = () => {
    const navigate = useNavigate();
    usePageTracking('QuickStorePage');
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

    const [processingMethod, setProcessingMethod] = useState(null);
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
            mrp: 199,
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
            mrp: 179,
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
            mrp: 129,
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
            mrp: 559,
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

    // Track cart changes (after products defined)
    useCartTracking(Object.values(cart).some(qty => qty > 0) ? Object.entries(cart).filter(([_, qty]) => qty > 0).map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        return {
            productId: id,
            name: product?.name || id,
            price: product?.price || 0,
            quantity: qty,
        };
    }) : []);

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
        const shipping = 0; // Test Mode: Free Shipping
        const total = subtotal + gst + shipping;

        return { subtotal, gst, shipping, total };
    };

    // Validation function to prevent ghost orders
    const validateDeliveryDetails = () => {
        const errors = [];

        // Name validation: 2+ characters, only letters/spaces/hyphens
        if (!details.name || details.name.trim().length === 0) {
            errors.push('Name is required');
        } else if (details.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters');
        } else if (!/^[a-zA-Z\s\-]+$/.test(details.name)) {
            errors.push('Name can only contain letters, spaces, and hyphens');
        }

        // Phone validation: exactly 10 digits
        if (!details.phone || details.phone.length === 0) {
            errors.push('Phone number is required');
        } else if (details.phone.length !== 10) {
            errors.push('Phone number must be exactly 10 digits');
        } else if (!/^[0-9]{10}$/.test(details.phone)) {
            errors.push('Phone number must contain only digits');
        }

        // Address validation: 5+ characters
        if (!details.address || details.address.trim().length === 0) {
            errors.push('Address is required');
        } else if (details.address.trim().length < 5) {
            errors.push('Address must be at least 5 characters');
        }

        // Pincode validation: exactly 6 digits (Indian format)
        if (!details.pincode || details.pincode.length === 0) {
            errors.push('Pincode is required');
        } else if (details.pincode.length !== 6) {
            errors.push('Pincode must be exactly 6 digits');
        } else if (!/^[0-9]{6}$/.test(details.pincode)) {
            errors.push('Pincode must contain only digits');
        }

        return errors;
    };

    const nextStep = () => {
        if (currentStep === 1 && totalItems === 0) {
            alert('Please select at least one product');
            return;
        }
        
        if (currentStep === 2) {
            // Validate delivery details
            const validationErrors = validateDeliveryDetails();
            
            if (validationErrors.length > 0) {
                alert('Please fix the following issues:\n\n' + validationErrors.join('\n'));
                return;
            }
            
            // Track checkout initiation when moving to payment step (step 3)
            trackCheckoutStarted(details);
        }
        
        setCurrentStep(prev => Math.min(3, prev + 1));
    };

    const prevStep = () => {
        if (currentStep === 1) {
            navigate('/');
        } else {
            setCurrentStep(prev => Math.max(1, prev - 1));
        }
    };

    const handleSendToWhatsApp = async () => {
        // Validate delivery details before sending to WhatsApp
        const validationErrors = validateDeliveryDetails();
        
        if (validationErrors.length > 0) {
            alert('Cannot place order. Please fix the following issues:\n\n' + validationErrors.join('\n'));
            return;
        }

        setProcessingMethod('whatsapp');

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
                const whatsappUrl = `https://wa.me/918100246362?text=${encodeURIComponent(fallbackMessage)}`;
                window.location.href = whatsappUrl;
            }
        } catch (error) {
            console.error('Order placement failed:', error);
            // Fallback to WhatsApp
            const fallbackMessage = `*NEW ORDER* 🚀\n------------------\n*Name:* ${details.name}\n*Location:* ${details.address} (${details.pincode})\n------------------\n*Items:*\n${Object.entries(cart).filter(([_, qty]) => qty > 0).map(([id, qty]) => `• ${products.find(p => p.id === id).name} x ${qty}`).join('\n')}\n------------------\n*Total to Pay: ₹${calculateTotal().total}* (COD)`;
            const whatsappUrl = `https://wa.me/918100246362?text=${encodeURIComponent(fallbackMessage)}`;
            window.location.href = whatsappUrl;
        } finally {
            setProcessingMethod(null);
        }
    };

    const generateInvoicePDF = (orderData) => {
        const docDefinition = getInvoiceDocDefinition(orderData);
        pdfMake.createPdf(docDefinition).download(`Jeetpic_Invoice_${orderData.orderNumberFormatted}.pdf`);
    };

    const handlePlaceOrder = async () => {
        // Validate delivery details before placing order
        const validationErrors = validateDeliveryDetails();
        
        if (validationErrors.length > 0) {
            alert('Cannot place order. Please fix the following issues:\n\n' + validationErrors.join('\n'));
            return;
        }

        setProcessingMethod('cod');

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

            // Track conversion
            const totalAmount = calculateTotal().total;
            await trackConversion(newOrderRef.key, {
                amount: totalAmount,
                items: processedItems,
                customerEmail: details.email || null,
                customerPhone: details.phone || null,
            });

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
            setProcessingMethod(null);
        }
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePrepaidOrder = async () => {
        // Validate delivery details before processing payment
        const validationErrors = validateDeliveryDetails();
        
        if (validationErrors.length > 0) {
            alert('Cannot process payment. Please fix the following issues:\n\n' + validationErrors.join('\n'));
            return;
        }

        const res = await loadRazorpay();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        // Calculate discounted amount (10% OFF)
        const { total } = calculateTotal();
        const discountAmount = total * 0.10;
        const amountToPay = total - discountAmount;

        const options = {
            key: "rzp_live_RukKQgoFRuX0bR", // LIVE Key
            amount: Math.round(amountToPay * 100), // Amount in paise
            currency: "INR",
            name: "Jeetpic Store",
            description: "Instant 10% Discount Applied",
            image: "/jeetpic.png", // Ensure this path is correct
            handler: async function (response) {
                // Payment Successful
                // alert("Payment Successful. Payment ID: " + response.razorpay_payment_id);

                // Save Order to Firebase
                setProcessingMethod('prepaid');
                try {
                    const orderRef = ref(database, 'orders');

                    // 1. Fetch last invoice number
                    let lastInvoiceNumber = null;
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
                        orderNumber: newInvoiceNumber,
                        orderNumberFormatted: newInvoiceNumber,
                        timestamp: timestamp,
                        customer: details,
                        items: cart,
                        processedItems: processedItems,
                        totals: calculateTotal(),
                        status: 'paid', // Mark as PAID
                        paymentMethod: 'prepaid',
                        paymentId: response.razorpay_payment_id,
                        discount: discountAmount,
                        finalHeading: amountToPay,
                        device: 'web'
                    };

                    await set(newOrderRef, orderData);

                    setStoredOrderData(orderData);
                    setOrderPlaced(true);
                    generateInvoicePDF(orderData);
                    localStorage.removeItem('jeetpic_order_data');

                } catch (error) {
                    console.error('Order placement failed:', error);
                    alert(`Error processing order: ${error.message}. Please contact support with Payment ID: ${response.razorpay_payment_id}`);
                } finally {
                    setProcessingMethod(null);
                }
            },
            prefill: {
                name: details.name,
                contact: details.phone
            },
            notes: {
                address: details.address
            },
            theme: {
                color: "#166534" // Green color to match the button
            }
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on('payment.failed', function (response) {
            console.error("PAYMENT FAILED:", response.error);
            alert("Payment Failed. Please try again or choose Cash on Delivery.");
        });

        paymentObject.open();
    };

    const { subtotal, gst, shipping, total } = calculateTotal();
    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

    return (
        <div className="h-screen overflow-hidden bg-[#2563EB] text-white relative flex flex-col">
            <FloatingLemons />
            <div className="relative z-10 flex flex-col h-full overflow-hidden">
                {orderPlaced ? (
                    /* Order Confirmation Page - Only show invoice */
                    <div className="max-w-4xl mx-auto p-6 w-full flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        <div className="bg-white text-gray-900 rounded-lg shadow-md p-6 mb-4">
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
                                        <p className="text-sm text-gray-600">Date: {storedOrderData ? new Date(storedOrderData.timestamp).toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }) : new Date().toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</p>
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

                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={() => generateInvoicePDF(storedOrderData)}
                                    className="bg-white text-blue-600 py-3 px-6 rounded-xl font-bold hover:bg-gray-100 flex items-center justify-center gap-2 shadow-lg border border-blue-100 transition-all active:scale-95 w-full sm:w-auto"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Invoice
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
                                    className="bg-white text-green-600 py-3 px-6 rounded-xl font-bold hover:bg-gray-100 flex items-center justify-center gap-2 shadow-lg border border-green-100 transition-all active:scale-95 w-full sm:w-auto"
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
                        <div className="bg-[#B91C1C] text-white p-5 flex-shrink-0">
                            <div className="max-w-4xl mx-auto flex items-center justify-between">
                                <h1 className="text-3xl font-bold">Shop Jeetpic</h1>
                                <div className="text-center">
                                    <p className="text-lg font-semibold">100% Swadeshi</p>
                                </div>
                                <motion.button
                                    className="bg-white text-blue-600 font-bold py-1.5 px-4 rounded-lg shadow-lg flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    <span className="text-xs uppercase tracking-wider">{totalItems} Items</span>
                                </motion.button>
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto flex-1 flex flex-col overflow-hidden w-full p-4">
                            {/* Step Indicator */}
                            <div className="flex justify-center mb-6 flex-shrink-0">
                                <div className="flex items-center space-x-4">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-lg ${currentStep >= 1 ? 'border-white bg-white text-blue-600' : 'border-white/30 text-white/70'}`}>
                                        1
                                    </div>
                                    <div className={`w-10 h-0.5 ${currentStep >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-lg ${currentStep >= 2 ? 'border-white bg-white text-blue-600' : 'border-white/30 text-white/70'}`}>
                                        2
                                    </div>
                                    <div className={`w-10 h-0.5 ${currentStep >= 3 ? 'bg-white' : 'bg-white/30'}`}></div>
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold text-lg ${currentStep >= 3 ? 'border-white bg-white text-blue-600' : 'border-white/30 text-white/70'}`}>
                                        3
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-5 flex-shrink-0">
                                <h2 className="text-xl font-bold">
                                    {currentStep === 3 && 'Review Order'}
                                </h2>
                            </div>
                            {currentStep === 1 && (
                                <div className="space-y-3 mb-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="bg-white rounded-3xl shadow-xl p-4">
                                        <div className="flex flex-col items-center justify-center mb-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                                <ShoppingBag className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h2 className="text-xl font-bold text-gray-800">Select Products</h2>
                                        </div>

                                        <div className="space-y-3">
                                            {products.map((product) => (
                                                <motion.div
                                                    layout
                                                    key={product.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        // Reset to first image when opening detail
                                                        setCurrentImageIndex(prev => ({ ...prev, [product.id]: 0 }));
                                                    }}
                                                    className="bg-slate-50 rounded-xl p-3 flex items-center gap-3 cursor-pointer relative overflow-hidden group hover:bg-slate-100 transition-colors border border-slate-100"
                                                >
                                                    <div className="w-14 h-14 bg-white rounded-lg flex-shrink-0 p-1.5 border border-slate-200">
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => e.target.src = `https://via.placeholder.com/150x150?text=${product.name}`}
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-base text-slate-800 mb-0.5 leading-tight">{product.name}</h3>
                                                        <p className="text-gray-500 text-xs mb-0.5">{product.specs}</p>
                                                        <div className="flex items-center gap-2">
                                                            {product.mrp > product.price && (
                                                                <span className="text-gray-400 text-xs line-through">₹{product.mrp}</span>
                                                            )}
                                                            <p className="text-red-600 font-bold text-lg">₹{product.price}</p>
                                                        </div>
                                                        {product.bestseller && (
                                                            <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded mt-0.5 inline-block uppercase tracking-wider font-bold">Best Seller</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <div className="flex items-center justify-between bg-white rounded-full p-1 w-20 border border-slate-200 shadow-sm">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    updateQuantity(product.id, -1);
                                                                }}
                                                                className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                                            >
                                                                <Minus className="w-3 h-3 text-gray-600" />
                                                            </button>
                                                            <span className="font-bold text-gray-800 text-sm">{cart[product.id]}</span>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    updateQuantity(product.id, 1);
                                                                }}
                                                                className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Customer Details */}
                            {currentStep === 2 && (
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-6 mb-4">
                                        <div className="flex flex-col items-center justify-center mb-8">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                                                <Truck className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-800">Delivery Details</h2>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Name Input */}
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Full Name *"
                                                    value={details.name}
                                                    onChange={(e) => {
                                                        // Filter: Only letters, spaces, and hyphens
                                                        const filtered = e.target.value.replace(/[^a-zA-Z\s\-]/g, '');
                                                        setDetails(prev => ({ ...prev, name: filtered }));
                                                    }}
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl py-3.5 pl-11 pr-4 text-gray-800 placeholder-gray-400 font-medium transition-all focus:bg-white focus:outline-none focus:shadow-sm"
                                                    required
                                                />
                                            </div>

                                            {/* Phone Input */}
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number *"
                                                    value={details.phone}
                                                    onChange={(e) => {
                                                        // Filter: Only numbers (integers)
                                                        const filtered = e.target.value.replace(/[^0-9]/g, '');
                                                        setDetails(prev => ({ ...prev, phone: filtered }));
                                                    }}
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl py-3.5 pl-11 pr-4 text-gray-800 placeholder-gray-400 font-medium transition-all focus:bg-white focus:outline-none focus:shadow-sm"
                                                    required
                                                />
                                            </div>

                                            {/* Address Input */}
                                            <div className="relative group">
                                                <div className="absolute top-3.5 left-4 pointer-events-none">
                                                    <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                </div>
                                                <textarea
                                                    placeholder="Full Address (House No, Building, Street) *"
                                                    value={details.address}
                                                    onChange={(e) => setDetails(prev => ({ ...prev, address: e.target.value }))}
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl py-3.5 pl-11 pr-4 text-gray-800 placeholder-gray-400 font-medium transition-all focus:bg-white focus:outline-none focus:shadow-sm min-h-[100px] resize-none"
                                                    required
                                                />
                                            </div>

                                            {/* Pincode Input */}
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Hash className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Pincode / Zip Code *"
                                                    value={details.pincode}
                                                    onChange={(e) => {
                                                        // Filter: Only numbers (integers)
                                                        const filtered = e.target.value.replace(/[^0-9]/g, '');
                                                        setDetails(prev => ({ ...prev, pincode: filtered }));
                                                    }}
                                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl py-3.5 pl-11 pr-4 text-gray-800 placeholder-gray-400 font-medium transition-all focus:bg-white focus:outline-none focus:shadow-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Order Summary */}
                            {currentStep === 3 && (
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-6 mb-4">
                                        <div className="flex flex-col items-center justify-center mb-8">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                                                <ClipboardCheck className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                                        </div>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex justify-between items-center text-gray-600">
                                                <span className="font-medium">Subtotal:</span>
                                                <span className="font-bold text-gray-800">₹{subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-gray-600">
                                                <span className="font-medium">GST (18%):</span>
                                                <span className="font-bold text-gray-800">₹{gst.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-gray-600">
                                                <span className="font-medium">Shipping:</span>
                                                <span className={`font-bold ${shipping === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                                                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                                                </span>
                                            </div>
                                            <div className="border-t border-dashed border-gray-300 my-4"></div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-black text-xl text-gray-900">Total:</span>
                                                <span className="font-black text-2xl text-blue-600">₹{total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handlePrepaidOrder}
                                            disabled={processingMethod !== null || totalItems === 0}
                                            className="w-full bg-white text-blue-600 py-4 px-6 rounded-xl font-bold hover:bg-gray-100 shadow-xl transform transition-all active:scale-95 mb-4 flex items-center justify-center gap-3 border-2 border-green-500 relative overflow-hidden group"
                                        >
                                            <div className="absolute top-0 right-0 bg-yellow-400 text-[10px] font-black px-2 py-0.5 transform translate-x-2 -translate-y-1 rotate-12 shadow-sm text-blue-900 uppercase">
                                                SAVE 10%
                                            </div>
                                            {processingMethod === 'prepaid' ? (
                                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <CreditCard className="w-6 h-6 text-green-600 animate-pulse" />
                                            )}
                                            <div className="flex flex-col items-center">
                                                <span className="text-lg leading-none uppercase tracking-tight">{processingMethod === 'prepaid' ? 'Processing...' : 'Online Payment (10% OFF)'}</span>
                                                {processingMethod !== 'prepaid' && <span className="text-xs font-semibold text-green-600 mt-1">Pay ₹{(total * 0.9).toFixed(2)} with Discount</span>}
                                            </div>
                                        </button>

                                        <div className="relative flex py-2 items-center mb-4">
                                            <div className="flex-grow border-t border-gray-300"></div>
                                            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">OR PAY ON DELIVERY</span>
                                            <div className="flex-grow border-t border-gray-300"></div>
                                        </div>

                                        <button
                                            onClick={handlePlaceOrder}
                                            disabled={processingMethod !== null || totalItems === 0}
                                            className="w-full bg-white text-blue-600 py-3.5 px-6 rounded-xl font-bold hover:bg-gray-100 shadow-lg disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-95 border border-blue-100"
                                        >
                                            {processingMethod === 'cod' ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-5 h-5 text-red-600" />
                                                    <span className="uppercase tracking-wide">Cash on Delivery</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-auto pt-4 pb-2 flex-shrink-0">
                                <button
                                    onClick={prevStep}
                                    className="bg-white text-blue-600 py-3 px-10 rounded-xl font-bold hover:bg-gray-100 text-base transition-all shadow-lg active:scale-95 uppercase tracking-wide"
                                >
                                    Back
                                </button>
                                {currentStep < 3 ? (
                                    <button
                                        onClick={nextStep}
                                        className="bg-white text-blue-600 py-3 px-12 rounded-xl font-bold hover:bg-gray-100 shadow-xl transform transition-all active:scale-95 text-base uppercase tracking-wide"
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


                            {/* Left Side - Image with Slider */}
                            <div className="md:w-1/2 h-72 md:h-auto bg-gradient-to-br from-gray-50 to-gray-200 relative p-8 flex items-center justify-center group">
                                <motion.img
                                    key={currentImageIndex[selectedProduct.id]}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    src={selectedProduct.images[currentImageIndex[selectedProduct.id]]}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-contain drop-shadow-xl"
                                    onError={(e) => e.target.src = `https://via.placeholder.com/600x600?text=${selectedProduct.name}`}
                                />

                                {/* Navigation buttons for large image */}
                                {selectedProduct.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => navigateImage(selectedProduct.id, 'prev')}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all shadow-md opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => navigateImage(selectedProduct.id, 'next')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all shadow-md opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>

                                        {/* Image indicators */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {selectedProduct.images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(prev => ({ ...prev, [selectedProduct.id]: index }))}
                                                    className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex[selectedProduct.id]
                                                        ? 'bg-blue-600 w-4'
                                                        : 'bg-gray-400 hover:bg-gray-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right Side - Details */}
                            <div className="md:w-1/2 p-8 flex flex-col bg-white">
                                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 leading-tight mb-2">{selectedProduct.name}</h2>
                                            <p className="text-blue-600 font-bold text-sm bg-blue-50 inline-block px-3 py-1 rounded-full">{selectedProduct.specs}</p>
                                        </div>
                                    </div>

                                    <div className="prose prose-sm text-gray-600 mb-8 max-w-none leading-relaxed">
                                        <p>{selectedProduct.description}. Experience premium cleaning power with our specially formulated solution.</p>
                                    </div>

                                    <div className="flex flex-col gap-0 mb-6">
                                        {selectedProduct.mrp && selectedProduct.mrp > selectedProduct.price && (
                                            <span className="text-gray-400 text-xl font-bold decoration-2" style={{ textDecoration: 'line-through' }}>₹{selectedProduct.mrp}</span>
                                        )}
                                        <div className="flex items-center gap-4">
                                            <span className="text-4xl font-black text-red-600 tracking-tight">₹{selectedProduct.price}</span>
                                            {selectedProduct.bestseller && (
                                                <span className="bg-red-100 text-red-700 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wide border border-red-200">
                                                    Best Seller
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Control Bar */}
                                <div className="mt-4 bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-100">
                                    <div className="flex items-center gap-3 bg-white rounded-full p-1.5 shadow-sm border border-gray-200">
                                        <button
                                            onClick={() => updateQuantity(selectedProduct.id, -1)}
                                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="font-bold text-xl text-gray-900 min-w-[2rem] text-center">{cart[selectedProduct.id]}</span>
                                        <button
                                            onClick={() => updateQuantity(selectedProduct.id, 1)}
                                            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm active:scale-95"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Total</p>
                                        <p className="text-2xl font-black text-gray-900">₹{(selectedProduct.price * cart[selectedProduct.id]).toFixed(0)}</p>
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