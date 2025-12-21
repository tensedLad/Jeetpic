import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import FloatingLemons from './FloatingLemons';

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

    const handlePlaceOrder = async () => {
        if (!details.name || !details.phone || !details.address) {
            alert('Please fill in all required fields');
            return;
        }

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
                const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(fallbackMessage)}`;
                window.location.href = whatsappUrl;
            }
        } catch (error) {
            console.error('Order placement failed:', error);
            // Fallback to WhatsApp
            const fallbackMessage = `*NEW ORDER* 🚀\n------------------\n*Name:* ${details.name}\n*Location:* ${details.address} (${details.pincode})\n------------------\n*Items:*\n${Object.entries(cart).filter(([_, qty]) => qty > 0).map(([id, qty]) => `• ${products.find(p => p.id === id).name} x ${qty}`).join('\n')}\n------------------\n*Total to Pay: ₹${calculateTotal().total}* (COD)`;
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(fallbackMessage)}`;
            window.location.href = whatsappUrl;
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
                    {/* Products */}
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

                    {/* Customer Details */}
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

                    {/* Order Summary */}
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
                                    Place Order on WhatsApp
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Detail Overlay */}
            {selectedProduct && (
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
                                                className={`w-2 h-2 rounded-full transition-colors ${
                                                    index === currentImageIndex[selectedProduct.id]
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
    );
};

export default QuickStorePage;