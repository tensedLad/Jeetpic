import { database } from '../firebase';
import { ref, set, push, update, get, query, orderByChild, limitToLast } from 'firebase/database';
import { sanitizeCartData, sanitizeOrderData, sanitizePhone, sanitizeEmail } from './inputSanitization';

const generateSessionId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getSessionId = () => {
    let sessionId = sessionStorage.getItem('jeetpic_session_id');
    if (!sessionId) {
        sessionId = generateSessionId();
        sessionStorage.setItem('jeetpic_session_id', sessionId);
    }
    return sessionId;
};

// 1. LIVE VISITORS TRACKING
export const trackLiveVisitor = async () => {
    try {
        const sessionId = getSessionId();
        const visitorRef = ref(database, `liveVisitors/${sessionId}`);
        
        const visitorData = {
            sessionId,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct',
            url: window.location.pathname,
            lastActive: Date.now(),
        };
        
        await set(visitorRef, visitorData);
        
        // Update heartbeat every 30 seconds
        const heartbeatInterval = setInterval(async () => {
            try {
                await update(visitorRef, { lastActive: Date.now() });
            } catch (error) {
                clearInterval(heartbeatInterval);
            }
        }, 30000);
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(heartbeatInterval);
        });
        
        return sessionId;
    } catch (error) {
        console.error('Error tracking visitor:', error);
    }
};

// 2. ABANDONED CART TRACKING
export const trackAbandonedCart = async (cartItems) => {
    try {
        if (!cartItems || cartItems.length === 0) return;
        
        // Sanitize cart data to prevent XSS and injection
        const sanitizedItems = sanitizeCartData({ items: cartItems }).items;
        
        const sessionId = getSessionId();
        const cartRef = ref(database, `abandonedCarts/${sessionId}`);
        
        // Validate email and phone
        const userEmail = localStorage.getItem('user_email') || null;
        const userPhone = localStorage.getItem('user_phone') || null;
        const sanitizedEmail = userEmail ? sanitizeEmail(userEmail) : null;
        const sanitizedPhone = userPhone ? sanitizePhone(userPhone) : null;
        
        const cartData = {
            sessionId,
            items: sanitizedItems,
            totalValue: sanitizedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            itemCount: sanitizedItems.reduce((sum, item) => sum + item.quantity, 0),
            timestamp: Date.now(),
            userEmail: sanitizedEmail,
            userPhone: sanitizedPhone,
            recovered: false,
            checkoutStarted: false,
        };
        
        await set(cartRef, cartData);
        
        // Set timeout to mark as abandoned after 15 minutes of inactivity
        setTimeout(async () => {
            try {
                const snapshot = await get(cartRef);
                if (snapshot.exists() && !snapshot.val().recovered) {
                    // Cart is still abandoned after 15 minutes
                    await update(cartRef, { 
                        abandoned: true,
                        abandonedAt: Date.now(),
                        abandonmentReason: 'Browser close/inactivity'
                    });
                }
            } catch (error) {
                console.error('Error marking cart as abandoned:', error);
            }
        }, 15 * 60 * 1000);
        
    } catch (error) {
        console.error('Error tracking abandoned cart:', error);
    }
};

// 2B. CHECKOUT INITIATED - When user fills details and starts checkout
export const trackCheckoutStarted = async (customerDetails) => {
    try {
        const sessionId = getSessionId();
        const cartRef = ref(database, `abandonedCarts/${sessionId}`);
        
        // Sanitize customer details to prevent XSS
        const sanitizedPhone = customerDetails.phone ? sanitizePhone(customerDetails.phone) : null;
        const sanitizedEmail = customerDetails.email ? sanitizeEmail(customerDetails.email) : null;
        
        // Update cart to mark that checkout was initiated
        await update(cartRef, {
            checkoutStarted: true,
            checkoutStartedAt: Date.now(),
            customerName: customerDetails.name ? customerDetails.name.slice(0, 100) : null,
            customerPhone: sanitizedPhone,
            customerEmail: sanitizedEmail,
            customerAddress: customerDetails.address ? customerDetails.address.slice(0, 500) : null,
            customerPincode: customerDetails.pincode ? customerDetails.pincode.slice(0, 10) : null,
        });
        
        // If user doesn't complete payment within 5 minutes of starting checkout
        // mark as abandoned (more serious abandonment - they filled details!)
        setTimeout(async () => {
            try {
                const snapshot = await get(cartRef);
                if (snapshot.exists() && !snapshot.val().recovered && snapshot.val().checkoutStarted) {
                    // User started checkout but didn't complete payment within 5 minutes
                    await update(cartRef, { 
                        abandoned: true,
                        abandonedAt: Date.now(),
                        abandonmentReason: 'Checkout started but not completed (payment step abandoned)'
                    });
                }
            } catch (error) {
                console.error('Error marking checkout as abandoned:', error);
            }
        }, 5 * 60 * 1000); // 5 minutes after checkout starts
        
    } catch (error) {
        console.error('Error tracking checkout started:', error);
    }
};

