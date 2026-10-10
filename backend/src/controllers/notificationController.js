const prisma = require('../models/prismaClient');

exports.getAll = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr_priya_01';
    const notifications = await prisma.notification.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });
    return res.json({ success: true, count: notifications.length, data: notifications });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

exports.markRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.update({
      where: { id },
      data: { is_read: true }
    });
    return res.json({ success: true, notification });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update notification' });
  }
};
