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
    const { customer, items, totals, orderNumberFormatted, timestamp, paymentMethod } = orderData;
    // Use orderNumberFormatted if available, else fallback to orderNumber
    const displayOrderNumber = orderNumberFormatted || orderData.orderNumber;

    // Helper to format currency
    const formatCurrency = (amount) => `₹${Number(amount).toFixed(2)}`;

    // Helper to format date with time
    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Prepare table body
    const tableBody = [
        [
            { text: 'Product', style: 'tableHeader', alignment: 'left' },
            { text: 'Qty', style: 'tableHeader', alignment: 'center' },
            { text: 'Unit Price', style: 'tableHeader', alignment: 'right' },
            { text: 'Total', style: 'tableHeader', alignment: 'right' }
        ]
    ];

    if (orderData.processedItems) {
        orderData.processedItems.forEach((item) => {
            tableBody.push([
                {
                    stack: [
                        { text: item.name, style: 'itemName' },
                        { text: item.specs || '', style: 'itemSpecs' }
                    ],
                    margin: [0, 5, 0, 5]
                },
                { text: item.quantity, style: 'itemRow', alignment: 'center', margin: [0, 10, 0, 0] },
                { text: formatCurrency(item.price), style: 'itemRow', alignment: 'right', margin: [0, 10, 0, 0] },
                { text: formatCurrency(item.total), style: 'itemRow', alignment: 'right', font: 'Roboto', bold: true, margin: [0, 10, 0, 0] }
            ]);
        });
    }

    return {
        content: [
            // Title
            {
                text: 'Order Invoice',
                style: 'pageTitle',
                alignment: 'center',
                margin: [0, 0, 0, 30]
            },

            // Header Meta (Jeetpic Order | Date)
            {
                columns: [
                    {
                        width: '*',
                        stack: [
                            { text: 'Jeetpic Order', style: 'sectionHeader' },
                            { text: `Order #${displayOrderNumber}`, style: 'metaText' }
                        ]
                    },
                    {
                        width: 'auto',
                        stack: [
                            { text: `Date: ${formatDate(timestamp)}`, style: 'metaText', alignment: 'right' },
                            { text: `Payment: ${paymentMethod === 'prepaid' ? 'Online Payment' : 'Cash on Delivery'}`, style: 'metaText', alignment: 'right' }
                        ]
                    }
                ],
                margin: [0, 0, 0, 20]
            },

            // Delivery Details Box
            {
                table: {
                    widths: ['*'],
                    body: [
                        [
                            {
                                stack: [
                                    { text: 'Delivery Details', style: 'boxHeader' },
                                    { text: `Name: ${customer.name}`, style: 'boxText' },
                                    { text: `Phone: ${customer.phone}`, style: 'boxText' },
                                    { text: `Address: ${customer.address}`, style: 'boxText' },
                                    { text: `Pincode: ${customer.pincode}`, style: 'boxText' }
                                ],
                                fillColor: '#F9FAFB',
                                border: [false, false, false, false],
                                margin: [10, 10, 10, 10]
                            }
                        ]
                    ]
                },
                layout: 'noBorders',
                margin: [0, 0, 0, 20]
            },

            // Items Header (Items Ordered)
            { text: 'Items Ordered', style: 'sectionHeader', margin: [0, 0, 0, 10] },

            // Items Table
            {
                table: {
                    headerRows: 1,
                    widths: ['*', 50, 80, 80],
                    body: tableBody
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 0 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return 0;
                    },
                    hLineColor: function (i, node) {
                        return '#E5E7EB';
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex === 0) ? '#F9FAFB' : null;
                    },
                    paddingLeft: function (i) { return 8; },
                    paddingRight: function (i) { return 8; },
                    paddingTop: function (i) { return 8; },
                    paddingBottom: function (i) { return 8; }
                },
                margin: [0, 0, 0, 20]
            },

            // Totals Section
            {
                table: {
                    widths: ['*', 100],
                    body: [
                        [
                            { text: `Subtotal (${Object.values(items).reduce((a, b) => a + b, 0)} items):`, style: 'totalLabel' },
                            { text: formatCurrency(totals.subtotal), style: 'totalValue' }
                        ],
                        [
                            { text: 'GST (18%):', style: 'totalLabel' },
                            { text: formatCurrency(totals.gst), style: 'totalValue' }
                        ],
                        [
                            { text: 'Shipping:', style: 'totalLabel' },
                            { text: totals.shipping === 0 ? 'FREE' : formatCurrency(totals.shipping), style: 'totalValue', color: totals.shipping === 0 ? '#16A34A' : 'black' }
                        ]
                    ]
                },
                layout: 'noBorders',
                margin: [0, 0, 0, 10]
            },

            // Divider Line
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#E5E7EB' }], margin: [0, 0, 0, 10] },

            // Final Total
            {
                table: {
                    widths: ['*', 120],
                    body: [
                        [
                            { text: 'Total Amount:', style: 'grandTotalLabel' },
                            { text: formatCurrency(totals.total), style: 'grandTotalValue' }
                        ]
                    ]
                },
                layout: 'noBorders'
            },

            // Footer/Disclaimer (Optional, kept minimal to match screen)
            {
                text: 'This is a computer-generated invoice.',
                style: 'disclaimerText',
                alignment: 'center',
                margin: [0, 40, 0, 0]
            }

        ],

        styles: {
            pageTitle: { fontSize: 18, bold: true, color: '#111827' },
            sectionHeader: { fontSize: 14, bold: true, color: '#111827', margin: [0, 0, 0, 2] },
            metaText: { fontSize: 9, color: '#4B5563', margin: [0, 1, 0, 1] },

            boxHeader: { fontSize: 11, bold: true, color: '#111827', margin: [0, 0, 0, 4] },
            boxText: { fontSize: 10, color: '#374151', margin: [0, 1, 0, 1] },

            tableHeader: { fontSize: 10, bold: true, color: '#374151' },
            itemName: { fontSize: 10, bold: true, color: '#111827' },
            itemSpecs: { fontSize: 8, color: '#6B7280' },
            itemRow: { fontSize: 10, color: '#111827' },

            totalLabel: { fontSize: 10, color: '#374151', alignment: 'left' },
            totalValue: { fontSize: 10, color: '#111827', alignment: 'right', bold: true },

            grandTotalLabel: { fontSize: 12, bold: true, color: '#111827', alignment: 'left' },
            grandTotalValue: { fontSize: 14, bold: true, color: '#DC2626', alignment: 'right' },

            disclaimerText: { fontSize: 8, color: '#9CA3AF' }
        },
        defaultStyle: {
            font: 'Roboto'
        }
    };
};