// 3. PRODUCT PAGE VIEWS TRACKING
export const trackProductView = async (productId, productName, productPrice) => {
    try {
        const sessionId = getSessionId();
        const viewRef = ref(database, `productViews/${productId}/${Date.now()}`);
        
        const viewData = {
            productId,
            productName,
            productPrice,
            sessionId,
            timestamp: Date.now(),
            url: window.location.pathname,
        };
        
        await set(viewRef, viewData);
        
        // Also track in user's session
        const userProductRef = ref(database, `userProductViews/${sessionId}/${productId}`);
        await update(userProductRef, {
            lastViewed: Date.now(),
            viewCount: (await get(userProductRef)).val()?.viewCount ? (await get(userProductRef)).val().viewCount + 1 : 1,
        });
        
    } catch (error) {
        console.error('Error tracking product view:', error);
    }
};

// 4. CONVERSION TRACKING
export const trackConversion = async (orderId, orderData) => {
    try {
        // Validate order data first (CRITICAL: Server-side validation should also be done)
        if (!orderId || !orderData.amount || !orderData.items) {
            console.error('Invalid order data: missing required fields');
            return false;
        }
        
        // Sanitize order data to prevent XSS and injection
        const sanitizedOrderData = sanitizeOrderData({
            ...orderData,
            orderId
        });
        
        // Validate amount is positive number
        if (typeof sanitizedOrderData.amount !== 'number' || sanitizedOrderData.amount <= 0) {
            console.error('Invalid order amount:', sanitizedOrderData.amount);
            return false;
        }
        
        // Validate items array is not empty
        if (!Array.isArray(sanitizedOrderData.items) || sanitizedOrderData.items.length === 0) {
            console.error('Invalid order items: must be non-empty array');
            return false;
        }
        
        const sessionId = getSessionId();
        const conversionRef = ref(database, `conversions/${orderId}`);
        
        const conversionData = {
            orderId: sanitizedOrderData.orderId,
            sessionId,
            timestamp: Date.now(),
            amount: sanitizedOrderData.amount,
            items: sanitizedOrderData.items,
            customerEmail: sanitizedOrderData.customerEmail,
            customerPhone: sanitizedOrderData.customerPhone,
            status: 'completed',
        };
        
        await set(conversionRef, conversionData);
        
        // Mark cart as recovered
        const abandonedCartRef = ref(database, `abandonedCarts/${sessionId}`);
        try {
            await update(abandonedCartRef, { recovered: true });
        } catch (e) {
            // Cart might not exist
        }
        
        // Update user conversion count
        const userConversionsRef = ref(database, `userConversions/${sessionId}`);
        await update(userConversionsRef, {
            lastConversion: Date.now(),
            totalValue: (await get(userConversionsRef)).val()?.totalValue ? 
                (await get(userConversionsRef)).val().totalValue + sanitizedOrderData.amount : sanitizedOrderData.amount,
            conversionCount: (await get(userConversionsRef)).val()?.conversionCount ? 
                (await get(userConversionsRef)).val().conversionCount + 1 : 1,
        });
        
        return true;
    } catch (error) {
        console.error('Error tracking conversion:', error);
        return false;
    }
};

// 5. USER BEHAVIOR TRACKING
export const trackPageView = async (pageName, pageProps = {}) => {
    try {
        const sessionId = getSessionId();
        const pageRef = ref(database, `userBehavior/${sessionId}/pages/${Date.now()}`);
        
        const pageData = {
            pageName,
            timestamp: Date.now(),
            sessionId,
            url: window.location.pathname,
            ...pageProps,
        };
        
        await set(pageRef, pageData);
        
    } catch (error) {
        console.error('Error tracking page view:', error);
    }
};

export const trackUserInteraction = async (interactionType, details = {}) => {
    try {
        const sessionId = getSessionId();
        const interactionRef = ref(database, `userBehavior/${sessionId}/interactions/${Date.now()}`);
        
        const interactionData = {
            type: interactionType, // 'click', 'scroll', 'form_submit', etc.
            timestamp: Date.now(),
            sessionId,
            element: details.element || null,
            url: window.location.pathname,
            ...details,
        };
        
        await set(interactionRef, interactionData);
        
    } catch (error) {
        console.error('Error tracking interaction:', error);
    }
};

