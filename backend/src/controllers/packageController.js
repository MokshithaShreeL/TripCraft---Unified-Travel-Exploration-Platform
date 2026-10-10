const prisma = require('../models/prismaClient');

exports.getAll = async (req, res) => {
  try {
    const { destination } = req.query;
    const where = {};
    if (destination && destination !== 'All') {
      where.destination_id = { contains: destination.toLowerCase() };
    }

    const packages = await prisma.travelPackage.findMany({
      where,
      include: { destination: true }
    });

    return res.json({
      success: true,
      count: packages.length,
      data: packages.map(p => ({
        ...p,
        highlights: typeof p.highlights === 'string' ? JSON.parse(p.highlights || '[]') : p.highlights,
        inclusions: typeof p.inclusions === 'string' ? JSON.parse(p.inclusions || '[]') : p.inclusions,
        exclusions: typeof p.exclusions === 'string' ? JSON.parse(p.exclusions || '[]') : p.exclusions,
        dayPlan: typeof p.day_plan === 'string' ? JSON.parse(p.day_plan || '[]') : p.day_plan
      }))
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch packages' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const pkg = await prisma.travelPackage.findUnique({
      where: { id },
      include: { destination: true }
    });
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });

    return res.json({
      success: true,
      data: {
        ...pkg,
        highlights: typeof pkg.highlights === 'string' ? JSON.parse(pkg.highlights || '[]') : pkg.highlights,
        inclusions: typeof pkg.inclusions === 'string' ? JSON.parse(pkg.inclusions || '[]') : pkg.inclusions,
        exclusions: typeof pkg.exclusions === 'string' ? JSON.parse(pkg.exclusions || '[]') : pkg.exclusions,
        dayPlan: typeof pkg.day_plan === 'string' ? JSON.parse(pkg.day_plan || '[]') : pkg.day_plan
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch package details' });
  }
};

exports.bookPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      travelDate,
      adults = 2,
      children = 0,
      customHotelUpgrade = false,
      addPrivateGuide = false,
      contactName,
      contactEmail,
      contactPhone
    } = req.body;

    const pkg = await prisma.travelPackage.findUnique({ where: { id } });
    if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });

    const basePerPerson = pkg.discount_price || pkg.price;
    let subtotal = (basePerPerson * Number(adults)) + Math.round(basePerPerson * 0.6 * Number(children));

    if (customHotelUpgrade) subtotal += 4500;
    if (addPrivateGuide) subtotal += 3000;

    const gst = Math.round(subtotal * 0.12);
    const grandTotal = subtotal + gst;

    const bookingId = 'TC-PKG-' + Math.floor(100000 + Math.random() * 900000);

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        user_id: req.user?.id || null,
        item_type: 'package',
        item_id: id,
        item_title: pkg.title,
        destination: pkg.destination_id,
        travel_date: travelDate || 'Scheduled',
        adults: Number(adults),
        children: Number(children),
        amount: subtotal,
        gst_amount: gst,
        status: 'Confirmed',
        contact_name: contactName || 'Traveler',
        contact_email: contactEmail || 'traveler@tripcraft.in',
        contact_phone: contactPhone || '+91 98765 43210',
        share_token: 'pkg_share_' + Math.random().toString(36).substring(2, 10)
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
      message: 'Package booked successfully',
      booking,
      summary: { subtotal, gst, grandTotal }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Package booking failed' });
  }
};
