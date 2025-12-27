/**
 * Input Sanitization & Validation Utilities
 * Protects against XSS, injection, and data corruption
 */

/**
 * Sanitize string input - removes dangerous HTML/scripts
 */
export const sanitizeString = (input) => {
    if (typeof input !== 'string') return input;
    
    // Remove HTML tags and scripts - use basic approach without DOMPurify
    let cleaned = String(input)
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[<>\"'`;&${}()\[\]]/g, '') // Remove dangerous chars
        .trim();
    
    // Limit length
    return cleaned.substring(0, 200);
};

/**
 * Validate and sanitize phone number
 */
export const sanitizePhone = (phone) => {
    if (!phone) return '';
    
    // Remove all non-numeric characters
    const cleaned = String(phone).replace(/\D/g, '');
    
    // Check length (Indian phone: 10 digits)
    if (cleaned.length !== 10) {
        throw new Error('Phone must be 10 digits');
    }
    
    return cleaned;
};

/**
 * Validate and sanitize email
 */
export const sanitizeEmail = (email) => {
    if (!email) return '';
    
    const cleaned = String(email).toLowerCase().trim();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleaned)) {
        throw new Error('Invalid email format');
    }
    
    return cleaned;
};

/**
 * Validate positive number
 */
export const validateNumber = (num, min = 0, max = 999999) => {
    const parsed = parseFloat(num);
    
    if (isNaN(parsed) || parsed < min || parsed > max) {
        throw new Error(`Number must be between ${min} and ${max}`);
    }
    
    return parsed;
};

/**
 * Validate positive integer
 */
export const validateInteger = (num, min = 0, max = 999999) => {
    const parsed = parseInt(num);
    
    if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
        throw new Error(`Must be whole number between ${min} and ${max}`);
    }
    
    return parsed;
};

/**
 * Sanitize cart data before storing
 */
export const sanitizeCartData = (cartData) => {
    return {
        items: sanitizeItems(cartData.items),
        customerName: cartData.customerName ? sanitizeString(cartData.customerName) : null,
        customerPhone: cartData.customerPhone ? sanitizePhone(cartData.customerPhone) : null,
        customerEmail: cartData.customerEmail ? sanitizeEmail(cartData.customerEmail) : null,
        customerAddress: cartData.customerAddress ? sanitizeString(cartData.customerAddress) : null,
        customerPincode: cartData.customerPincode ? sanitizeString(cartData.customerPincode) : null,
        totalValue: validateNumber(cartData.totalValue),
        timestamp: Date.now(),
        recovered: false,
        checkoutStarted: false,
        abandoned: false
    };
};

/**
 * Validate and sanitize items array
 */
export const sanitizeItems = (items) => {
    if (!Array.isArray(items)) {
        throw new Error('Items must be array');
    }
    
    if (items.length === 0) {
        throw new Error('Cart cannot be empty');
    }
    
    return items.map(item => {
        if (!item.productId || !item.name || item.quantity === undefined || item.price === undefined) {
            throw new Error('Item missing required fields: productId, name, quantity, price');
        }
        
        return {
            productId: sanitizeString(item.productId),
            name: sanitizeString(item.name),
            quantity: validateInteger(item.quantity, 1, 100),
            price: validateNumber(item.price, 0, 100000)
        };
    });
};

/**
 * Validate product ID format (alphanumeric and underscore only)
 */
export const validateProductId = (id) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(String(id))) {
        throw new Error('Invalid product ID format');
    }
    return String(id);
};

/**
 * Validate session ID format
 */
export const validateSessionId = (id) => {
    if (!/^[a-zA-Z0-9_-]{10,}$/.test(String(id))) {
        throw new Error('Invalid session ID format');
    }
    return String(id);
};

/**
 * Remove dangerous characters from string
 */
export const removeDangerousChars = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/[<>"'`;&${}\[\]()]/g, '');
};

/**
 * Escape HTML special characters
 */
export const escapeHtml = (str) => {
    if (typeof str !== 'string') return str;
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return str.replace(/[&<>"']/g, (char) => map[char]);
};

/**
 * Sanitize order data before creation
 */
export const sanitizeOrderData = (orderData) => {
    return {
        amount: validateNumber(orderData.amount, 0.01, 100000),
        customerName: orderData.customerName ? sanitizeString(orderData.customerName) : null,
        customerPhone: orderData.customerPhone ? sanitizePhone(orderData.customerPhone) : null,
        customerEmail: orderData.customerEmail ? sanitizeEmail(orderData.customerEmail) : null,
        items: orderData.items ? sanitizeItems(orderData.items) : []
    };
};
