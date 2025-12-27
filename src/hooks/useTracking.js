import { useEffect, useState } from 'react';
import {
    trackLiveVisitor,
    trackAbandonedCart,
    trackCheckoutStarted,
    trackProductView,
    trackConversion,
    trackPageView,
    trackUserInteraction,
    trackTimeOnPage,
    getActiveLiveVisitors,
    getAbandonedCarts,
    getProductStats,
    getConversionStats,
} from '../utils/trackingService';

// Hook to initialize visitor tracking
export const useVisitorTracking = () => {
    useEffect(() => {
        trackLiveVisitor();
    }, []);
};

// Hook to track page views
export const usePageTracking = (pageName) => {
    const [timeOnPage, setTimeOnPage] = useState(0);

    useEffect(() => {
        const startTime = Date.now();

        trackPageView(pageName);

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            setTimeOnPage(elapsed);
        }, 1000);

        const handleBeforeUnload = () => {
            trackTimeOnPage(pageName, Date.now() - startTime);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearInterval(timer);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            trackTimeOnPage(pageName, Date.now() - startTime);
        };
    }, [pageName]);

    return { timeOnPage };
};

// Hook to track product views
export const useProductTracking = (productId, productName, productPrice) => {
    useEffect(() => {
        if (productId) {
            trackProductView(productId, productName, productPrice);
        }
    }, [productId, productName, productPrice]);
};

// Hook to track cart abandonment
export const useCartTracking = (cartItems) => {
    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            trackAbandonedCart(cartItems);
        }
    }, [cartItems]);
};

// Hook to track checkout initiation
export const useCheckoutTracking = (customerDetails) => {
    useEffect(() => {
        if (customerDetails && customerDetails.name && customerDetails.phone) {
            trackCheckoutStarted(customerDetails);
        }
    }, [customerDetails]);
};

// Hook to track user interactions
export const useInteractionTracking = () => {
    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                trackUserInteraction('click', {
                    element: e.target.className,
                    text: e.target.textContent,
                });
            }
        };

        const handleScroll = () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (Math.round(scrollPercentage) % 25 === 0) {
                trackUserInteraction('scroll', {
                    scrollPercentage: Math.round(scrollPercentage),
                });
            }
        };

        window.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
};

// Hook to track form submissions
export const useFormTracking = (formId) => {
    useEffect(() => {
        const form = document.getElementById(formId);
        if (!form) return;

        const handleSubmit = () => {
            trackUserInteraction('form_submit', {
                formId,
            });
        };

        form.addEventListener('submit', handleSubmit);

        return () => {
            form.removeEventListener('submit', handleSubmit);
        };
    }, [formId]);
};

// Hook to get live visitor count
export const useLiveVisitors = (refreshInterval = 10000) => {
    const [liveVisitors, setLiveVisitors] = useState({ count: 0, visitors: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitors = async () => {
            setLoading(true);
            const data = await getActiveLiveVisitors();
            setLiveVisitors(data);
            setLoading(false);
        };

        fetchVisitors();

        const interval = setInterval(fetchVisitors, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval]);

    return { liveVisitors, loading };
};

// Hook to get abandoned carts
export const useAbandonedCarts = (refreshInterval = 30000) => {
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarts = async () => {
            setLoading(true);
            const data = await getAbandonedCarts();
            setCarts(data);
            setLoading(false);
        };

        fetchCarts();

        const interval = setInterval(fetchCarts, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval]);

    return { carts, loading };
};

// Hook to get product statistics
export const useProductStats = (refreshInterval = 30000) => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const data = await getProductStats();
            setStats(data);
            setLoading(false);
        };

        fetchStats();

        const interval = setInterval(fetchStats, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval]);

    return { stats, loading };
};

// Hook to get conversion statistics
export const useConversionStats = (refreshInterval = 30000) => {
    const [conversionStats, setConversionStats] = useState({
        count: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        conversions: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const data = await getConversionStats();
            setConversionStats(data);
            setLoading(false);
        };

        fetchStats();

        const interval = setInterval(fetchStats, refreshInterval);

        return () => clearInterval(interval);
    }, [refreshInterval]);

    return { conversionStats, loading };
};
