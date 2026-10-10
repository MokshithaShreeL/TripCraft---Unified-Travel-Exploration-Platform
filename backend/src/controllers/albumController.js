const prisma = require('../models/prismaClient');

exports.getAlbums = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr_priya_01';
    const albums = await prisma.photoAlbum.findMany({
      where: { user_id: userId }
    });

    return res.json({
      success: true,
      count: albums.length,
      data: albums.map(a => ({
        ...a,
        photos: typeof a.photos_data === 'string' ? JSON.parse(a.photos_data || '[]') : []
      }))
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch photo albums' });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr_priya_01';
    const { title, destination, capacityTier = 250, theme = 'Nordic Modern', price = 499 } = req.body;

    const album = await prisma.photoAlbum.create({
      data: {
        user_id: userId,
        title: title || 'My Indian Journey Memory Book',
        destination: destination || 'Munnar',
        capacity_tier: Number(capacityTier),
        theme,
        price: Number(price),
        photos_count: 0,
        photos_data: '[]',
        share_token: 'alb_token_' + Math.random().toString(36).substring(2, 10)
      }
    });

    return res.status(201).json({ success: true, message: 'Album created', album });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create album' });
  }
};

exports.addPhotos = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPhotos } = req.body;

    const album = await prisma.photoAlbum.findUnique({ where: { id } });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });

    const currentPhotos = typeof album.photos_data === 'string' ? JSON.parse(album.photos_data || '[]') : [];
    const combined = [...currentPhotos, ...(newPhotos || [])];

    if (combined.length > album.capacity_tier) {
      return res.status(400).json({
        success: false,
        message: `Capacity limit exceeded. Current plan allows up to ${album.capacity_tier} photos.`
      });
    }

    const updated = await prisma.photoAlbum.update({
      where: { id },
      data: {
        photos_count: combined.length,
        photos_data: JSON.stringify(combined)
      }
    });

    return res.json({ success: true, message: 'Photos added to album', count: combined.length, album: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to add photos' });
  }
};

exports.purchaseAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethod = 'UPI / NetBanking' } = req.body;

    const album = await prisma.photoAlbum.findUnique({ where: { id } });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });

    const bookingId = 'TC-ALB-' + Math.floor(100000 + Math.random() * 900000);

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        user_id: album.user_id,
        item_type: 'album',
        item_id: album.id,
        item_title: `Digital Photo Keepsake Album: ${album.title}`,
        destination: album.destination,
        travel_date: 'Instant Access',
        adults: 1,
        amount: album.price,
        gst_amount: Math.round(album.price * 0.18),
        status: 'Completed',
        contact_name: req.user?.name || 'Traveler',
        contact_email: req.user?.email || 'traveler@tripcraft.in',
        share_token: album.share_token
      }
    });

    const updated = await prisma.photoAlbum.update({
      where: { id },
      data: { is_purchased: true }
    });

    await prisma.notification.create({
      data: {
        user_id: album.user_id,
        title: 'Photo Album Order Complete',
        message: `Your keepsake album "${album.title}" is unlocked and available for PDF export and web sharing.`,
        type: 'payment'
      }
    });

    return res.json({
      success: true,
      message: 'Photo album purchased and digital access activated',
      booking,
      shareLink: `/shared/album/${album.share_token}`,
      album: updated
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Album purchase failed' });
  }
};