export const trackTimeOnPage = async (pageName, timeSpent) => {
    try {
        const sessionId = getSessionId();
        const timeRef = ref(database, `userBehavior/${sessionId}/pageTime/${Date.now()}`);
        
        const timeData = {
            pageName,
            timeSpent, // in milliseconds
            timestamp: Date.now(),
            sessionId,
        };
        
        await set(timeRef, timeData);
        
    } catch (error) {
        console.error('Error tracking time on page:', error);
    }
};

// ANALYTICS QUERIES
export const getActiveLiveVisitors = async () => {
    try {
        const visitorsRef = ref(database, 'liveVisitors');
        const snapshot = await get(visitorsRef);
        
        if (!snapshot.exists()) return { count: 0, visitors: [] };
        
        const allVisitors = snapshot.val();
        const now = Date.now();
        const activeVisitors = [];
        let count = 0;
        
        Object.values(allVisitors).forEach(visitor => {
            // Consider visitor active if last activity within 5 minutes
            if (now - visitor.lastActive < 5 * 60 * 1000) {
                count++;
                activeVisitors.push(visitor);
            }
        });
        
        return { count, visitors: activeVisitors };
    } catch (error) {
        console.error('Error getting active visitors:', error);
        return { count: 0, visitors: [] };
    }
};

export const getAbandonedCarts = async () => {
    try {
        const cartsRef = ref(database, 'abandonedCarts');
        const snapshot = await get(cartsRef);
        
        if (!snapshot.exists()) return [];
        
        const carts = snapshot.val();
        const abandonedCarts = [];
        const NOW = Date.now();
        const INITIAL_TIMEOUT = 15 * 60 * 1000; // 15 minutes
        const CHECKOUT_TIMEOUT = 5 * 60 * 1000;  // 5 minutes
        
        Object.entries(carts).forEach(([sessionId, cart]) => {
            // Skip recovered carts
            if (cart.recovered) return;
            
            // Calculate time since cart was created
            const timeSinceCreation = NOW - cart.timestamp;
            
            // Determine which timeout applies
            const timeout = cart.checkoutStarted ? CHECKOUT_TIMEOUT : INITIAL_TIMEOUT;
            
            // Check if this cart should be marked as abandoned based on timeout
            const isAbandoned = timeSinceCreation > timeout;
            
            if (isAbandoned) {
                // Update Firebase to mark as abandoned (runs once per load)
                if (!cart.abandoned) {
                    const updateRef = ref(database, `abandonedCarts/${sessionId}`);
                    update(updateRef, {
                        abandoned: true,
                        abandonedAt: NOW,
                        abandonmentReason: cart.checkoutStarted 
                            ? 'Checkout started but not completed (payment step abandoned)'
                            : 'Browser close/inactivity'
                    }).catch(err => console.error('Error updating abandoned cart:', err));
                }
                
                // Add to list for dashboard display
                abandonedCarts.push({
                    ...cart,
                    sessionId,
                    abandoned: true,
                    abandonedAt: NOW,
                    priority: cart.checkoutStarted ? 'HIGH' : 'MEDIUM'
                });
            }
        });
        
        // Sort by priority (HIGH first) and recency
        return abandonedCarts.sort((a, b) => {
            if (a.priority !== b.priority) {
                return a.priority === 'HIGH' ? -1 : 1;
            }
            return (b.abandonedAt || 0) - (a.abandonedAt || 0);
        });
    } catch (error) {
        console.error('Error getting abandoned carts:', error);
        return [];
    }
};

export const getProductStats = async () => {
    try {
        const productsRef = ref(database, 'productViews');
        const snapshot = await get(productsRef);
        
        if (!snapshot.exists()) return [];
        
        const products = snapshot.val();
        const stats = [];
        
        Object.entries(products).forEach(([productId, views]) => {
            const viewCount = Object.keys(views).length;
            stats.push({
                productId,
                viewCount,
                lastViewed: Math.max(...Object.values(views).map(v => v.timestamp)),
            });
        });
        
        return stats.sort((a, b) => b.viewCount - a.viewCount);
    } catch (error) {
        console.error('Error getting product stats:', error);
        return [];
    }
};

export const getConversionStats = async () => {
    try {
        const conversionsRef = ref(database, 'conversions');
        const snapshot = await get(conversionsRef);
        
        if (!snapshot.exists()) return { count: 0, totalRevenue: 0, averageOrderValue: 0, conversions: [] };
        
        const conversions = Object.values(snapshot.val());
        const totalRevenue = conversions.reduce((sum, c) => sum + (c.amount || 0), 0);
        
        return {
            count: conversions.length,
            totalRevenue,
            averageOrderValue: conversions.length > 0 ? totalRevenue / conversions.length : 0,
            conversions,
        };
    } catch (error) {
        console.error('Error getting conversion stats:', error);
        return { count: 0, totalRevenue: 0, averageOrderValue: 0, conversions: [] };
    }
};

