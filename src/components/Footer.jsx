import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer id="contact" className="py-10 px-6 md:px-12 bg-red-700 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <h4 className="font-bold text-xl mb-4">Jeetpic</h4>
                        <p className="text-white/80 text-sm mb-2">Made in Kolkata - Quality Guarantee</p>
                        <p className="text-white/80 text-sm">India's toughest stain fighters for a cleaner home.</p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link to="/shop" className="text-white/80 hover:text-white transition-colors">Shop Now</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact Us</Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Policy Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Policies</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/privacy-policy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="/terms-and-conditions" className="text-white/80 hover:text-white transition-colors">Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link to="/refund-policy" className="text-white/80 hover:text-white transition-colors">Refund & Cancellation</Link>
                            </li>
                            <li>
                                <Link to="/shipping-policy" className="text-white/80 hover:text-white transition-colors">Shipping Policy</Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <h4 className="font-bold text-lg mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span className="text-white/80">XYZ Street, Kolkata, West Bengal, India</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <a href="tel:+918100246362" className="text-white/80 hover:text-white transition-colors">+91 81002 46362</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <a href="mailto:care.jeetpic@gmail.com" className="text-white/80 hover:text-white transition-colors">care.jeetpic@gmail.com</a>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
                    {/* Social Links */}
                    <motion.div
                        className="flex space-x-3 mb-4 md:mb-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {[<Facebook size={16} />, <Instagram size={16} />, <Twitter size={16} />].map((icon, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="p-2 border border-white/50 rounded hover:bg-white/10 transition block"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {icon}
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Copyright */}
                    <motion.div
                        className="text-center text-xs text-white/70"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                    >
                        © {new Date().getFullYear()} Jeetpic Industries. All rights reserved.
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

