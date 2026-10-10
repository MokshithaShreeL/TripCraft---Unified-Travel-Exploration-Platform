// TripCraft Invoice & Printable Booking Voucher Generator
export function downloadInvoice(booking) {
  if (!booking) return;

  const invoiceNumber = booking.id || `TC-INV-${Date.now().toString().slice(-6)}`;
  const bookingDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to view and download your travel invoice.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>TripCraft Travel Voucher & Tax Invoice - ${invoiceNumber}</title>
        <style>
          body { font-family: 'Inter', -apple-system, sans-serif; margin: 0; padding: 40px; color: #0f172a; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0E7C6B; padding-bottom: 20px; }
          .logo { font-size: 26px; font-weight: 800; color: #0B1F3A; letter-spacing: -0.5px; }
          .logo span { color: #0E7C6B; }
          .badge { background: #0E7C6B; color: #fff; font-size: 11px; padding: 4px 10px; border-radius: 6px; font-weight: 700; text-transform: uppercase; }
          .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px; }
          .card h4 { margin: 0 0 10px; font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
          .card p { margin: 4px 0; font-size: 13px; }
          table { width: 100%; border-collapse: collapse; margin: 24px 0; }
          th { text-align: left; background: #0B1F3A; color: #fff; padding: 10px 14px; font-size: 12px; font-weight: 600; }
          td { padding: 12px 14px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
          .total-box { margin-left: auto; width: 300px; background: #f1f5f9; border-radius: 8px; padding: 16px; margin-top: 10px; }
          .total-row { display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px; }
          .grand-total { font-size: 16px; font-weight: 800; color: #0E7C6B; border-top: 1px solid #cbd5e1; padding-top: 8px; margin-top: 8px; }
          .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 18px; font-size: 11px; color: #64748b; text-align: center; }
          @media print { body { padding: 15px; } .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo">Trip<span>Craft</span></div>
            <p style="margin: 4px 0 0; font-size: 12px; color: #64748b;">National Engineering College • Kovilpatti (23CS54C)</p>
          </div>
          <div style="text-align: right;">
            <span class="badge">Booking Confirmed & Verified</span>
            <p style="margin: 8px 0 0; font-size: 13px; font-weight: 700;">Invoice #: ${invoiceNumber}</p>
            <p style="margin: 2px 0 0; font-size: 12px; color: #64748b;">Date: ${bookingDate}</p>
          </div>
        </div>

        <div class="details-grid">
          <div class="card">
            <h4>Primary Guest Details</h4>
            <p><strong>Name:</strong> ${booking.contactInfo?.fullName || booking.contact_info?.fullName || 'Traveler'}</p>
            <p><strong>Email:</strong> ${booking.contactInfo?.email || booking.contact_info?.email || 'N/A'}</p>
            <p><strong>Contact:</strong> ${booking.contactInfo?.phone || booking.contact_info?.phone || 'N/A'}</p>
            <p><strong>Status:</strong> <span style="color: #0E7C6B; font-weight: 700;">Confirmed (Paid via SSL Gateway)</span></p>
          </div>

          <div class="card">
            <h4>Travel Reservation Specs</h4>
            <p><strong>Destination:</strong> ${booking.destination || 'India'}</p>
            <p><strong>Travel Date:</strong> ${booking.travelDate || booking.travel_date || 'Scheduled'}</p>
            <p><strong>Occupancy:</strong> ${booking.adults || 1} Adult(s), ${booking.children || 0} Child(ren)</p>
            <p><strong>Room(s):</strong> ${booking.rooms || 1} Room(s)</p>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Qty / Duration</th>
              <th style="text-align: right;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${booking.itemTitle || booking.item_title || 'TripCraft Experience'}</strong></td>
              <td style="text-transform: capitalize;">${booking.itemType || booking.item_type || 'Package'}</td>
              <td>${booking.nights || 3} Nights / Standard</td>
              <td style="text-align: right;">₹${((booking.fareSummary?.grandTotal || 15000) * 0.88).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Integrated Travel Support & 24/7 Safety Escrow</td>
              <td>Service Fee</td>
              <td>Complimentary</td>
              <td style="text-align: right;">₹0.00</td>
            </tr>
          </tbody>
        </table>

        <div class="total-box">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>₹${((booking.fareSummary?.grandTotal || 15000) * 0.88).toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>GST (12%):</span>
            <span>₹${((booking.fareSummary?.grandTotal || 15000) * 0.12).toFixed(2)}</span>
          </div>
          <div class="total-row grand-total">
            <span>Total Paid:</span>
            <span>₹${(booking.fareSummary?.grandTotal || 15000).toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div class="footer">
          <p>This is a computer-generated tax invoice and confirmed travel voucher. No physical signature required.</p>
          <p>TripCraft Travel Platform • 24/7 Helpline: 1091 (Women Safety) • Email: support@tripcraft.in</p>
          <div class="no-print" style="margin-top: 15px;">
            <button onclick="window.print()" style="background: #0E7C6B; color: #fff; border: none; padding: 10px 22px; font-weight: 700; border-radius: 8px; cursor: pointer;">
              Print / Save as PDF
            </button>
          </div>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