// SECURE ORDER CREATION - Validates order data before storing
export const createOrderSafe = async (orderData) => {
    try {
        // 1. Validate required fields
        if (!orderData || typeof orderData !== 'object') {
            console.error('Invalid order data: must be an object');
            return { success: false, error: 'Invalid order data' };
        }
        
        const requiredFields = ['amount', 'items', 'customerEmail', 'customerPhone'];
        for (const field of requiredFields) {
            if (!(field in orderData)) {
                console.error(`Missing required field: ${field}`);
                return { success: false, error: `Missing required field: ${field}` };
            }
        }
        
        // 2. Sanitize all input
        const sanitizedOrder = sanitizeOrderData(orderData);
        
        // 3. Validate amount
        if (typeof sanitizedOrder.amount !== 'number' || sanitizedOrder.amount <= 0) {
            console.error('Invalid amount:', sanitizedOrder.amount);
            return { success: false, error: 'Amount must be a positive number' };
        }
        
        // 4. Validate items array
        if (!Array.isArray(sanitizedOrder.items) || sanitizedOrder.items.length === 0) {
            console.error('Invalid items array');
            return { success: false, error: 'Must have at least one item' };
        }
        
        // 5. Verify amount matches items (anti-fraud check)
        const calculatedAmount = sanitizedOrder.items.reduce((sum, item) => {
            const itemPrice = parseFloat(item.price) || 0;
            const itemQty = parseInt(item.quantity) || 0;
            return sum + (itemPrice * itemQty);
        }, 0);
        
        // Allow small floating point differences
        if (Math.abs(calculatedAmount - sanitizedOrder.amount) > 0.01) {
            console.error('Amount mismatch:', { claimed: sanitizedOrder.amount, calculated: calculatedAmount });
            return { success: false, error: 'Order amount does not match items' };
        }
        
        // 6. Generate order ID
        const orderId = `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // 7. Store in Firebase
        const orderRef = ref(database, `orders/${orderId}`);
        const orderToStore = {
            orderId,
            ...sanitizedOrder,
            createdAt: Date.now(),
            status: 'pending',
            paymentStatus: 'pending',
        };
        
        await set(orderRef, orderToStore);
        
        // 8. Track conversion
        await trackConversion(orderId, sanitizedOrder);
        
        console.log('✅ Order created safely:', orderId);
        return { 
            success: true, 
            orderId, 
            message: 'Order created successfully' 
        };
        
    } catch (error) {
        console.error('Error in createOrderSafe:', error);
        return { 
            success: false, 
            error: error.message || 'Failed to create order' 
        };
    }
};

// TEST FUNCTION: Add test abandoned carts for testing purposes
export const addTestAbandonedCart = async (isCheckoutStage = false) => {
    try {
        const testSessionId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const NOW = Date.now();
        
        // Create a cart with old timestamp so it will be marked as abandoned
        const timeOffset = isCheckoutStage ? 6 * 60 * 1000 : 16 * 60 * 1000; // 6 or 16 minutes old
        
        const testCart = {
            sessionId: testSessionId,
            items: [
                {
                    productId: 'jeetpic',
                    name: 'Jeetpic Toilet Cleaner',
                    price: 1,
                    quantity: 2
                },
                {
                    productId: 'winyle',
                    name: 'Winyle Floor Cleaner',
                    price: 1,
                    quantity: 1
                }
            ],
            totalValue: 3,
            itemCount: 3,
            timestamp: NOW - timeOffset, // Old timestamp to trigger abandonment
            userEmail: 'test@example.com',
            userPhone: '9876543210',
            recovered: false,
            checkoutStarted: isCheckoutStage,
            ...(isCheckoutStage && {
                checkoutStartedAt: NOW - timeOffset + 1000,
                customerName: 'Test User',
                customerPhone: '9876543210',
                customerAddress: '123 Test Street, Test City',
                customerPincode: '560001'
            })
        };
        
        const cartRef = ref(database, `abandonedCarts/${testSessionId}`);
        await set(cartRef, testCart);
        
        console.log(`✅ Test ${isCheckoutStage ? 'CHECKOUT-STAGE' : 'INITIAL'} abandoned cart created:`, testSessionId);
        return testSessionId;
    } catch (error) {
        console.error('Error adding test abandoned cart:', error);
    }
};

