const pool = require('../config/database');

exports.createBooking = async (req, res) => {
  try {
    const { itemTitle, itemType, destination, travelDate, adults, children, rooms, fareSummary, contactInfo, paymentDetails } = req.body;
    const bookingId = 'TC-BK-' + Date.now().toString().slice(-6);

    await pool.query(`
      INSERT INTO bookings (id, user_id, item_title, item_type, destination, travel_date, adults, children, rooms, status, payment_status, fare_summary, contact_info, payment_details)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed', 'Paid', ?, ?, ?)
    `, [
      bookingId,
      req.user.id,
      itemTitle || 'TripCraft Reservation',
      itemType || 'package',
      destination || 'India',
      travelDate || new Date().toISOString().split('T')[0],
      adults || 1,
      children || 0,
      rooms || 1,
      JSON.stringify(fareSummary || {}),
      JSON.stringify(contactInfo || {}),
      JSON.stringify(paymentDetails || {})
    ]);

    return res.status(201).json({
      success: true,
      message: 'Booking created and confirmed successfully',
      bookingId
    });
  } catch (err) {
    console.error('Booking creation error:', err);
    return res.status(500).json({ success: false, message: 'Failed to create booking' });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
    return res.json({ success: true, count: rows.length, bookings: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch bookings' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE bookings SET status = "Cancelled", payment_status = "Refunded" WHERE id = ? AND user_id = ?', [id, req.user.id]);
    return res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Cancellation failed' });
  }
};
