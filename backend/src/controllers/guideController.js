const prisma = require('../models/prismaClient');

exports.getAll = async (req, res) => {
  try {
    const { destination, experience, language } = req.query;
    const where = {};

    if (destination && destination !== 'All') {
      where.destination_id = { contains: destination.toLowerCase() };
    }
    if (experience && experience !== 'All') {
      where.specialization = { contains: experience };
    }
    if (language && language !== 'All') {
      where.languages = { contains: language };
    }

    const guides = await prisma.localGuide.findMany({
      where,
      include: { destination: true }
    });

    return res.json({ success: true, count: guides.length, data: guides });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch guides' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const guide = await prisma.localGuide.findUnique({
      where: { id },
      include: { destination: true }
    });
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    return res.json({ success: true, data: guide });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch guide details' });
  }
};

exports.bookGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const { travelDate, days = 1, contactName, contactEmail, contactPhone } = req.body;

    const guide = await prisma.localGuide.findUnique({ where: { id } });
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });

    const bookingId = 'TC-GD-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = guide.daily_rate * Number(days);
    const gst = Math.round(subtotal * 0.18);

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        user_id: req.user?.id || null,
        item_type: 'guide',
        item_id: id,
        item_title: `Certified Guide Tour: ${guide.name}`,
        destination: guide.destination_id,
        travel_date: travelDate || 'Scheduled',
        adults: 1,
        amount: subtotal,
        gst_amount: gst,
        status: 'Confirmed',
        contact_name: contactName || 'Traveler',
        contact_email: contactEmail || 'traveler@tripcraft.in',
        contact_phone: contactPhone || '+91 98765 43210',
        share_token: 'gd_share_' + Math.random().toString(36).substring(2, 10)
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Guide booked successfully',
      booking
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Guide booking failed' });
  }
};
