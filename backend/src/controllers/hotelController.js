const prisma = require('../models/prismaClient');

exports.getAll = async (req, res) => {
  try {
    const {
      destination,
      minPrice,
      maxPrice,
      rating,
      hotelType,
      hasWifi,
      hasPool,
      hasAc,
      hasBreakfast,
      sort = 'recommended',
      page = 1,
      limit = 12
    } = req.query;

    const where = {};

    if (destination && destination !== 'All') {
      where.OR = [
        { destination_id: { contains: destination.toLowerCase() } },
        { address: { contains: destination } }
      ];
    }
    if (minPrice || maxPrice) {
      where.price_per_night = {};
      if (minPrice) where.price_per_night.gte = Number(minPrice);
      if (maxPrice) where.price_per_night.lte = Number(maxPrice);
    }
    if (rating) {
      where.rating = { gte: Number(rating) };
    }
    if (hotelType && hotelType !== 'All') {
      where.hotel_type = hotelType;
    }
    if (hasWifi === 'true') where.has_wifi = true;
    if (hasPool === 'true') where.has_pool = true;
    if (hasAc === 'true') where.has_ac = true;
    if (hasBreakfast === 'true') where.has_breakfast = true;

    let orderBy = { rating: 'desc' };
    if (sort === 'priceAsc') orderBy = { price_per_night: 'asc' };
    if (sort === 'priceDesc') orderBy = { price_per_night: 'desc' };
    if (sort === 'rating') orderBy = { rating: 'desc' };

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [total, hotels] = await Promise.all([
      prisma.hotel.count({ where }),
      prisma.hotel.findMany({
        where,
        orderBy,
        skip,
        take,
        include: { rooms: true }
      })
    ]);

    return res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / take),
      count: hotels.length,
      data: hotels.map(h => ({
        ...h,
        amenities: typeof h.amenities === 'string' ? JSON.parse(h.amenities || '[]') : h.amenities
      }))
    });
  } catch (err) {
    console.error('Hotels GetAll Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch hotels', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        rooms: true,
        reviews: true,
        destination: true
      }
    });

    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel property not found' });
    }

    return res.json({
      success: true,
      data: {
        ...hotel,
        amenities: typeof hotel.amenities === 'string' ? JSON.parse(hotel.amenities || '[]') : hotel.amenities
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch hotel details' });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const { id } = req.params;
    const rooms = await prisma.hotelRoom.findMany({
      where: { hotel_id: id }
    });
    return res.json({ success: true, count: rooms.length, data: rooms });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch rooms' });
  }
};

exports.bookRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      roomId,
      checkInDate,
      checkOutDate,
      adults = 2,
      children = 0,
      rooms = 1,
      contactName,
      contactEmail,
      contactPhone
    } = req.body;

    const hotel = await prisma.hotel.findUnique({ where: { id } });
    if (!hotel) return res.status(404).json({ success: false, message: 'Hotel not found' });

    let roomPrice = hotel.price_per_night;
    if (roomId) {
      const room = await prisma.hotelRoom.findUnique({ where: { id: roomId } });
      if (room) roomPrice = room.price_per_night;
    }

    const nights = 3;
    const subtotal = roomPrice * nights * Number(rooms);
    const gst = Math.round(subtotal * 0.12);
    const grandTotal = subtotal + gst;

    const bookingId = 'TC-HTL-' + Math.floor(100000 + Math.random() * 900000);

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        user_id: req.user?.id || null,
        item_type: 'hotel',
        item_id: id,
        item_title: hotel.name,
        destination: hotel.address || 'India',
        travel_date: checkInDate || 'Scheduled',
        adults: Number(adults),
        children: Number(children),
        rooms: Number(rooms),
        amount: subtotal,
        gst_amount: gst,
        status: 'Confirmed',
        contact_name: contactName || req.user?.name || 'Traveler',
        contact_email: contactEmail || req.user?.email || 'guest@tripcraft.in',
        contact_phone: contactPhone || '+91 98765 43210',
        share_token: 'bk_share_' + Math.random().toString(36).substring(2, 10)
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
      message: 'Hotel reservation confirmed',
      booking,
      summary: { nights, subtotal, gst, grandTotal }
    });
  } catch (err) {
    console.error('Hotel Book Error:', err);
    return res.status(500).json({ success: false, message: 'Booking failed', error: err.message });
  }
};
