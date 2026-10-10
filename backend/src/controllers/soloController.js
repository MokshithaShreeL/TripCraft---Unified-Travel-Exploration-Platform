const prisma = require('../models/prismaClient');

exports.getSoloHub = async (req, res) => {
  try {
    const { destination = 'Munnar' } = req.query;

    const destKey = destination.trim().toLowerCase();
    const dest = await prisma.destination.findFirst({
      where: {
        OR: [
          { name: { contains: destKey } },
          { id: { contains: destKey } }
        ]
      }
    });

    const destId = dest ? dest.id : 'munnar';

    // 1. Fetch solo-friendly verified hotels (e.g. has 24/7 desk & wifi)
    const hotels = await prisma.hotel.findMany({
      where: { destination_id: destId, has_wifi: true },
      take: 4
    });

    // 2. Fetch guides with trekking/culture specialization
    const guides = await prisma.localGuide.findMany({
      where: { destination_id: destId },
      take: 2
    });

    // 3. Fetch discovered solo travelers who opted in (excluding current user)
    const currentUserId = req.user?.id || '';
    const discoveredTravelers = await prisma.user.findMany({
      where: {
        allow_discovery: true,
        id: { not: currentUserId }
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        travel_style: true,
        language: true,
        bio: true
      },
      take: 6
    });

    return res.json({
      success: true,
      destination: dest ? {
        id: dest.id,
        name: dest.name,
        safetyScore: dest.safety_score,
        emergencyHelpline: {
          police: '112',
          womenSafety: '1091',
          touristHelpline: '1363'
        }
      } : null,
      soloHotels: hotels,
      guides,
      discoveredTravelers
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch solo travel hub', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id || 'usr_priya_01';
    const { destination, travelMonth, travelStyle, interests, allowDiscovery } = req.body;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        allow_discovery: allowDiscovery !== undefined ? allowDiscovery : true,
        travel_style: travelStyle || 'Adventure'
      }
    });

    return res.json({ success: true, message: 'Solo travel preferences updated', user: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update solo profile' });
  }
};

exports.sendConnectionRequest = async (req, res) => {
  try {
    const senderId = req.user?.id || 'usr_priya_01';
    const { receiverId, destination } = req.body;

    if (!receiverId || senderId === receiverId) {
      return res.status(400).json({ success: false, message: 'Invalid connection target' });
    }

    const request = await prisma.soloConnectionRequest.create({
      data: {
        sender_id: senderId,
        receiver_id: receiverId,
        destination: destination || 'Munnar',
        status: 'Pending'
      }
    });

    // Create notification for receiver
    await prisma.notification.create({
      data: {
        user_id: receiverId,
        title: 'New Solo Travel Connection Request',
        message: 'A verified traveler would like to connect for your upcoming journey.',
        type: 'solo'
      }
    });

    return res.status(201).json({ success: true, message: 'Connection request sent successfully', request });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to send connection request' });
  }
};

exports.handleConnection = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "Accepted" | "Rejected"

    const updated = await prisma.soloConnectionRequest.update({
      where: { id },
      data: { status }
    });

    return res.json({ success: true, message: `Connection ${status.toLowerCase()}`, request: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update connection' });
  }
};
