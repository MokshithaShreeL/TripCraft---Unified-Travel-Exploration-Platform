const prisma = require('../models/prismaClient');
const flightProvider = require('../integrations/flightProvider');
const trainProvider = require('../integrations/trainProvider');
const busProvider = require('../integrations/busProvider');
const weatherProvider = require('../integrations/weatherProvider');

exports.search = async (req, res) => {
  try {
    const {
      destination = 'Munnar',
      fromDate,
      toDate,
      adults = 2,
      children = 0,
      infants = 0,
      rooms = 1
    } = req.query;

    const destKey = destination.trim().toLowerCase();

    // 1. Fetch matching destination
    let dest = await prisma.destination.findFirst({
      where: {
        OR: [
          { name: { contains: destKey } },
          { state: { contains: destKey } },
          { id: { contains: destKey } }
        ]
      },
      include: {
        places: true,
        hidden_spots: true
      }
    });

    if (!dest) {
      dest = await prisma.destination.findFirst({
        include: { places: true, hidden_spots: true }
      });
    }

    const destId = dest ? dest.id : 'munnar';

    // 2. Fetch all matching hotels with no artificial slice
    const hotels = await prisma.hotel.findMany({
      where: { destination_id: destId },
      include: { rooms: true }
    });

    // 3. Fetch certified guides
    const guides = await prisma.localGuide.findMany({
      where: { destination_id: destId }
    });

    // 4. Fetch packages
    const packages = await prisma.travelPackage.findMany({
      where: { destination_id: destId }
    });

    // 5. Fetch multi-modal transit options
    const flightResults = await flightProvider.searchFlights({ to: dest.name, adults, children });
    const trainResults = await trainProvider.searchTrains({ to: dest.name });
    const busResults = await busProvider.searchBuses({ to: dest.name });
    const cabs = await prisma.cab.findMany();

    // 6. Fetch live/fallback weather
    const weather = await weatherProvider.getWeather(dest.name);

    // 7. Calculate realistic dynamic budget estimate
    const totalPassengers = Number(adults) + Number(children);
    const avgHotelNight = hotels.length > 0 ? hotels[0].price_per_night : 5000;
    const estHotel = avgHotelNight * Number(rooms) * 3;
    const estTransit = 3500 * totalPassengers;
    const estFood = 1200 * totalPassengers * 3;
    const estActivities = 1500 * totalPassengers;
    const totalEst = estHotel + estTransit + estFood + estActivities;

    return res.json({
      success: true,
      query: {
        destination: dest.name,
        fromDate,
        toDate,
        adults: Number(adults),
        children: Number(children),
        infants: Number(infants),
        rooms: Number(rooms),
        totalPassengers
      },
      destination: {
        id: dest.id,
        name: dest.name,
        state: dest.state,
        category: dest.category,
        image: dest.image,
        tagline: dest.tagline,
        description: dest.description,
        bestTime: dest.best_time,
        safetyScore: dest.safety_score,
        weather
      },
      places: dest.places || [],
      hiddenSpots: dest.hidden_spots || [],
      hotels: hotels.map(h => ({
        ...h,
        amenities: typeof h.amenities === 'string' ? JSON.parse(h.amenities || '[]') : h.amenities
      })),
      guides,
      packages: packages.map(p => ({
        ...p,
        highlights: typeof p.highlights === 'string' ? JSON.parse(p.highlights || '[]') : p.highlights,
        inclusions: typeof p.inclusions === 'string' ? JSON.parse(p.inclusions || '[]') : p.inclusions,
        dayPlan: typeof p.day_plan === 'string' ? JSON.parse(p.day_plan || '[]') : p.day_plan
      })),
      transport: {
        flights: flightResults.data || [],
        trains: trainResults.data || [],
        buses: busResults.data || [],
        cabs: cabs.map(c => ({
          ...c,
          features: typeof c.features === 'string' ? JSON.parse(c.features || '[]') : c.features
        }))
      },
      budgetEstimate: {
        total: totalEst,
        accommodation: estHotel,
        transport: estTransit,
        food: estFood,
        activities: estActivities
      }
    });
  } catch (err) {
    console.error('Search API Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process travel search', error: err.message });
  }
};
