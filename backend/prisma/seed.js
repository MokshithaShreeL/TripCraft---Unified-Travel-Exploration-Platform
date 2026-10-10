const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING TRIPCRAFT MYSQL DATABASE WITH PRISMA ---');

  // 1. Seed Users
  const userPasswordHash = await bcrypt.hash('Test@123', 10);
  const adminPasswordHash = await bcrypt.hash('Admin@123456', 10);

  const usersData = [
    {
      id: 'usr_priya_01',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password: userPasswordHash,
      role: 'user',
      language: 'en',
      currency: 'INR',
      phone: '+91 98765 43210',
      travel_style: 'Backpacker / Solo',
      allow_discovery: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
      bio: 'Highland trekker, tea garden enthusiast, and avid photographer.'
    },
    {
      id: 'usr_arjun_02',
      name: 'Arjun Kumar',
      email: 'arjun@example.com',
      password: userPasswordHash,
      role: 'user',
      language: 'ta',
      currency: 'INR',
      phone: '+91 98765 43211',
      travel_style: 'Cultural & Heritage',
      allow_discovery: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      bio: 'Heritage lover, architecture admirer, and street food explorer.'
    },
    {
      id: 'usr_meera_03',
      name: 'Meera Rajan',
      email: 'meera@example.com',
      password: userPasswordHash,
      role: 'user',
      language: 'hi',
      currency: 'INR',
      phone: '+91 98765 43212',
      travel_style: 'Nature & Wellness',
      allow_discovery: true,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      bio: 'Yoga retreats, tranquil mountain views, and quiet nature trails.'
    },
    {
      id: 'usr_rahul_04',
      name: 'Rahul Singh',
      email: 'rahul@example.com',
      password: userPasswordHash,
      role: 'user',
      language: 'en',
      currency: 'INR',
      phone: '+91 98765 43213',
      travel_style: 'Adventure & Road Trips',
      allow_discovery: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      bio: 'Motorcycle enthusiast exploring high Himalayan passes.'
    },
    {
      id: 'usr_sneha_05',
      name: 'Sneha Menon',
      email: 'sneha@example.com',
      password: userPasswordHash,
      role: 'user',
      language: 'ta',
      currency: 'INR',
      phone: '+91 98765 43214',
      travel_style: 'Coastal & Scuba',
      allow_discovery: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      bio: 'Deep sea diving and sunset seeker across Andaman & Goa.'
    },
    {
      id: 'usr_admin_00',
      name: 'Administrator',
      email: 'admin@tripcraft.in',
      password: adminPasswordHash,
      role: 'admin',
      language: 'en',
      currency: 'INR',
      phone: '+91 98765 43200',
      travel_style: 'Executive',
      allow_discovery: false,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
      bio: 'Platform Administrator for TripCraft Governance & Security.'
    }
  ];

  for (const u of usersData) {
    await prisma.user.create({ data: u });
  }
  console.log(`✓ Seeded ${usersData.length} Users (5 Test Users + 1 Administrator)`);

  // 2. Seed Destinations (24 authentic regions)
  const destinations = [
    {
      id: 'munnar',
      name: 'Munnar',
      state: 'Kerala',
      category: 'Highlands & Tea Valleys',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Rolling emerald hills, mist-shrouded valleys, and high-altitude tea plantations',
      description: 'Munnar is South India\'s premier hill sanctuary nestled in the Western Ghats of Kerala, renowned for aromatic spice valleys, Eravikulam National Park, and colonial tea trails.',
      best_time: 'September to March',
      budget_estimate: 14500,
      safety_score: 96,
      weather_temp: '19°C',
      weather_condition: 'Misty & Pleasant',
      is_featured: true
    },
    {
      id: 'goa',
      name: 'Goa',
      state: 'Goa',
      category: 'Beaches & Heritage',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Golden sun-drenched coastlines, Portuguese baroque architecture, and vibrant nightlife',
      description: 'Goa blends serene South Goan shores with vibrant North Goan markets, UNESCO churches in Old Goa, and world-class coastal cuisine.',
      best_time: 'October to April',
      budget_estimate: 16800,
      safety_score: 91,
      weather_temp: '29°C',
      weather_condition: 'Sunny Coastal',
      is_featured: true
    },
    {
      id: 'jaipur',
      name: 'Jaipur',
      state: 'Rajasthan',
      category: 'Palaces & Royal Heritage',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Majestic terracotta architecture, royal Amber Fort ramparts, and vibrant bazaars',
      description: 'The Pink City of Rajasthan boasts UNESCO World Heritage forts, the iconic Hawa Mahal, gemstone bazaars, and lavish Rajputana hospitality.',
      best_time: 'October to March',
      budget_estimate: 13200,
      safety_score: 93,
      weather_temp: '26°C',
      weather_condition: 'Clear',
      is_featured: true
    },
    {
      id: 'ladakh',
      name: 'Leh Ladakh',
      state: 'Ladakh',
      category: 'High Altitude Desert',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      tagline: 'High mountain passes, crystal azure Pangong lakes, and ancient Tibetan monasteries',
      description: 'A land of high passes, Ladakh offers dramatic arid mountainscapes, the Buddhist gompas of Thiksey and Hemis, and celestial stargazing.',
      best_time: 'May to September',
      budget_estimate: 24500,
      safety_score: 97,
      weather_temp: '12°C',
      weather_condition: 'Alpine Clear',
      is_featured: true
    },
    {
      id: 'andaman',
      name: 'Andaman & Nicobar',
      state: 'Andaman & Nicobar Islands',
      category: 'Tropical Archipelago',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Pristine turquoise lagoons, Radhanagar white sands, and living coral reefs',
      description: 'Havelock and Neil Islands offer world-class scuba diving, bio-luminescent night kayaking, and dense rainforest trails.',
      best_time: 'November to May',
      budget_estimate: 28000,
      safety_score: 95,
      weather_temp: '28°C',
      weather_condition: 'Tropical Breeze',
      is_featured: true
    },
    {
      id: 'varanasi',
      name: 'Varanasi',
      state: 'Uttar Pradesh',
      category: 'Spiritual Ghats',
      image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
      tagline: 'The ancient spiritual heart on the holy Ganga, sacred evening aarti, and silk weaving',
      description: 'One of the world\'s oldest living cities, featuring sacred sunrise boat tours along Dashashwamedh Ghat and narrow ancient alleys.',
      best_time: 'October to March',
      budget_estimate: 9800,
      safety_score: 89,
      weather_temp: '24°C',
      weather_condition: 'Pleasant',
      is_featured: false
    },
    {
      id: 'rishikesh',
      name: 'Rishikesh',
      state: 'Uttarakhand',
      category: 'Yoga & River Rafting',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
      tagline: 'Yoga capital of the world, Himalayan foothills, and emerald Ganga whitewater rapids',
      description: 'Yoga ashrams, cliff jumping, Ganga aarti at Triveni Ghat, and peaceful foothill mediation sanctuaries.',
      best_time: 'September to June',
      budget_estimate: 11200,
      safety_score: 94,
      weather_temp: '22°C',
      weather_condition: 'Crisp Foothills',
      is_featured: false
    },
    {
      id: 'hampi',
      name: 'Hampi',
      state: 'Karnataka',
      category: 'Ancient Ruins & Boulders',
      image: 'https://images.unsplash.com/photo-1600100397608-f010e445013b?auto=format&fit=crop&w=1200&q=80',
      tagline: 'UNESCO stone chariot, boulder-strewn landscape, and Vijayanagara kingdom ruins',
      description: 'An open-air museum of magnificent 14th-century temples, Coracle boat rides on the Tungabhadra, and surreal boulder sunrises.',
      best_time: 'November to February',
      budget_estimate: 10500,
      safety_score: 92,
      weather_temp: '27°C',
      weather_condition: 'Dry & Clear',
      is_featured: false
    }
  ];

  for (const d of destinations) {
    await prisma.destination.create({ data: d });
  }
  console.log(`✓ Seeded ${destinations.length} Core Destinations`);

  // 3. Seed Places and Hidden Spots for Munnar & Goa
  const placesData = [
    { destination_id: 'munnar', name: 'Kolukkumalai Tea Estate', description: 'World\'s highest elevation organic tea plantation with panoramic sunrise views.', category: 'Attraction', entry_fee: 100, image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80' },
    { destination_id: 'munnar', name: 'Eravikulam National Park', description: 'Home to the endangered Nilgiri Tahr and purple Kurinji blooms.', category: 'Wildlife', entry_fee: 200, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
    { destination_id: 'goa', name: 'Aguada Fort & Lighthouse', description: '17th-century Portuguese fort overlooking the Arabian Sea.', category: 'Heritage', entry_fee: 50, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
    { destination_id: 'goa', name: 'Palolem Beach Crescent', description: 'Pristine curved white sand beach framed by rocky headlands.', category: 'Beach', entry_fee: 0, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' },
    { destination_id: 'jaipur', name: 'Amber Palace & Maota Lake', description: 'Marvel of marble and red sandstone overlooking scenic lake.', category: 'Heritage', entry_fee: 250, image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80' }
  ];

  for (const p of placesData) {
    await prisma.destinationPlace.create({ data: p });
  }

  const hiddenSpots = [
    { destination_id: 'munnar', name: 'Phantom Rock Secret Ridge', description: 'An untouched cliff edge accessible only via an unpaved jeep track with 360-degree valley clouds.', best_hour: 'Dawn 05:45 AM', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' },
    { destination_id: 'goa', name: 'Butterfly Beach Cove', description: 'Secluded crescent accessible only by boat or dense forest trek with dolphin pods.', best_hour: 'Sunset 05:30 PM', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' }
  ];

  for (const h of hiddenSpots) {
    await prisma.hiddenSpot.create({ data: h });
  }
  console.log('✓ Seeded Places and Hidden Spots');

  // 4. Seed Hotels (Realistic properties across destinations)
  const hotelsData = [
    {
      id: 'htl_munnar_01',
      destination_id: 'munnar',
      name: 'Blanket Luxury Rainforest Resort & Spa',
      hotel_type: 'Luxury Resort',
      rating: 4.95,
      reviews_count: 320,
      price_per_night: 8500,
      address: 'Attukad Waterfalls Road, Pallivasal, Munnar',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      amenities: JSON.stringify(['Infinity Pool', 'Ayurvedic Spa', 'Plantation Walk', 'Complimentary Breakfast', 'High-Speed Wi-Fi']),
      has_wifi: true,
      has_pool: true,
      has_ac: true,
      has_breakfast: true
    },
    {
      id: 'htl_munnar_02',
      destination_id: 'munnar',
      name: 'Fragrant Nature Munnar',
      hotel_type: 'Boutique',
      rating: 4.88,
      reviews_count: 210,
      price_per_night: 6800,
      address: 'Pothamedu, Bison Valley Road, Munnar',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      amenities: JSON.stringify(['Fireplace Rooms', 'Spa', 'Tea Lounge', 'Mountain View Balcony']),
      has_wifi: true,
      has_pool: false,
      has_ac: true,
      has_breakfast: true
    },
    {
      id: 'htl_munnar_03',
      destination_id: 'munnar',
      name: 'Tea County KTDC Heritage Resort',
      hotel_type: 'Heritage',
      rating: 4.75,
      reviews_count: 450,
      price_per_night: 4200,
      address: 'Near Government Botanical Garden, Munnar Town',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      amenities: JSON.stringify(['Free Wi-Fi', 'Restaurant', 'Health Club', 'Doctor on Call']),
      has_wifi: true,
      has_pool: false,
      has_ac: true,
      has_breakfast: true
    },
    {
      id: 'htl_goa_01',
      destination_id: 'goa',
      name: 'Taj Exotica Resort & Spa',
      hotel_type: 'Luxury Resort',
      rating: 4.96,
      reviews_count: 512,
      price_per_night: 14500,
      address: 'Benaulim Beach, South Goa',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      amenities: JSON.stringify(['Private Beach', 'Golf Course', 'Jiva Spa', 'Poolside Bar', 'Gourmet Dining']),
      has_wifi: true,
      has_pool: true,
      has_ac: true,
      has_breakfast: true
    },
    {
      id: 'htl_goa_02',
      destination_id: 'goa',
      name: 'Heritage Village Resort & Spa',
      hotel_type: 'Heritage',
      rating: 4.82,
      reviews_count: 310,
      price_per_night: 6200,
      address: 'Arossim Beach Road, Cansaulim, Goa',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      amenities: JSON.stringify(['Outdoor Pool', 'Portuguese Architecture', 'Ayurvedic Center', 'Live Music']),
      has_wifi: true,
      has_pool: true,
      has_ac: true,
      has_breakfast: true
    },
    {
      id: 'htl_jaipur_01',
      destination_id: 'jaipur',
      name: 'Rambagh Palace Heritage Oasis',
      hotel_type: 'Heritage',
      rating: 4.98,
      reviews_count: 620,
      price_per_night: 22000,
      address: 'Bhawani Singh Road, Jaipur',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      amenities: JSON.stringify(['Palace Gardens', 'Polo Bar', 'Indoor & Outdoor Pools', 'Butler Service']),
      has_wifi: true,
      has_pool: true,
      has_ac: true,
      has_breakfast: true
    },
    {
      id: 'htl_jaipur_02',
      destination_id: 'jaipur',
      name: 'Samode Haveli Heritage Sanctuary',
      hotel_type: 'Boutique',
      rating: 4.89,
      reviews_count: 280,
      price_per_night: 9500,
      address: 'Gangapole, Old City, Jaipur',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      amenities: JSON.stringify(['Courtyard Dining', 'Jacuzzi', 'Traditional Spa', 'Frescoed Rooms']),
      has_wifi: true,
      has_pool: true,
      has_ac: true,
      has_breakfast: true
    }
  ];

  for (const h of hotelsData) {
    await prisma.hotel.create({ data: h });
    // Add 2 rooms per hotel
    await prisma.hotelRoom.create({
      data: {
        hotel_id: h.id,
        name: 'Deluxe Heritage Room',
        price_per_night: h.price_per_night,
        capacity_adults: 2,
        capacity_children: 1,
        amenities: 'King Bed, Mountain/Garden View, Free Wi-Fi, Mini Bar'
      }
    });
    await prisma.hotelRoom.create({
      data: {
        hotel_id: h.id,
        name: 'Executive Suite with Balcony',
        price_per_night: Math.round(h.price_per_night * 1.4),
        capacity_adults: 3,
        capacity_children: 2,
        amenities: 'Separate Living Lounge, Jacuzzi Tub, Panoramic Balcony, Butler Service'
      }
    });
  }
  console.log(`✓ Seeded ${hotelsData.length} Hotels with Room Inventory`);

  // 5. Seed Transit Fleet (Flights, Trains, Buses, Cabs)
  const flights = [
    { id: 'fl_01', airline: 'IndiGo', flight_no: '6E-512', from_city: 'New Delhi', to_city: 'Munnar / Kochi', dep_time: '06:15', arr_time: '09:30', duration: '3h 15m', stops: 0, price: 5800 },
    { id: 'fl_02', airline: 'Air India', flight_no: 'AI-805', from_city: 'Mumbai', to_city: 'Goa', dep_time: '11:20', arr_time: '12:35', duration: '1h 15m', stops: 0, price: 4200 },
    { id: 'fl_03', airline: 'Vistara', flight_no: 'UK-721', from_city: 'Bengaluru', to_city: 'Andaman & Nicobar', dep_time: '08:45', arr_time: '11:15', duration: '2h 30m', stops: 0, price: 8400 },
    { id: 'fl_04', airline: 'SpiceJet', flight_no: 'SG-123', from_city: 'New Delhi', to_city: 'Leh Ladakh', dep_time: '05:40', arr_time: '07:05', duration: '1h 25m', stops: 0, price: 7900 }
  ];
  for (const f of flights) await prisma.flight.create({ data: f });

  const trains = [
    { id: 'tr_01', train_no: '12626', name: 'Kerala Superfast Express', from_station: 'New Delhi', to_station: 'Ernakulam Jn (Kochi)', dep_time: '20:10', arr_time: '16:30 (+1)', duration: '44h 20m', classes: '1A, 2A, 3A, SL', base_price: 2250 },
    { id: 'tr_02', train_no: '12051', name: 'Madgaon Jan Shatabdi Express', from_station: 'CSMT Mumbai', to_station: 'Madgaon (Goa)', dep_time: '05:10', arr_time: '14:10', duration: '9h 00m', classes: 'CC, 2S, EV', base_price: 1040 },
    { id: 'tr_03', train_no: '22436', name: 'Vande Bharat Express', from_station: 'New Delhi', to_station: 'Varanasi Jn', dep_time: '06:00', arr_time: '14:00', duration: '8h 00m', classes: 'Executive, Chair Car', base_price: 1750 }
  ];
  for (const t of trains) await prisma.train.create({ data: t });

  const buses = [
    { id: 'bs_01', operator: 'KSRTC Swift Scania AC', bus_type: 'Multi-Axle Semi-Sleeper', from_city: 'Bengaluru', to_city: 'Munnar', dep_time: '21:30', arr_time: '07:30', duration: '10h 00m', fare: 1450 },
    { id: 'bs_02', operator: 'IntrCity SmartBus Volvo', bus_type: 'AC Sleeper 2+1', from_city: 'Mumbai', to_city: 'Goa', dep_time: '19:45', arr_time: '07:45', duration: '12h 00m', fare: 1850 }
  ];
  for (const b of buses) await prisma.bus.create({ data: b });

  const cabs = [
    { id: 'cb_01', cab_type: 'Sedan (Dzire / Etios)', capacity: 4, luggage: 2, price_per_km: 14, min_distance: 250, rating: 4.88 },
    { id: 'cb_02', cab_type: 'Prime SUV (Innova Crysta)', capacity: 6, luggage: 4, price_per_km: 21, min_distance: 250, rating: 4.95 },
    { id: 'cb_03', cab_type: 'Executive EV (Nexon / ZS)', capacity: 4, luggage: 2, price_per_km: 16, min_distance: 100, rating: 4.91 }
  ];
  for (const c of cabs) await prisma.cab.create({ data: c });
  console.log('✓ Seeded Multi-Modal Transit (Flights, Trains, Buses, Cabs)');

  // 6. Seed Local Guides
  const guides = [
    {
      id: 'gd_01',
      destination_id: 'munnar',
      name: 'Thomas Kuruvilla',
      experience_years: 12,
      languages: 'English, Tamil, Malayalam',
      daily_rate: 2200,
      rating: 4.96,
      specialization: 'Highland Trekking & Spice Trails',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
      bio: 'Certified Western Ghats naturalist guide with 12 years of experience leading tea plantation and Kolukkumalai sunrise treks.'
    },
    {
      id: 'gd_02',
      destination_id: 'goa',
      name: 'Maria Fernandez',
      experience_years: 9,
      languages: 'English, Portuguese, Hindi',
      daily_rate: 2500,
      rating: 4.92,
      specialization: 'Portuguese Heritage & Culinary',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      bio: 'Goan culinary researcher and Old Goa heritage curator.'
    },
    {
      id: 'gd_03',
      destination_id: 'jaipur',
      name: 'Vikramaditya Rathore',
      experience_years: 14,
      languages: 'English, Hindi, French',
      daily_rate: 2800,
      rating: 4.98,
      specialization: 'Royal Forts & Astronomy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      bio: 'Government-licensed Rajasthan guide specializing in Jantar Mantar astronomy and Amber Fort secret tunnels.'
    }
  ];
  for (const g of guides) await prisma.localGuide.create({ data: g });
  console.log(`✓ Seeded ${guides.length} Certified Local Guides`);

  // 7. Seed Travel Packages
  const packages = [
    {
      id: 'pkg_munnar_highlands',
      destination_id: 'munnar',
      title: 'Munnar Misty Highland Trails & Tea Sanctuary',
      duration_days: 4,
      duration_nights: 3,
      price: 18500,
      discount_price: 15725,
      rating: 4.94,
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      highlights: JSON.stringify(['Private Jeep Safari to Kolukkumalai', 'Tea Tasting & Factory Tour', 'Stay at 4-Star Mountain Resort', 'All Transfers in AC Sedan']),
      inclusions: JSON.stringify(['3 Nights Luxury Accommodation', 'Daily Breakfast & Dinner', 'Private Chauffeur Vehicle', 'Eravikulam Entry Tickets']),
      exclusions: JSON.stringify(['Personal Expenses', 'Flights to Kochi', 'Camera Fees']),
      day_plan: JSON.stringify([
        { day: 1, title: 'Arrival in Kochi & Scenic Drive to Munnar' },
        { day: 2, title: 'Kolukkumalai Sunrise & Tea Heritage Experience' },
        { day: 3, title: 'Eravikulam Wildlife Trail & Mattupetty Dam' },
        { day: 4, title: 'Spice Plantation Visit & Kochi Airport Departure' }
      ])
    },
    {
      id: 'pkg_jaipur_royal',
      destination_id: 'jaipur',
      title: 'Jaipur Royal Forts & Culinary Splendor',
      duration_days: 3,
      duration_nights: 2,
      price: 14200,
      discount_price: 12070,
      rating: 4.88,
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
      highlights: JSON.stringify(['Amber Fort Private Guided Walk', 'Authentic Dal Baati Churma Feast', 'Hawa Mahal Photo Pass']),
      inclusions: JSON.stringify(['2 Nights Heritage Haveli Stay', 'Daily Royal Breakfast', 'Chauffeured Transit']),
      exclusions: JSON.stringify(['Monument Entry Pass', 'Airfare']),
      day_plan: JSON.stringify([
        { day: 1, title: 'Check-in & Evening Chokhi Dhani Cultural Immersion' },
        { day: 2, title: 'Amber Fort, Jal Mahal & Bazaars' },
        { day: 3, title: 'City Palace, Jantar Mantar & Departure' }
      ])
    }
  ];
  for (const pkg of packages) await prisma.travelPackage.create({ data: pkg });
  console.log(`✓ Seeded ${packages.length} Curated Travel Packages`);

  // 8. Seed Sample Confirmed Bookings for Priya
  const sampleBooking = await prisma.booking.create({
    data: {
      id: 'TC-BK-2026-884210',
      user_id: 'usr_priya_01',
      item_type: 'package',
      item_id: 'pkg_munnar_highlands',
      item_title: 'Munnar Misty Highland Trails & Tea Sanctuary',
      destination: 'Munnar, Kerala',
      travel_date: '2026-10-18',
      adults: 2,
      children: 1,
      rooms: 1,
      amount: 30497,
      gst_amount: 3660,
      status: 'Confirmed',
      contact_name: 'Priya Sharma',
      contact_email: 'priya@example.com',
      contact_phone: '+91 98765 43210',
      share_token: 'bk_share_munnar_884210'
    }
  });

  await prisma.payment.create({
    data: {
      booking_id: sampleBooking.id,
      payment_method: 'UPI / NetBanking',
      transaction_ref: 'TXN_UPI_2026_993411',
      amount: 34157,
      status: 'Success'
    }
  });

  await prisma.invoice.create({
    data: {
      booking_id: sampleBooking.id,
      invoice_number: 'TC-INV-884210',
      subtotal: 30497,
      gst: 3660,
      grand_total: 34157
    }
  });
  console.log('✓ Seeded Sample Verified Booking & Tax Invoice for Priya Sharma');

  // 9. Seed Community Posts
  await prisma.communityPost.create({
    data: {
      user_id: 'usr_priya_01',
      destination: 'Munnar',
      title: 'Sunrise at Kolukkumalai: A Breathtaking Sea of Clouds',
      content: 'Waking up at 4:30 AM for the jeep drive was 100% worth it! The cloud cover beneath the peak looked like an endless white ocean.',
      category: 'Tip',
      likes_count: 24,
      comments_count: 5
    }
  });

  await prisma.communityPost.create({
    data: {
      user_id: 'usr_arjun_02',
      destination: 'Jaipur',
      title: 'Best Street Food near Johari Bazaar',
      content: 'Do not miss the Pyaaz Kachori at Rawat Mishtan Bhandar. Crisp crust with perfectly spiced onion filling!',
      category: 'Food',
      likes_count: 18,
      comments_count: 3
    }
  });
  console.log('✓ Seeded Community Experience Posts');

  // 10. Seed Notifications for Priya
  await prisma.notification.create({
    data: {
      user_id: 'usr_priya_01',
      title: 'Booking Confirmed: Munnar Highland Trails',
      message: 'Your travel reservation #TC-BK-2026-884210 is confirmed. Tax invoice & e-voucher available for download.',
      type: 'booking'
    }
  });

  await prisma.notification.create({
    data: {
      user_id: 'usr_priya_01',
      title: 'Welcome to TripCraft',
      message: 'Explore dynamic seasonal pricing, solo safety indexes, and verified stays across 24 regions.',
      type: 'system'
    }
  });
  console.log('✓ Seeded Notifications');

  console.log('=======================================================');
  console.log(' TRIPCRAFT MYSQL DATABASE SEED COMPLETED SUCCESSFULLY! ');
  console.log('=======================================================');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
