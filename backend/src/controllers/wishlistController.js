const prisma = require('../models/prismaClient');

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr_priya_01';
    const items = await prisma.wishlist.findMany({
      where: { user_id: userId }
    });
    return res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch wishlist' });
  }
};

exports.addItem = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr_priya_01';
    const { itemType, itemId, title, image, price } = req.body;

    const item = await prisma.wishlist.upsert({
      where: {
        user_id_item_type_item_id: {
          user_id: userId,
          item_type: itemType || 'destination',
          item_id: itemId
        }
      },
      update: { title, image, price: Number(price) || 0 },
      create: {
        user_id: userId,
        item_type: itemType || 'destination',
        item_id: itemId,
        title: title || 'Saved Item',
        image,
        price: Number(price) || 0
      }
    });

    return res.status(201).json({ success: true, message: 'Item saved to wishlist', item });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to save to wishlist' });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.wishlist.deleteMany({
      where: { id }
    });
    return res.json({ success: true, message: 'Item removed from wishlist' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to remove from wishlist' });
  }
};
