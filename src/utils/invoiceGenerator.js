import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Initialize vfs
if (pdfMake.vfs === undefined && pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else if (pdfMake.vfs === undefined && pdfFonts && pdfFonts.vfs) {
    pdfMake.vfs = pdfFonts.vfs;
}

/**
 * Generates the next invoice number based on the previous one.
 * Format: INV-YYYY-MM-XXXX
 * @param {string} lastInvoiceNumber - The last generated invoice number (e.g., "INV-2025-12-0001")
 * @returns {string} The new invoice number
 */
export const generateInvoiceNumber = (lastInvoiceNumber) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const currentPrefix = `INV-${year}-${month}`;

    if (!lastInvoiceNumber || !lastInvoiceNumber.startsWith(currentPrefix)) {
        // No previous invoice or month/year changed => Reset to 0001
        return `${currentPrefix}-0001`;
    }

    // Extract sequence part (last 4 digits)
    const parts = lastInvoiceNumber.split('-');
    const lastSequence = parseInt(parts[parts.length - 1], 10);

    if (isNaN(lastSequence)) {
        return `${currentPrefix}-0001`; // Fallback if parsing fails
    }

    const newSequence = String(lastSequence + 1).padStart(4, '0');
    return `${currentPrefix}-${newSequence}`;
};

/**
 * Generates the PDFMake document definition for the invoice.
 * @param {object} orderData - The complete order object
 * @returns {object} The document definition object for pdfmake
 */
