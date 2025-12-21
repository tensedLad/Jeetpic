import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

// Order Schema
const OrderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String,
    pincode: String,
  },
  items: Object, // { productId: quantity }
  amount: Number,
  status: { type: String, default: 'PENDING' },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

// Product data for message generation
const products = {
  jeetpic: { name: 'Jeetpic Toilet Cleaner', price: 150 },
  winyle: { name: 'Winyle Floor Cleaner', price: 120 },
  phynyl: { name: 'Winyle Phynyl', price: 80 },
  combo: { name: 'Combo Pack (2 Jeetpic + 1 Winyle)', price: 399 },
};

export async function POST(request) {
  try {
    await connectDB();

    const { customer, items, amount } = await request.json();

    // Create order
    const order = new Order({
      customer,
      items,
      amount,
    });

    await order.save();

    // Generate order ID
    const orderId = `JP-${order._id.toString().slice(-3).toUpperCase()}`;

    // Generate WhatsApp message
    const itemsText = Object.entries(items)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => `• ${products[id].name} x ${qty}`)
      .join('\n');

    const message = `*NEW ORDER: #${orderId}* 🚀
------------------
*Name:* ${customer.name}
*Location:* ${customer.address} (${customer.pincode || 'N/A'})
------------------
*Items:*
${itemsText}
------------------
*Total to Pay: ₹${amount}* (COD)`;

    // WhatsApp URL (replace with actual business number)
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

    return NextResponse.json({ whatsappUrl, orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}