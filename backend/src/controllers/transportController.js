const prisma = require('../models/prismaClient');
const flightProvider = require('../integrations/flightProvider');
const trainProvider = require('../integrations/trainProvider');
const busProvider = require('../integrations/busProvider');

// Flights
exports.searchFlights = async (req, res) => {
  try {
    const { from, to, date, adults, children, cabinClass } = req.query;
    const result = await flightProvider.searchFlights({ from, to, date, adults, children, cabinClass });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Flight search failed' });
  }
};

exports.bookFlight = async (req, res) => {
  try {
    const { flightId, passengers, travelDate, contactName, contactEmail, contactPhone } = req.body;
    const bookingId = 'TC-FL-' + Math.floor(100000 + Math.random() * 900000);
    const passengerCount = passengers?.length || 1;
    const subtotal = 5800 * passengerCount;
    const gst = Math.round(subtotal * 0.12);
    const grandTotal = subtotal + gst;

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        user_id: req.user?.id || null,
        item_type: 'flight',
        item_id: flightId || 'FL-6E-512',
        item_title: `IndiGo Flight ${flightId || '6E-512'}`,
        destination: 'India Transit Hub',
        travel_date: travelDate || 'Scheduled',
        adults: passengerCount,
        amount: subtotal,
        gst_amount: gst,
        status: 'Confirmed',
        contact_name: contactName || req.user?.name || 'Air Traveler',
        contact_email: contactEmail || req.user?.email || 'air@tripcraft.in',
        contact_phone: contactPhone || '+91 98765 43210',
        share_token: 'fl_share_' + Math.random().toString(36).substring(2, 10)
      }
    });

    await prisma.invoice.create({
      data: {
        booking_id: booking.id,
        invoice_number: 'TC-INV-' + bookingId.slice(-6),
        subtotal,
        gst,
        grand_total: grandTotal
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Flight booked successfully',
      booking,
      pnr: 'TC' + Math.random().toString(36).substring(2, 8).toUpperCase()
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Flight booking failed' });
  }
};

// Trains
exports.searchTrains = async (req, res) => {
  try {
    const { from, to, date, classType } = req.query;
    const result = await trainProvider.searchTrains({ from, to, date, classType });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Train search failed' });
  }
};

exports.bookTrain = async (req, res) => {
  try {
    const { trainNo, passengers, travelDate, classType = '3A', contactName, contactEmail } = req.body;
    const bookingId = 'TC-TR-' + Math.floor(100000 + Math.random() * 900000);
    const count = passengers?.length || 1;
    const subtotal = 1850 * count;
    const gst = Math.round(subtotal * 0.05);

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        user_id: req.user?.id || null,
        item_type: 'train',
        item_id: trainNo || '12626',
        item_title: `Express Train ${trainNo || '12626'} (${classType})`,
        destination: 'Railway Route',
        travel_date: travelDate || 'Scheduled',
        adults: count,
        amount: subtotal,
        gst_amount: gst,
        status: 'Confirmed',
        contact_name: contactName || 'Rail Traveler',
        contact_email: contactEmail || 'rail@tripcraft.in',
        share_token: 'tr_share_' + Math.random().toString(36).substring(2, 10)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Train reservation confirmed',
      booking,
      pnr: '24' + Math.floor(10000000 + Math.random() * 90000000)
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Train booking failed' });
  }
};

// Buses
exports.searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const result = await busProvider.searchBuses({ from, to, date });
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Bus search failed' });
  }
};

exports.bookBus = async (req, res) => {
  try {
    const { busId, seats = ['12'], travelDate, contactName, contactEmail } = req.body;
    const bookingId = 'TC-BS-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = 1450 * seats.length;
    const gst = Math.round(subtotal * 0.05);

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        user_id: req.user?.id || null,
        item_type: 'bus',
        item_id: busId || 'BS-01',
        item_title: `Volvo Multi-Axle Bus (Seat ${seats.join(', ')})`,
        destination: 'Bus Corridor',
        travel_date: travelDate || 'Scheduled',
        adults: seats.length,
        amount: subtotal,
        gst_amount: gst,
        status: 'Confirmed',
        contact_name: contactName || 'Bus Traveler',
        contact_email: contactEmail || 'bus@tripcraft.in',
        share_token: 'bs_share_' + Math.random().toString(36).substring(2, 10)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Bus e-ticket generated',
      booking,
      ticketNo: 'TKT-BS-' + Date.now().toString().slice(-6)
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Bus booking failed' });
  }
};

// Cabs
exports.searchCabs = async (req, res) => {
  try {
    const cabs = await prisma.cab.findMany();
    return res.json({
      success: true,
      count: cabs.length,
      data: cabs.map(c => ({
        ...c,
        features: typeof c.features === 'string' ? JSON.parse(c.features || '[]') : c.features
      }))
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Cab search failed' });
  }
};

exports.bookCab = async (req, res) => {
  try {
    const { cabId, pickupLocation, dropLocation, pickupDate, contactName, contactEmail } = req.body;
    const bookingId = 'TC-CB-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = 3800;
    const gst = Math.round(subtotal * 0.05);

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        user_id: req.user?.id || null,
        item_type: 'cab',
        item_id: cabId || 'cb_01',
        item_title: `Outstation Cab: ${pickupLocation || 'Origin'} to ${dropLocation || 'Destination'}`,
        destination: dropLocation || 'Intercity',
        travel_date: pickupDate || 'Scheduled',
        adults: 4,
        amount: subtotal,
        gst_amount: gst,
        status: 'Confirmed',
        contact_name: contactName || 'Cab Passenger',
        contact_email: contactEmail || 'cab@tripcraft.in',
        share_token: 'cb_share_' + Math.random().toString(36).substring(2, 10)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Cab booked with chauffeur dispatch',
      booking,
      driverAssigned: {
        name: 'Ramesh Verma',
        phone: '+91 98450 11223',
        vehicle: 'Toyota Innova Crysta (DL 01 AB 4421)'
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Cab booking failed' });
  }
};
