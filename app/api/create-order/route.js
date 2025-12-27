import { NextResponse } from 'next/server';

// Input validation utilities
const validateAndSanitize = (input) => {
  if (typeof input !== 'string') return '';
  return String(input)
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>\"'`;&${}()\[\]]/g, '') // Remove dangerous chars
    .trim()
    .substring(0, 500);
};

const validatePhone = (phone) => {
  if (!phone) return '';
  const cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.length !== 10) {
    throw new Error('Invalid phone number (must be 10 digits)');
  }
  return cleaned;
};

const validateEmail = (email) => {
  if (!email) return '';
  const cleaned = String(email).toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleaned)) {
    throw new Error('Invalid email format');
  }
  return cleaned;
};

const validateAmount = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0) {
    throw new Error('Invalid amount: must be a positive number');
  }
  return num;
};

// Product data for message generation
const products = {
  jeetpic: { name: 'Jeetpic Toilet Cleaner', price: 150 },
  winyle: { name: 'Winyle Floor Cleaner', price: 120 },
  phynyl: { name: 'Winyle Phynyl', price: 80 },
  combo: { name: 'Combo Pack (2 Jeetpic + 1 Winyle)', price: 399 },
};

// Verify amount matches items (anti-fraud)
const verifyAmountMatchesItems = (items, amount) => {
  let calculatedTotal = 0;
  
  for (const [productId, quantity] of Object.entries(items)) {
    if (!products[productId]) {
      throw new Error(`Invalid product ID: ${productId}`);
    }
    
    const qty = parseInt(quantity) || 0;
    if (qty < 0) {
      throw new Error(`Invalid quantity for ${productId}`);
    }
    
    calculatedTotal += products[productId].price * qty;
  }
  
  // Allow small floating point differences
  if (Math.abs(calculatedTotal - amount) > 0.01) {
    throw new Error(`Amount mismatch: expected ${calculatedTotal}, got ${amount}`);
  }
  
  return true;
};

export async function POST(request) {
  try {
    // Verify request method and content type
    if (request.method !== 'POST') {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const { customer, items, amount } = await request.json();

    // Validate required fields
    if (!customer || !items || amount === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: customer, items, amount' },
        { status: 400 }
      );
    }

    // SECURITY: Validate and sanitize customer data
    if (!customer.name || customer.name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      );
    }

    const sanitizedCustomer = {
      name: validateAndSanitize(customer.name),
      phone: customer.phone ? validatePhone(customer.phone) : '',
      address: validateAndSanitize(customer.address || ''),
      pincode: validateAndSanitize(customer.pincode || ''),
    };

    // SECURITY: Validate amount
    const validatedAmount = validateAmount(amount);

    // SECURITY: Validate items and verify amount
    if (!Array.isArray(Object.keys(items)) || Object.keys(items).length === 0) {
      return NextResponse.json(
        { error: 'At least one item is required' },
        { status: 400 }
      );
    }

    // SECURITY: Verify amount matches items (anti-fraud check)
    try {
      verifyAmountMatchesItems(items, validatedAmount);
    } catch (error) {
      console.error('Amount verification failed:', error.message);
      return NextResponse.json(
        { error: 'Order validation failed: ' + error.message },
        { status: 400 }
      );
    }

    // Create order with sanitized data
    const order = new Order({
      customer: sanitizedCustomer,
      items,
      amount: validatedAmount,
    });

    await order.save();

    // Generate order ID
    const orderId = `JP-${order._id.toString().slice(-3).toUpperCase()}`;

    // Generate WhatsApp message with sanitized data
    const itemsText = Object.entries(items)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => `• ${products[id].name} x ${qty}`)
      .join('\n');

    const message = `*NEW ORDER: #${orderId}* 🚀
------------------
*Name:* ${sanitizedCustomer.name}
*Location:* ${sanitizedCustomer.address} (${sanitizedCustomer.pincode || 'N/A'})
*Phone:* ${sanitizedCustomer.phone}
------------------
*Items:*
${itemsText}
------------------
*Total to Pay: ₹${validatedAmount}* (COD)`;

    // WhatsApp URL (replace with actual business number)
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;

    // SECURITY: Log order for audit trail
    console.log(`✅ Order created: ${orderId}`, {
      amount: validatedAmount,
      itemCount: Object.values(items).reduce((sum, qty) => sum + qty, 0),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ whatsappUrl, orderId }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: 'Failed to create order. Please try again.' },
      { status: 500 }
    );
  }
}