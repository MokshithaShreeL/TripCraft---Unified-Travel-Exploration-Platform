const prisma = require('../models/prismaClient');
const aiProvider = require('../integrations/aiProvider');

exports.generateSmartPlan = async (req, res) => {
  try {
    const {
      destination = 'Munnar',
      fromDate,
      toDate,
      travelers = 2,
      budget = 30000,
      travelStyle = 'Comfort',
      interests = ['Nature', 'Food', 'Adventure'],
      language = 'en'
    } = req.body;

    const destKey = destination.trim().toLowerCase();

    // Fetch destination metadata
    const dest = await prisma.destination.findFirst({
      where: {
        OR: [
          { name: { contains: destKey } },
          { id: { contains: destKey } }
        ]
      },
      include: {
        places: true,
        hidden_spots: true,
        hotels: { take: 3 },
        guides: { take: 2 }
      }
    });

    const days = 4;

    const smartResult = await aiProvider.generateSmartPlan({
      destination: dest ? dest.name : destination,
      days,
      travelers,
      budget,
      travelStyle,
      interests: Array.isArray(interests) ? interests.join(', ') : interests,
      language
    });

    return res.json({
      success: true,
      plan: {
        ...smartResult,
        destinationDetails: dest ? {
          name: dest.name,
          state: dest.state,
          image: dest.image,
          safetyScore: dest.safety_score,
          places: dest.places,
          hiddenSpots: dest.hidden_spots,
          recommendedHotels: dest.hotels,
          recommendedGuides: dest.guides
        } : null
      }
    });
  } catch (err) {
    console.error('Smart Planner Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to generate travel plan', error: err.message });
  }
};
