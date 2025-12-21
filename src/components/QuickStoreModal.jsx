import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, Truck, CreditCard } from 'lucide-react';

const products = [
  {
    id: 'jeetpic',
    name: 'Jeetpic Toilet Cleaner',
    price: 150,
    image: '/jeetpic.png', // Assuming image path
  },
  {
    id: 'winyle',
    name: 'Winyle Floor Cleaner',
    price: 120,
    image: '/winyle.png',
  },
  {
    id: 'phynyl',
    name: 'Winyle Phynyl',
    price: 80,
    image: '/phynyl.png',
  },
  {
    id: 'combo',
    name: 'Combo Pack (2 Jeetpic + 1 Winyle)',
    price: 399,
    image: '/combo.png',
    bestSeller: true,
  },
];

const QuickStoreModal = ({ isOpen, onClose }) => {
  const [cart, setCart] = useState({});
  const [details, setDetails] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);

  const updateCart = (productId, delta) => {
    setCart(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }));
  };

  const subtotal = products.reduce((sum, product) => {
    return sum + (cart[product.id] || 0) * product.price;
  }, 0);

  const gst = subtotal * 0.18;
  const shipping = subtotal > 299 ? 0 : 40;
  const total = subtotal + gst + shipping;

  const handleInputChange = (field, value) => {
    setDetails(prev => ({ ...prev, [field]: value }));
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
        amount: total,
      };

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const { whatsappUrl } = await response.json();
        window.location.href = whatsappUrl;
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      // Fallback: generate WhatsApp URL client-side
      const orderId = `JP-${Date.now().toString().slice(-3)}`;
      const message = `*NEW ORDER: #${orderId}* 🚀
------------------
*Name:* ${details.name}
*Location:* ${details.address} (${details.pincode})
------------------
*Items:*
${Object.entries(cart).map(([id, qty]) => {
  const product = products.find(p => p.id === id);
  return qty > 0 ? `• ${product.name} x ${qty}` : '';
}).filter(Boolean).join('\n')}
------------------
*Total to Pay: ₹${total}* (COD)`;

      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Shop Jeetpic</h2>
                <button onClick={onClose} className="text-white hover:text-gray-200">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Products */}
              <div className="space-y-4">
                {products.map(product => (
                  <div key={product.id} className="flex items-center border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-red-600 font-bold">₹{product.price}</p>
                      {product.bestSeller && (
                        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-1">
                          Best Seller
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCart(product.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{cart[product.id] || 0}</span>
                      <button
                        onClick={() => updateCart(product.id, 1)}
                        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Details */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Delivery Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={details.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={details.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Address *"
                    value={details.address}
                    onChange={e => handleInputChange('address', e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={details.pincode}
                    onChange={e => handleInputChange('pincode', e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST (18%):</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={loading || total === 0}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>Place Order on WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickStoreModal;