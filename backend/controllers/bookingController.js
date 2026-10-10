const db = require('../database/db');

async function createBooking(req, res) {
  try {
    const {
      itemTitle,
      itemType = 'package',
      destination = 'India',
      travelDate,
      returnDate = null,
      adults = 1,
      children = 0,
      childAges = [],
      infants = 0,
      rooms = 1,
      nights = 1,
      contactInfo = {},
      fareSummary = {},
      paymentDetails = {}
    } = req.body;

    if (!itemTitle || !travelDate) {
      return res.status(400).json({ success: false, message: 'itemTitle and travelDate are required' });
    }

    const bookingId = `TC-BK-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const userId = req.user ? req.user.id : 'guest_traveler';

    const newBooking = {
      id: bookingId,
      user_id: userId,
      item_title: itemTitle,
      item_type: itemType,
      destination,
      travel_date: travelDate,
      return_date: returnDate,
      adults: Number(adults),
      children: Number(children),
      child_ages: JSON.stringify(childAges),
      infants: Number(infants),
      rooms: Number(rooms),
      nights: Number(nights),
      contact_info: JSON.stringify(contactInfo),
      fare_summary: JSON.stringify(fareSummary),
      payment_details: JSON.stringify(paymentDetails),
      status: 'Confirmed',
      payment_status: 'Paid',
      created_at: new Date().toISOString()
    };

    if (db.isLiveDb()) {
      await db.query(
        `INSERT INTO bookings (id, user_id, item_title, item_type, destination, travel_date, return_date, adults, children, child_ages, infants, rooms, nights, contact_info, fare_summary, payment_details, status, payment_status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newBooking.id,
          newBooking.user_id,
          newBooking.item_title,
          newBooking.item_type,
          newBooking.destination,
          newBooking.travel_date,
          newBooking.return_date,
          newBooking.adults,
          newBooking.children,
          newBooking.child_ages,
          newBooking.infants,
          newBooking.rooms,
          newBooking.nights,
          newBooking.contact_info,
          newBooking.fare_summary,
          newBooking.payment_details,
          newBooking.status,
          newBooking.payment_status
        ]
      );
    } else {
      db.inMemoryStore.bookings.unshift(newBooking);
    }

    return res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      data: {
        id: bookingId,
        itemTitle,
        travelDate,
        grandTotal: fareSummary.grandTotal,
        contactEmail: contactInfo.email,
        status: 'Confirmed'
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function getBookings(req, res) {
  try {
    let rows;
    if (db.isLiveDb()) {
      rows = await db.query('SELECT * FROM bookings ORDER BY created_at DESC');
    } else {
      rows = db.inMemoryStore.bookings;
    }
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function cancelBooking(req, res) {
  try {
    const { id } = req.params;
    if (db.isLiveDb()) {
      await db.query("UPDATE bookings SET status = 'Cancelled', payment_status = 'Refunded' WHERE id = ?", [id]);
    } else {
      const b = db.inMemoryStore.bookings.find(item => item.id === id);
      if (b) {
        b.status = 'Cancelled';
        b.payment_status = 'Refunded';
      }
    }
    return res.json({ success: true, message: `Booking #${id} cancelled and 100% refund initiated.` });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  createBooking,
  getBookings,
  cancelBooking
};