export const getInvoiceDocDefinition = (orderData) => {
    const { customer, items, totals, orderNumber, timestamp } = orderData;

    // Helper to format currency
    const formatCurrency = (amount) => `₹ ${Number(amount).toFixed(2)}`;

    // Helper to format date
    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Prepare table body
    const tableBody = [
        [
            { text: 'S.No', style: 'tableHeader' },
            { text: 'Description', style: 'tableHeader' },
            { text: 'Qty', style: 'tableHeader', alignment: 'center' },
            { text: 'Rate', style: 'tableHeader', alignment: 'right' },
            { text: 'Amount', style: 'tableHeader', alignment: 'right' }
        ]
    ];

    let serialNo = 1;
    Object.entries(items).forEach(([id, qty]) => {
        if (qty > 0) {
            // Need products list to get name/price. Since we don't have it passed directly, 
            // we'll rely on the orderData structure ideally containing item details or we infer it.
            // For now, let's assume orderData.itemsDetails exists OR we match IDs if we had the products list.
            // Since `products` array is in the component, we might want to pass formatted items to this function.
            // BUT, to keep it simple, let's pass the enriched items array to this function instead of raw cart object
            // For this implementation, I will assume the caller passes an `enrichedItems` array or I'll handle generic text if not found.

            // Wait, I can't access `products` array here easily without importing it or passing it in.
            // I will update the component to pass an Enriched Items Array.
        }
    });

    // NOTE: The Caller must pass `processedItems` array [{name, quantity, price, total}] 
    // instead of just `items` (cart object) for better separation of concerns.

    // Let's assume orderData.processedItems is available. 
    // If not, we fall back to a generic placeholder or the caller handles it.

    if (orderData.processedItems) {
        orderData.processedItems.forEach((item, index) => {
            tableBody.push([
                { text: index + 1, style: 'tableBody' },
                { text: item.name, style: 'tableBody' },
                { text: item.quantity, style: 'tableBody', alignment: 'center' },
                { text: formatCurrency(item.price), style: 'tableBody', alignment: 'right' },
                { text: formatCurrency(item.total), style: 'tableBody', alignment: 'right' }
            ]);
        });
    }

    return {
        content: [
            // Header
            {
                columns: [
                    {
                        width: '*',
                        stack: [
                            { text: 'INVOICE', style: 'headerTitle' },
                            { text: 'Jeetpic Industries', style: 'companyName' },
                            { text: '123, Industrial Area, Kolkata, WB - 700001', style: 'companyAddress' },
                            { text: 'Email: support@jeetpic.com | Phone: +91 9830117727', style: 'companyAddress' }
                        ]
                    },
                    {
                        width: 'auto',
                        stack: [
                            { text: `Invoice No: ${orderNumber}`, style: 'metaText', alignment: 'right' },
                            { text: `Date: ${formatDate(timestamp)}`, style: 'metaText', alignment: 'right' }
                        ]
                    }
                ]
            },

            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 }] },

            // Bill To
            {
                margin: [0, 20, 0, 20],
                columns: [
                    {
                        width: '*',
                        stack: [
                            { text: 'Bill To:', style: 'sectionLabel' },
                            { text: customer.name, style: 'customerName' },
                            { text: customer.address, style: 'customerAddress' },
                            { text: customer.pincode ? `Pincode: ${customer.pincode}` : '', style: 'customerAddress' },
                            { text: `Phone: ${customer.phone}`, style: 'customerAddress' }
                        ]
                    }
                ]
            },

            // Items Table
            {
                table: {
                    headerRows: 1,
                    widths: [30, '*', 40, 80, 80],
                    body: tableBody
                },
                layout: 'lightHorizontalLines',
                margin: [0, 0, 0, 20]
            },

            // Summary
            {
                columns: [
                    { width: '*', text: '' }, // Spacer
                    {
                        width: 200,
                        table: {
                            widths: ['*', 80],
                            body: [
                                [
                                    { text: 'Subtotal:', style: 'summaryLabel' },
                                    { text: formatCurrency(totals.subtotal), style: 'summaryValue' }
                                ],
                                [
                                    { text: 'Tax (0%):', style: 'summaryLabel' },
                                    { text: formatCurrency(0), style: 'summaryValue' }
                                ],
                                [
                                    { text: 'Shipping:', style: 'summaryLabel' },
                                    { text: totals.shipping === 0 ? 'FREE' : formatCurrency(totals.shipping), style: 'summaryValue' }
                                ],
                                [
                                    { text: 'Total:', style: 'totalLabel' },
                                    { text: formatCurrency(totals.total), style: 'totalValue' }
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    }
                ]
            },

            // Footer
            {
                text: 'Thank you for your business!',
                style: 'footerText',
                alignment: 'center',
                margin: [0, 50, 0, 0]
            },
            {
                text: 'This is a computer-generated invoice and does not require a signature.',
                style: 'disclaimerText',
                alignment: 'center',
                margin: [0, 5, 0, 0]
            }
        ],

        styles: {
            headerTitle: { fontSize: 22, bold: true, margin: [0, 0, 0, 5] },
            companyName: { fontSize: 12, bold: true },
            companyAddress: { fontSize: 10, color: '#555' },
            metaText: { fontSize: 10, bold: true, margin: [0, 2, 0, 2] },
            sectionLabel: { fontSize: 10, bold: true, color: '#555', margin: [0, 0, 0, 2] },
            customerName: { fontSize: 11, bold: true },
            customerAddress: { fontSize: 10 },
            tableHeader: { fontSize: 10, bold: true, color: 'black', fillColor: '#eeeeee', margin: [0, 5, 0, 5] },
            tableBody: { fontSize: 10, margin: [0, 5, 0, 5] },
            summaryLabel: { fontSize: 10, alignment: 'right', margin: [0, 2, 0, 2] },
            summaryValue: { fontSize: 10, alignment: 'right', margin: [0, 2, 0, 2] },
            totalLabel: { fontSize: 12, bold: true, alignment: 'right', margin: [0, 5, 0, 5] },
            totalValue: { fontSize: 12, bold: true, alignment: 'right', margin: [0, 5, 0, 5] },
            footerText: { fontSize: 12, bold: true, color: '#333' },
            disclaimerText: { fontSize: 8, color: '#777' }
        },
        defaultStyle: {
            font: 'Roboto'
        }
    };
};
