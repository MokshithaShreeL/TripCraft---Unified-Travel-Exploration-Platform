const prisma = require('../models/prismaClient');

exports.getInvoice = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { invoice: true, payment: true }
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking invoice not found' });
    }

    const subtotal = booking.amount;
    const gst = booking.gst_amount || Math.round(subtotal * 0.12);
    const grandTotal = subtotal + gst;

    return res.json({
      success: true,
      invoice: {
        invoiceNumber: booking.invoice?.invoice_number || `TC-INV-${booking.id.slice(-6)}`,
        bookingId: booking.id,
        itemTitle: booking.item_title,
        destination: booking.destination,
        travelDate: booking.travel_date,
        guestName: booking.contact_name,
        guestEmail: booking.contact_email,
        subtotal,
        gst,
        grandTotal,
        paymentStatus: booking.status === 'Confirmed' ? 'PAID' : booking.status,
        issuedAt: booking.created_at
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve invoice' });
  }
};

exports.getInvoiceHtml = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    });

    if (!booking) {
      return res.status(404).send('Booking not found');
    }

    const invoiceNo = `TC-INV-${booking.id.slice(-6)}`;
    const subtotal = booking.amount;
    const gst = booking.gst_amount || Math.round(subtotal * 0.12);
    const grandTotal = subtotal + gst;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>TripCraft Travel Voucher & Tax Invoice - ${invoiceNo}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #0f172a; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0E7C6B; padding-bottom: 20px; }
          .logo { font-size: 26px; font-weight: 900; color: #0B1F3A; }
          .badge { background: #0E7C6B; color: white; padding: 4px 12px; border-radius: 6px; font-weight: bold; font-size: 11px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { text-align: left; background: #0B1F3A; color: white; padding: 10px; font-size: 12px; }
          td { padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
          .total-box { margin-left: auto; width: 280px; margin-top: 20px; padding: 16px; background: #f1f5f9; border-radius: 8px; }
          .grand-total { font-size: 16px; font-weight: bold; color: #0E7C6B; border-top: 1px solid #cbd5e1; padding-top: 8px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">TripCraft</div>
            <p style="font-size: 12px; color: #64748b; margin: 4px 0;">Official Travel & Experience Voucher</p>
          </div>
          <div style="text-align: right;">
            <span class="badge">Confirmed & Paid</span>
            <p style="margin: 8px 0 0; font-weight: bold;">Invoice #${invoiceNo}</p>
          </div>
        </div>
        <div class="grid">
          <div class="card">
            <h4 style="margin: 0 0 8px; color: #64748b; font-size: 11px; text-transform: uppercase;">Lead Passenger</h4>
            <p style="margin: 0; font-weight: bold;">${booking.contact_name}</p>
            <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">${booking.contact_email}</p>
          </div>
          <div class="card">
            <h4 style="margin: 0 0 8px; color: #64748b; font-size: 11px; text-transform: uppercase;">Reservation Spec</h4>
            <p style="margin: 0; font-weight: bold;">${booking.destination || 'India'}</p>
            <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">Date: ${booking.travel_date}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr><th>Description</th><th>Type</th><th style="text-align: right;">Amount (INR)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${booking.item_title}</strong></td>
              <td style="text-transform: capitalize;">${booking.item_type}</td>
              <td style="text-align: right;">₹${subtotal.toLocaleString('en-IN')}</td>
            </tr>
          </tbody>
        </table>
        <div class="total-box">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 12px;"><span>Subtotal:</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 12px;"><span>GST (12%):</span><span>₹${gst.toLocaleString('en-IN')}</span></div>
          <div class="grand-total" style="display: flex; justify-content: space-between;"><span>Grand Total:</span><span>₹${grandTotal.toLocaleString('en-IN')}</span></div>
        </div>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  } catch (err) {
    return res.status(500).send('Error rendering invoice');
  }
};
