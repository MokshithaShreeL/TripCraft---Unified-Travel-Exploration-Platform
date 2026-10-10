// TripCraft Master Authentic Mock Data Repository
// Strictly 100% valid authentic travel data — Zero generic lorem ipsum

export const DEMO_USERS = [
  {
    "id": "usr_admin_01",
    "name": "Aakash Mehta",
    "email": "admin@tripcraft.io",
    "password": "TripCraftAdmin#2026",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    "phone": "+91 98765 43210",
    "loyaltyTier": "Platinum",
    "loyaltyPoints": 12500,
    "memberSince": "Jan 2024",
    "bio": "Head of Operations & Platform Quality at TripCraft India."
  },
  {
    "id": "usr_solo_02",
    "name": "Priya Sharma",
    "email": "priya.backpacker@gmail.com",
    "password": "Travel@123",
    "role": "traveler",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    "phone": "+91 94455 12345",
    "loyaltyTier": "Gold",
    "loyaltyPoints": 4800,
    "memberSince": "Mar 2024",
    "bio": "Solo female explorer. Hiked across 18 states in India. Safety advocate & photographer."
  },
  {
    "id": "usr_family_03",
    "name": "Vikram & Neha Iyer",
    "email": "vikram.family@tripcraft.io",
    "password": "Family@123",
    "role": "traveler",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    "phone": "+91 98840 98765",
    "loyaltyTier": "Silver",
    "loyaltyPoints": 2100,
    "memberSince": "Aug 2024",
    "bio": "Family travelers with two curious kids (Aarav 8, Diya 4). Exploring nature & heritage."
  },
  {
    "id": "usr_luxury_04",
    "name": "Ananya Roy",
    "email": "ananya.luxury@gmail.com",
    "password": "Luxury@123",
    "role": "traveler",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
    "phone": "+91 97112 34567",
    "loyaltyTier": "Platinum Elite",
    "loyaltyPoints": 24300,
    "memberSince": "Jan 2023",
    "bio": "Curator of luxury travel itineraries, boutique heritage estates, and gourmet food trails."
  }
];

export const DESTINATIONS = [
  {
    "id": "dest_munnar",
    "name": "Munnar",
    "state": "Kerala",
    "tagline": "Rolling Emerald Tea Hills & Misty Valley Retreats",
    "category": "Hill Station",
    "heroImage": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.88,
    "reviewsCount": 2480,
    "basePrice": 3800,
    "bestTimeToVisit": "September – March",
    "weather": {
      "temp": "18°C",
      "condition": "Pleasant & Misty",
      "humidity": "65%"
    },
    "safetyScore": 96,
    "womenSafeScore": 95,
    "description": "Nestled at 1,600m in the Western Ghats, Munnar is south India's premier tea sanctuary with aromatic plantations, cascading waterfalls, and rare Nilgiri Tahr sightings.",
    "highlights": [
      "Eravikulam National Park Safari",
      "Kolukkumalai Sunrise 4x4 Jeep Trek",
      "Tea Museum & Fresh Tasting",
      "Mattupetty Dam Speedboat"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "Couples",
      "Solo Travelers",
      "Nature Walkers",
      "Photographers"
    ]
  },
  {
    "id": "dest_goa",
    "name": "Goa",
    "state": "Goa",
    "tagline": "Sun-Kissed Beaches, Portuguese Quarters & Vibrant Shacks",
    "category": "Beach",
    "heroImage": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.85,
    "reviewsCount": 3950,
    "basePrice": 4200,
    "bestTimeToVisit": "November – February",
    "weather": {
      "temp": "28°C",
      "condition": "Tropical Breeze",
      "humidity": "70%"
    },
    "safetyScore": 92,
    "womenSafeScore": 91,
    "description": "From tranquil southern coves of Palolem to vibrant northern shorelines, Goa blends Portuguese heritage in Fontainhas with coastal shacks, live music, and water sports.",
    "highlights": [
      "Fontainhas Latin Quarter Walking Tour",
      "Palolem Silent Noise & Kayaking",
      "Dudhsagar Jungle Jeep Expedition",
      "Sunset Catamaran Cruise"
    ],
    "suggestedDuration": "4 - 5 Days",
    "idealFor": [
      "Solo Backpackers",
      "Groups of Friends",
      "Couples",
      "Water Sports Lovers"
    ]
  },
  {
    "id": "dest_jaipur",
    "name": "Jaipur",
    "state": "Rajasthan",
    "tagline": "The Pink City of Royal Fortresses & Timeless Grandeur",
    "category": "Heritage",
    "heroImage": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.91,
    "reviewsCount": 3120,
    "basePrice": 3500,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "22°C",
      "condition": "Sunny & Mild",
      "humidity": "42%"
    },
    "safetyScore": 93,
    "womenSafeScore": 92,
    "description": "Capital of Rajasthan, famed for honeycomb Hawa Mahal, colossal Amber Fort perched on Aravalli hills, vibrant Johari Bazaar textiles, and royal Rajput cuisine.",
    "highlights": [
      "Amber Fort Heritage Walk & Mirror Palace",
      "Hawa Mahal Sunrise Cafe View",
      "Nahargarh Sunset Cycling Tour",
      "Johari & Bapu Bazaar Craft Walk"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "History Buffs",
      "Architectural Explorers",
      "Families",
      "Culture Enthusiasts"
    ]
  },
  {
    "id": "dest_ladakh",
    "name": "Ladakh",
    "state": "Ladakh",
    "tagline": "High-Altitude Passes, Crystal Lakes & Ancient Monasteries",
    "category": "Adventure",
    "heroImage": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.96,
    "reviewsCount": 1840,
    "basePrice": 6500,
    "bestTimeToVisit": "May – September",
    "weather": {
      "temp": "14°C",
      "condition": "Crisp & High UV",
      "humidity": "28%"
    },
    "safetyScore": 94,
    "womenSafeScore": 94,
    "description": "The Land of High Passes, featuring turquoise Pangong Tso, sand dunes of Nubra Valley, Khardung La pass at 17,982 ft, and clifftop Tibetan Buddhist gompas.",
    "highlights": [
      "Pangong Lake Camping under Milky Way",
      "Nubra Valley Double-Humped Camel Safari",
      "Thiksey Monastery Morning Chants",
      "Khardung La Pass Expedition"
    ],
    "suggestedDuration": "6 - 8 Days",
    "idealFor": [
      "Adventure Motorcyclists",
      "Trekkers",
      "Photographers",
      "Solo Explorers"
    ]
  },
  {
    "id": "dest_andaman",
    "name": "Andaman & Nicobar",
    "state": "Andaman Islands",
    "tagline": "Turquoise Lagoons, Coral Reefs & Pristine White Sands",
    "category": "Island",
    "heroImage": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.93,
    "reviewsCount": 2210,
    "basePrice": 6200,
    "bestTimeToVisit": "October – May",
    "weather": {
      "temp": "27°C",
      "condition": "Tropical & Sunny",
      "humidity": "74%"
    },
    "safetyScore": 97,
    "womenSafeScore": 97,
    "description": "India's premier archipelago paradise, featuring Asia's finest Radhanagar Beach on Havelock Island, vibrant scuba diving in coral reefs, and historic Cellular Jail.",
    "highlights": [
      "Radhanagar Beach Sunset Walk",
      "Scuba Diving at Elephant Beach Reef",
      "Cellular Jail Sound & Light Memorial",
      "Neil Island Natural Bridge Exploration"
    ],
    "suggestedDuration": "5 - 6 Days",
    "idealFor": [
      "Honeymooners",
      "Divers & Snorkelers",
      "Marine Enthusiasts",
      "Families"
    ]
  },
  {
    "id": "dest_varanasi",
    "name": "Varanasi",
    "state": "Uttar Pradesh",
    "tagline": "Eternal Spiritual Ghats & Sacred Ganga Aarti",
    "category": "Spiritual",
    "heroImage": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.87,
    "reviewsCount": 2890,
    "basePrice": 3100,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "21°C",
      "condition": "Cool Breeze",
      "humidity": "52%"
    },
    "safetyScore": 91,
    "womenSafeScore": 90,
    "description": "One of the world's oldest living cities on the banks of holy river Ganga. Witness mesmerizing evening Ganga Aarti at Dashashwamedh Ghat and sunrise boat rides.",
    "highlights": [
      "Subah-e-Banaras Sunrise Boat Ride",
      "Dashashwamedh Ghat Grand Evening Aarti",
      "Kashi Vishwanath Corridor Pilgrimage",
      "Sarnath Buddhist Stupa Excursion"
    ],
    "suggestedDuration": "2 - 3 Days",
    "idealFor": [
      "Spiritual Seekers",
      "Photographers",
      "Cultural Enthusiasts",
      "Solo Travelers"
    ]
  },
  {
    "id": "dest_rishikesh",
    "name": "Rishikesh",
    "state": "Uttarakhand",
    "tagline": "Yoga Capital of the World & Himalayan White-Water Rafting",
    "category": "Adventure",
    "heroImage": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.89,
    "reviewsCount": 2650,
    "basePrice": 3400,
    "bestTimeToVisit": "September – November & March – May",
    "weather": {
      "temp": "19°C",
      "condition": "Clear Mountain Air",
      "humidity": "48%"
    },
    "safetyScore": 95,
    "womenSafeScore": 95,
    "description": "Where emerald Ganga emerges from Himalayas. Famed for Grade 3/4 river rafting, clifftop bungee jumping, Beatles Ashram graffiti, and evening Triveni Aarti.",
    "highlights": [
      "Ganga River White-Water Rafting (16km/24km)",
      "The Beatles Ashram Historic Walk",
      "Triveni Ghat Evening Aarti Ceremony",
      "Bungee Jumping at Mohan Chatti"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "Yoga & Meditation Lovers",
      "Adventure Seekers",
      "Solo Travelers",
      "Youth"
    ]
  },
  {
    "id": "dest_hampi",
    "name": "Hampi",
    "state": "Karnataka",
    "tagline": "UNESCO Boulder Citadels of the Vijayanagara Empire",
    "category": "Heritage",
    "heroImage": "https://images.unsplash.com/photo-1600100397608-f010f443818e?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1600100397608-f010f443818e?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.9,
    "reviewsCount": 2010,
    "basePrice": 2900,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "25°C",
      "condition": "Dry & Sunny",
      "humidity": "40%"
    },
    "safetyScore": 93,
    "womenSafeScore": 93,
    "description": "A surreal open-air museum set amidst massive granite boulders and banana plantations. Home to the musical pillars of Vijaya Vittala and Virupaksha Temple.",
    "highlights": [
      "Vijaya Vittala Stone Chariot & Musical Pillars",
      "Matanga Hill Sunrise Panorama",
      "Coracle Boat Ride across Tungabhadra",
      "Hippie Island Bouldering & Cafes"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "History & Archeology Lovers",
      "Backpackers",
      "Photographers",
      "Trekkers"
    ]
  },
  {
    "id": "dest_udaipur",
    "name": "Udaipur",
    "state": "Rajasthan",
    "tagline": "City of Lakes, Marble Palaces & Romantic Sunsets",
    "category": "Heritage",
    "heroImage": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.92,
    "reviewsCount": 2780,
    "basePrice": 4100,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "23°C",
      "condition": "Sunny & Gentle Breeze",
      "humidity": "45%"
    },
    "safetyScore": 94,
    "womenSafeScore": 94,
    "description": "Surrounded by Aravalli Hills and shimmering lakes, Udaipur boasts Lake Pichola, City Palace complex, Jag Mandir island, and romantic rooftop dining.",
    "highlights": [
      "Lake Pichola Sunset Boat Cruise",
      "City Palace Museum & Crystal Gallery",
      "Saheliyon-ki-Bari Gardens Walk",
      "Monsoon Palace Hilltop Vista"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "Couples",
      "Honeymooners",
      "Luxury Seekers",
      "Heritage Fans"
    ]
  },
  {
    "id": "dest_manali",
    "name": "Manali",
    "state": "Himachal Pradesh",
    "tagline": "Alpine Valleys, Snow Glaciers & Solang Adventure",
    "category": "Hill Station",
    "heroImage": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.84,
    "reviewsCount": 3410,
    "basePrice": 3600,
    "bestTimeToVisit": "October – June",
    "weather": {
      "temp": "12°C",
      "condition": "Cool Alpine Breeze",
      "humidity": "50%"
    },
    "safetyScore": 92,
    "womenSafeScore": 91,
    "description": "Gateway to the high Himalayas in the Beas River Valley. Famous for pine-covered trails, Solang Valley paragliding, Atal Tunnel drive, and Old Manali cafes.",
    "highlights": [
      "Solang Valley Paragliding & Zorbing",
      "Atal Tunnel Drive to Sissu Waterfall",
      "Hadimba Devi Cedar Forest Shrine",
      "Jogini Waterfall Hike"
    ],
    "suggestedDuration": "4 - 5 Days",
    "idealFor": [
      "Adventure Lovers",
      "Snow Enthusiasts",
      "Backpackers",
      "Couples"
    ]
  },
  {
    "id": "dest_ooty",
    "name": "Ooty",
    "state": "Tamil Nadu",
    "tagline": "Queen of Nilgiris, Toy Train & Botanical Splendor",
    "category": "Hill Station",
    "heroImage": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.79,
    "reviewsCount": 2190,
    "basePrice": 3200,
    "bestTimeToVisit": "October – June",
    "weather": {
      "temp": "15°C",
      "condition": "Crisp & Pleasant",
      "humidity": "62%"
    },
    "safetyScore": 95,
    "womenSafeScore": 95,
    "description": "Nestled in the Blue Mountains, Ooty features the UNESCO Nilgiri Mountain Railway, terraced tea gardens, Pykara Lake boating, and vibrant rose gardens.",
    "highlights": [
      "Nilgiri Toy Train Heritage Ride",
      "Doddabetta Peak Viewpoint",
      "Pykara Waterfalls & Lake Speedboat",
      "Government Botanical Gardens"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "Families",
      "Couples",
      "Tea Garden Walkers"
    ]
  },
  {
    "id": "dest_coorg",
    "name": "Coorg",
    "state": "Karnataka",
    "tagline": "Scotland of India, Coffee Estates & Abbey Falls",
    "category": "Hill Station",
    "heroImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.86,
    "reviewsCount": 1980,
    "basePrice": 3900,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "20°C",
      "condition": "Aromatic & Refreshing",
      "humidity": "66%"
    },
    "safetyScore": 96,
    "womenSafeScore": 96,
    "description": "Kodagu, famed for lush coffee plantations, spice trails, Kodava hospitality, Abbey Falls, and the serene Tibetan Golden Temple at Bylakuppe.",
    "highlights": [
      "Coffee Plantation Estate Tour & Cupping",
      "Namdroling Golden Temple Bylakuppe",
      "Abbey & Iruppu Waterfalls Trek",
      "Raja's Seat Sunset Valley Panorama"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "Coffee Connoisseurs",
      "Couples",
      "Families",
      "Nature Lovers"
    ]
  },
  {
    "id": "dest_alleppey",
    "name": "Alleppey",
    "state": "Kerala",
    "tagline": "Venice of the East, Houseboat Cruises & Backwaters",
    "category": "Backwaters",
    "heroImage": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.9,
    "reviewsCount": 2340,
    "basePrice": 4800,
    "bestTimeToVisit": "November – February",
    "weather": {
      "temp": "26°C",
      "condition": "Lush & Breezy",
      "humidity": "72%"
    },
    "safetyScore": 96,
    "womenSafeScore": 95,
    "description": "Famous for tranquil backwater network, traditional thatched Kettuvallam houseboats, paddy fields below sea level in Kuttanad, and fresh Karimeen fish curry.",
    "highlights": [
      "Overnight Luxury Houseboat Cruise",
      "Shikara Boat Village Canals Tour",
      "Marari Pristine Beach Stroll",
      "Kuttanad Paddy Farm Walk"
    ],
    "suggestedDuration": "2 - 3 Days",
    "idealFor": [
      "Couples",
      "Families",
      "Relaxation Seekers"
    ]
  },
  {
    "id": "dest_jaisalmer",
    "name": "Jaisalmer",
    "state": "Rajasthan",
    "tagline": "The Golden City, Living Sandstone Fort & Thar Dunes",
    "category": "Heritage",
    "heroImage": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.88,
    "reviewsCount": 1720,
    "basePrice": 3800,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "24°C",
      "condition": "Warm Sun & Crisp Nights",
      "humidity": "30%"
    },
    "safetyScore": 93,
    "womenSafeScore": 92,
    "description": "The Golden City stands inside the Great Thar Desert, dominated by the living Jaisalmer Fort where thousands reside within honey-colored ramparts.",
    "highlights": [
      "Sam Sand Dunes Camel Safari & Sunset",
      "Golden Fort Living Citadel Walk",
      "Patwon Ki Haveli Filigree Architecture",
      "Desert Stargazing & Folk Dance Night"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "Desert Campers",
      "Photographers",
      "Heritage Enthusiasts"
    ]
  },
  {
    "id": "dest_darjeeling",
    "name": "Darjeeling",
    "state": "West Bengal",
    "tagline": "Champagne of Teas & Kanchenjunga Sunrise Vistas",
    "category": "Hill Station",
    "heroImage": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.83,
    "reviewsCount": 1890,
    "basePrice": 3600,
    "bestTimeToVisit": "March – May & October – December",
    "weather": {
      "temp": "13°C",
      "condition": "Crisp Mountain Breeze",
      "humidity": "65%"
    },
    "safetyScore": 95,
    "womenSafeScore": 94,
    "description": "Perched against the mighty Mount Kanchenjunga, Darjeeling is globally celebrated for Muscatel teas, UNESCO Himalayan Railway, and Tibetan monasteries.",
    "highlights": [
      "Tiger Hill 4:00 AM Sunrise over Kanchenjunga",
      "Batasia Loop Himalayan Toy Train",
      "Happy Valley Tea Estate Tasting",
      "Ghoom Monastery Tibetan Chants"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "Tea Lovers",
      "Mountain Admirers",
      "Couples",
      "Photographers"
    ]
  },
  {
    "id": "dest_pondicherry",
    "name": "Pondicherry",
    "state": "Puducherry",
    "tagline": "French Colonial Boulevards, Auroville & Serene Cafes",
    "category": "Beach",
    "heroImage": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.81,
    "reviewsCount": 2310,
    "basePrice": 3100,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "27°C",
      "condition": "Balmy Coastal Breeze",
      "humidity": "68%"
    },
    "safetyScore": 95,
    "womenSafeScore": 95,
    "description": "A tranquil French seaside town with pastel villas, bougainvillea streets, Sri Aurobindo Ashram, international township Auroville, and seaside promenade.",
    "highlights": [
      "White Town Vintage Bicycle Tour",
      "Auroville Matrimandir Meditation Dome",
      "Promenade Beach Rock Walk",
      "French Bakeries & Artisan Croissant Cafes"
    ],
    "suggestedDuration": "2 - 3 Days",
    "idealFor": [
      "Solo Travelers",
      "Couples",
      "Culinary Explorers",
      "Art Lovers"
    ]
  },
  {
    "id": "dest_amritsar",
    "name": "Amritsar",
    "state": "Punjab",
    "tagline": "The Golden Temple, Sacred Langar & Wagah Border Spirit",
    "category": "Spiritual",
    "heroImage": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.95,
    "reviewsCount": 3560,
    "basePrice": 2800,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "20°C",
      "condition": "Sunny & Pleasant",
      "humidity": "45%"
    },
    "safetyScore": 95,
    "womenSafeScore": 94,
    "description": "Heart of Sikh spiritual life, home to the gold-plated Harmandir Sahib floating in the sacred pool of nectar, legendary Langar community kitchen, and Wagah Border ceremony.",
    "highlights": [
      "Harmandir Sahib Golden Temple Night View",
      "Langar Seva Community Kitchen Experience",
      "Wagah Border Beating Retreat Ceremony",
      "Jallianwala Bagh Memorial Garden"
    ],
    "suggestedDuration": "2 - 3 Days",
    "idealFor": [
      "Spiritual Travelers",
      "Foodies",
      "History Enthusiasts",
      "Families"
    ]
  },
  {
    "id": "dest_meghalaya",
    "name": "Meghalaya",
    "state": "Meghalaya",
    "tagline": "Abode of Clouds, Living Root Bridges & Umngot River",
    "category": "Adventure",
    "heroImage": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.94,
    "reviewsCount": 1670,
    "basePrice": 4600,
    "bestTimeToVisit": "October – April",
    "weather": {
      "temp": "17°C",
      "condition": "Crisp & Mist Covered",
      "humidity": "75%"
    },
    "safetyScore": 96,
    "womenSafeScore": 96,
    "description": "The wettest place on earth, featuring double-decker living root bridges bio-engineered by the Khasi tribe, glass-clear waters of Dawki, and majestic Nohkalikai Falls.",
    "highlights": [
      "Nongriat Double-Decker Root Bridge Trek",
      "Dawki River Crystal Clear Boating",
      "Mawlynnong Cleanest Village Tour",
      "Cherrapunji Waterfalls Discovery"
    ],
    "suggestedDuration": "5 - 6 Days",
    "idealFor": [
      "Adventure Hikers",
      "Nature Purists",
      "Eco-Travelers"
    ]
  },
  {
    "id": "dest_gokarna",
    "name": "Gokarna",
    "state": "Karnataka",
    "tagline": "Serene Cliff Trails, Sacred Shrines & Om Beach Coves",
    "category": "Beach",
    "heroImage": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.84,
    "reviewsCount": 1420,
    "basePrice": 2900,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "27°C",
      "condition": "Sunny & Gentle Waves",
      "humidity": "65%"
    },
    "safetyScore": 94,
    "womenSafeScore": 93,
    "description": "A laid-back spiritual and coastal haven where five famous beaches (Kudle, Om, Half Moon, Paradise, Main) are linked by scenic cliff hiking paths.",
    "highlights": [
      "5-Beach Cliff Hiking Trail",
      "Om Beach Sunset Paddleboarding",
      "Mahabaleshwar Ancient Temple Visit",
      "Beachfront Shack Seafood Dining"
    ],
    "suggestedDuration": "2 - 4 Days",
    "idealFor": [
      "Solo Travelers",
      "Beach Trekkers",
      "Backpackers"
    ]
  },
  {
    "id": "dest_kaziranga",
    "name": "Kaziranga",
    "state": "Assam",
    "tagline": "UNESCO Sanctuary of the Great One-Horned Rhinoceros",
    "category": "Wildlife",
    "heroImage": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.92,
    "reviewsCount": 1150,
    "basePrice": 5200,
    "bestTimeToVisit": "November – April",
    "weather": {
      "temp": "20°C",
      "condition": "Lush & Sunny",
      "humidity": "60%"
    },
    "safetyScore": 95,
    "womenSafeScore": 94,
    "description": "Spread along the mighty Brahmaputra river, Kaziranga is home to world's largest population of great one-horned rhinos, wild water buffaloes, and tigers.",
    "highlights": [
      "Early Morning Elephant Safari",
      "Central Range Jeep Safari",
      "Assamese Tea Plantation Visit",
      "Orchid and Biodiversity Park"
    ],
    "suggestedDuration": "2 - 3 Days",
    "idealFor": [
      "Wildlife Photographers",
      "Birdwatchers",
      "Families"
    ]
  },
  {
    "id": "dest_kodaikanal",
    "name": "Kodaikanal",
    "state": "Tamil Nadu",
    "tagline": "Princess of Hill Stations, Star-Shaped Lake & Pine Forests",
    "category": "Hill Station",
    "heroImage": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.82,
    "reviewsCount": 1530,
    "basePrice": 3300,
    "bestTimeToVisit": "September – May",
    "weather": {
      "temp": "16°C",
      "condition": "Pleasant Fog & Breezes",
      "humidity": "68%"
    },
    "safetyScore": 93,
    "womenSafeScore": 93,
    "description": "Set amid the Palani Hills in Tamil Nadu, famed for its star-shaped lake, Pillar Rocks, Coaker's Walk cliff views, and homemade chocolates.",
    "highlights": [
      "Kodai Star Lake Rowing & Cycling",
      "Coaker's Walk Mountain Panorama",
      "Pillar Rocks & Guna Caves",
      "Bryant Botanical Park Stroll"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "Couples",
      "Hikers",
      "Families"
    ]
  },
  {
    "id": "dest_agra",
    "name": "Agra",
    "state": "Uttar Pradesh",
    "tagline": "City of the Immortal Taj Mahal & Imperial Mughal Citadels",
    "category": "Heritage",
    "heroImage": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.91,
    "reviewsCount": 3800,
    "basePrice": 3200,
    "bestTimeToVisit": "October – March",
    "weather": {
      "temp": "23°C",
      "condition": "Crisp & Pleasant",
      "humidity": "45%"
    },
    "safetyScore": 89,
    "womenSafeScore": 88,
    "description": "The crown jewel of Mughal architecture on the banks of Yamuna, housing the world wonder Taj Mahal, Agra Fort, and Fatehpur Sikri.",
    "highlights": [
      "Sunrise Taj Mahal Guided Tour",
      "Agra Fort Mughal Citadel Walk",
      "Mehtab Bagh Sunset Across Yamuna",
      "Fatehpur Sikri Imperial Ruins"
    ],
    "suggestedDuration": "2 - 3 Days",
    "idealFor": [
      "World Heritage Seekers",
      "Families",
      "Couples"
    ]
  },
  {
    "id": "dest_shimla",
    "name": "Shimla",
    "state": "Himachal Pradesh",
    "tagline": "Summer Capital of British India, Colonial Ridge & Pine Trails",
    "category": "Hill Station",
    "heroImage": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.81,
    "reviewsCount": 2190,
    "basePrice": 3700,
    "bestTimeToVisit": "March – June & Dec – Feb",
    "weather": {
      "temp": "14°C",
      "condition": "Cool Mountain Air",
      "humidity": "55%"
    },
    "safetyScore": 92,
    "womenSafeScore": 92,
    "description": "Characterized by the historic Mall Road, neo-Gothic Christ Church, Viceregal Lodge, and snow peaks view from the Ridge.",
    "highlights": [
      "Mall Road & Ridge Stroll",
      "Jakhoo Temple Giant Hanuman Statue Hike",
      "Kalka-Shimla UNESCO Toy Train",
      "Kufri Snow Viewpoint"
    ],
    "suggestedDuration": "3 - 4 Days",
    "idealFor": [
      "Colonial Heritage Enthusiasts",
      "Families",
      "Snow Lovers"
    ]
  },
  {
    "id": "dest_chikmagalur",
    "name": "Chikmagalur",
    "state": "Karnataka",
    "tagline": "Coffee Birthplace of India, Mullayanagiri Peak & Waterfalls",
    "category": "Hill Station",
    "heroImage": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    "gallery": [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
    ],
    "rating": 4.85,
    "reviewsCount": 1380,
    "basePrice": 3400,
    "bestTimeToVisit": "September – March",
    "weather": {
      "temp": "19°C",
      "condition": "Cool & Fragrant",
      "humidity": "65%"
    },
    "safetyScore": 95,
    "womenSafeScore": 95,
    "description": "Nestled in the Baba Budan Giri hills where coffee was first cultivated in India. Home to Mullayanagiri (highest peak in Karnataka), Hebbe Falls, and lush homestays.",
    "highlights": [
      "Mullayanagiri Sunrise Trek",
      "Baba Budangiri Shrine & Cave Hike",
      "Hebbe Falls 4x4 Jeep Ride",
      "Coffee Plantation Walk & Tasting"
    ],
    "suggestedDuration": "2 - 3 Days",
    "idealFor": [
      "Trekkers",
      "Coffee Enthusiasts",
      "Weekend Escapists"
    ]
  }
];

export const PACKAGES = [
  {
    "id": "pkg_munnar_01",
    "destinationId": "dest_munnar",
    "title": "Munnar Misty Hills & Tea Trails Escape",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 12999,
    "rating": 4.9,
    "reviewsCount": 380,
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    "theme": "Nature & Wellness",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 12,
    "inclusions": [
      "3 Nights in 4-Star Mountain Resort",
      "Daily Breakfast & High Tea",
      "Eravikulam National Park Safari Pass",
      "Private Chauffeur SUV for Sightseeing"
    ],
    "exclusions": [
      "Airfare/Train to Kochi",
      "Personal Expenses",
      "Lunch & Dinner Drinks"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival & Spice Plantation",
        "description": "Scenic transfer from Kochi, check-in at hill resort, afternoon spice plantation aroma walk.",
        "activity": "Cardamom and vanilla plantation walk."
      },
      {
        "day": 2,
        "title": "Eravikulam & Tea Museum",
        "description": "Early safari to spot the endangered Nilgiri Tahr, followed by Tata Tea Museum visit & tasting.",
        "activity": "National park wildlife safari."
      },
      {
        "day": 3,
        "title": "Kolukkumalai Sunrise 4x4 Jeep",
        "description": "Pre-dawn 4x4 ascent to world's highest tea plantation, Mattupetty dam speedboating.",
        "activity": "High-altitude 4x4 jeep trek."
      },
      {
        "day": 4,
        "title": "Cheeyappara Falls & Departure",
        "description": "Morning valley stroll, shopping fresh tea and spices, transfer to Kochi airport.",
        "activity": "Waterfall photo stop & return."
      }
    ]
  },
  {
    "id": "pkg_goa_01",
    "destinationId": "dest_goa",
    "title": "Goa Sun, Sand & Latin Quarters Heritage",
    "duration": "5 Days / 4 Nights",
    "baseAdultPrice": 15499,
    "rating": 4.88,
    "reviewsCount": 420,
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    "theme": "Beach & Heritage",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "4 Nights in 4-Star Beachside Resort",
      "Daily Buffet Breakfast",
      "Heritage Fontainhas Guided Walk",
      "Sunset Catamaran Sailing"
    ],
    "exclusions": [
      "Flights to Dabolim/Mopa",
      "Water Sports Gear Rental",
      "Shack Dinners"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Welcome to Coastal Goa",
        "description": "Airport pickup, check-in, sunset cocktail welcome at beach shack.",
        "activity": "Sunset relaxation on beach."
      },
      {
        "day": 2,
        "title": "Fontainhas & Old Goa Cathedrals",
        "description": "Portuguese Latin Quarter photo walk, Basilica of Bom Jesus, Se Cathedral.",
        "activity": "Colonial architectural tour."
      },
      {
        "day": 3,
        "title": "Dudhsagar Waterfalls Safari",
        "description": "Jeep expedition through Bhagwan Mahavir Wildlife Sanctuary to milky cascades.",
        "activity": "Jungle river crossing & swim."
      },
      {
        "day": 4,
        "title": "South Goa Beaches & Catamaran",
        "description": "Leisure morning at Palolem Beach, evening catamaran cruise with dolphin watch.",
        "activity": "Sailing & dolphin spotting."
      },
      {
        "day": 5,
        "title": "Flea Market & Farewell",
        "description": "Anjuna souvenir shopping, cashew tasting, transfer to airport.",
        "activity": "Craft market shopping."
      }
    ]
  },
  {
    "id": "pkg_jaipur_01",
    "destinationId": "dest_jaipur",
    "title": "Jaipur Royal Forts & Pink City Palaces",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 11499,
    "rating": 4.93,
    "reviewsCount": 510,
    "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    "theme": "Royal Heritage",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 15,
    "inclusions": [
      "3 Nights in Heritage Haveli",
      "Daily Royal Breakfast",
      "Amber Fort Guided Tour & Jeep Ride",
      "Chokhi Dhani Cultural Village Dinner"
    ],
    "exclusions": [
      "Monument Camera Fees",
      "Personal Shopping",
      "Flights to Jaipur"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Pink City Arrival & Hawa Mahal",
        "description": "Arrival, check-in, sunset rooftop view of Hawa Mahal facade and Johari Bazaar.",
        "activity": "Bazaar heritage walk."
      },
      {
        "day": 2,
        "title": "Amber Fort & Sheesh Mahal",
        "description": "Climb to grand Amber Fort, explore mirror halls, Jal Mahal lake photo stop.",
        "activity": "Fort architectural tour."
      },
      {
        "day": 3,
        "title": "City Palace & Jantar Mantar",
        "description": "Royal museum visit, world's largest stone sundial, Chokhi Dhani evening feast.",
        "activity": "Astronomical observatory tour."
      },
      {
        "day": 4,
        "title": "Nahargarh Sunrise & Return",
        "description": "Early sunrise over Jaipur from Nahargarh ramparts, souvenir shopping, departure.",
        "activity": "Sunrise fort view."
      }
    ]
  },
  {
    "id": "pkg_ladakh_01",
    "destinationId": "dest_ladakh",
    "title": "Ultimate Ladakh Trans-Himalayan Odyssey",
    "duration": "7 Days / 6 Nights",
    "baseAdultPrice": 28999,
    "rating": 4.97,
    "reviewsCount": 360,
    "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    "theme": "High Altitude Adventure",
    "groupDiscountThreshold": 6,
    "groupDiscountPercent": 15,
    "inclusions": [
      "6 Nights in Heated Hotels & Deluxe Tents",
      "All Meals Included",
      "Inner Line Protected Area Permits",
      "Dedicated 4x4 Vehicle with Oxygen Cylinder"
    ],
    "exclusions": [
      "Flight to Leh",
      "Camel Ride Fees at Nubra",
      "Personal Warm Gear"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Leh Arrival & Acclimatization",
        "description": "Rest day to adapt to 11,500 ft elevation. Evening walk to Leh Shanti Stupa.",
        "activity": "Gentle sunset stupa walk."
      },
      {
        "day": 2,
        "title": "Monasteries & Hall of Fame",
        "description": "Thiksey Gompa morning prayer, Shey Palace, Sindhu Ghat memorial.",
        "activity": "Buddhist monastic culture tour."
      },
      {
        "day": 3,
        "title": "Khardung La Pass to Nubra Valley",
        "description": "Drive across 17,982 ft pass to Hunder sand dunes. Double-hump camel safari.",
        "activity": "High-altitude mountain crossing."
      },
      {
        "day": 4,
        "title": "Diskit Gompa & Shyok River Trail",
        "description": "Giant Maitreya Buddha statue, dramatic drive along Shyok river gorge.",
        "activity": "Ancient monastic view."
      },
      {
        "day": 5,
        "title": "Pangong Tso Turquoise Wonder",
        "description": "Cross to shimmering 130 km long Pangong Lake, luxury tent camping under stars.",
        "activity": "Milky way night stargazing."
      },
      {
        "day": 6,
        "title": "Chang La Pass to Leh",
        "description": "Cross 17,590 ft Chang La pass back to Leh town for celebratory dinner.",
        "activity": "Mountain pass drive."
      },
      {
        "day": 7,
        "title": "Himalayan Farewell",
        "description": "Transfer to Leh airport for breathtaking mountain takeoff.",
        "activity": "Airport departure."
      }
    ]
  },
  {
    "id": "pkg_andaman_01",
    "destinationId": "dest_andaman",
    "title": "Andaman Tropical Coral Reefs & Island Hop",
    "duration": "6 Days / 5 Nights",
    "baseAdultPrice": 24999,
    "rating": 4.94,
    "reviewsCount": 290,
    "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    "theme": "Island & Marine",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "5 Nights in Beachfront Island Resorts",
      "Daily Breakfast & Seafood Dinners",
      "Makruzz Catamaran Ferry Transfers",
      "Elephant Beach Snorkeling & Coral Walk"
    ],
    "exclusions": [
      "Scuba Certification Dives",
      "Airfare to Port Blair",
      "Jet Ski Rentals"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Port Blair Arrival & Cellular Jail",
        "description": "Arrival, check-in, historic Cellular Jail memorial with Sound & Light show.",
        "activity": "Freedom movement heritage tour."
      },
      {
        "day": 2,
        "title": "Cruise to Havelock Island",
        "description": "High-speed Makruzz catamaran cruise to Havelock, sunset at Radhanagar Beach.",
        "activity": "Asia's best beach sunset stroll."
      },
      {
        "day": 3,
        "title": "Elephant Beach Coral Reef",
        "description": "Speedboat to Elephant Beach, guided snorkeling over live fringing coral reef.",
        "activity": "Reef snorkeling & sea walk."
      },
      {
        "day": 4,
        "title": "Neil Island Natural Rock Bridge",
        "description": "Morning ferry to Neil Island, explore Howrah Natural Bridge and Laxmanpur sunset.",
        "activity": "Marine biology tidepool walk."
      },
      {
        "day": 5,
        "title": "Return to Port Blair & Chidiya Tapu",
        "description": "Ferry back to Port Blair, sunset birdwatching at Chidiya Tapu point.",
        "activity": "Sunset coastal view."
      },
      {
        "day": 6,
        "title": "Souvenir Shopping & Departure",
        "description": "Sagarika government emporium for shell crafts, airport transfer.",
        "activity": "Return flight transfer."
      }
    ]
  },
  {
    "id": "pkg_varanasi_01",
    "destinationId": "dest_varanasi",
    "title": "Varanasi Mystic Ghats & Sarnath Pilgrimage",
    "duration": "3 Days / 2 Nights",
    "baseAdultPrice": 8999,
    "rating": 4.89,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    "theme": "Spiritual Culture",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "2 Nights in Riverfront Haveli",
      "Daily Satvik Breakfast",
      "Private Sunrise Ganga Rowing Boat",
      "Reserved VIP Seats at Dashashwamedh Aarti"
    ],
    "exclusions": [
      "Temple Donation Offerings",
      "Lunch & Dinner",
      "Train/Flight Tickets"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival & Grand Evening Aarti",
        "description": "Check-in at heritage haveli, walk through narrow galis, grand evening Ganga Aarti.",
        "activity": "Aarti ceremony from boat."
      },
      {
        "day": 2,
        "title": "Subah-e-Banaras & Sarnath Stupa",
        "description": "Dawn boat ride seeing centuries of bathing rituals, afternoon visit to Sarnath where Buddha gave his first sermon.",
        "activity": "Buddhist archaeological walk."
      },
      {
        "day": 3,
        "title": "Kashi Vishwanath & Silk Weaving",
        "description": "Corridor darshan, Banarasi saree handloom master workshop, departure.",
        "activity": "Silk handloom craft tour."
      }
    ]
  },
  {
    "id": "pkg_rishikesh_01",
    "destinationId": "dest_rishikesh",
    "title": "Rishikesh White-Water & Himalayan Wellness",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 10999,
    "rating": 4.91,
    "reviewsCount": 340,
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    "theme": "Adventure & Yoga",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 12,
    "inclusions": [
      "3 Nights in Riverside Resort",
      "All Meals Included",
      "24 km White-Water Rafting Expedition with Cliff Jump",
      "Daily Morning Yoga & Meditation Sessions"
    ],
    "exclusions": [
      "Bungee Jump & Giant Swing Fees",
      "Travel to Rishikesh",
      "Personal Gear"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Welcome to the Holy Ganga",
        "description": "Arrival at riverside eco-resort, evening sound bath, Triveni Ghat Aarti.",
        "activity": "Riverside spiritual evening."
      },
      {
        "day": 2,
        "title": "Marine Drive to Rishikesh 24km Raft",
        "description": "Grade 3+ rapids (Roller Coaster, Golf Course, Club House) with cliff jump & body surfing.",
        "activity": "White-water river expedition."
      },
      {
        "day": 3,
        "title": "Beatles Ashram & Mountain Bungee",
        "description": "Walk through Beatles meditation huts and mural halls, optional bungee jump at Mohan Chatti.",
        "activity": "Historic ashram photography."
      },
      {
        "day": 4,
        "title": "Sunrise Pranayama & Return",
        "description": "Dawn yoga overlooking misty river gorge, organic breakfast, departure.",
        "activity": "Morning yoga session."
      }
    ]
  },
  {
    "id": "pkg_hampi_01",
    "destinationId": "dest_hampi",
    "title": "Hampi UNESCO Boulders & Vijayanagara Heritage",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 9999,
    "rating": 4.92,
    "reviewsCount": 260,
    "image": "https://images.unsplash.com/photo-1600100397608-f010f443818e?auto=format&fit=crop&w=800&q=80",
    "theme": "History & Archeology",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "3 Nights in Heritage Palace Resort",
      "Daily Breakfast",
      "Certified ASI Archaeologist Guide for 2 Days",
      "Tungabhadra Coracle Crossing Experience"
    ],
    "exclusions": [
      "Train/Bus to Hosapete",
      "Bicycle Rental",
      "Personal Snacks"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival & Virupaksha Sunset",
        "description": "Check-in, sunset climb to Hemakuta Hill overlooking 7th-century shrines.",
        "activity": "Panoramic boulder sunset hike."
      },
      {
        "day": 2,
        "title": "Royal Enclosure & Stone Chariot",
        "description": "Stepwell Pushkarani, Lotus Mahal, Elephant Stables, and iconic Vittala Temple.",
        "activity": "Ancient Vijayanagara kingdom tour."
      },
      {
        "day": 3,
        "title": "Anegundi & Sanapur Lake Coracle",
        "description": "Cross river on round wicker coracle, cliff jumping at Sanapur lake, Anjanadri hill hike.",
        "activity": "Coracle boat exploration."
      },
      {
        "day": 4,
        "title": "Matanga Hill Sunrise & Departure",
        "description": "Unrivaled 360-degree sunrise over the boulder landscape, checkout.",
        "activity": "Sunrise photography hike."
      }
    ]
  },
  {
    "id": "pkg_udaipur_01",
    "destinationId": "dest_udaipur",
    "title": "Udaipur Royal Lakes & Mewar Architecture",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 13499,
    "rating": 4.91,
    "reviewsCount": 380,
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    "theme": "Royal Romance",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 12,
    "inclusions": [
      "3 Nights in Lakefront Heritage Hotel",
      "Daily Breakfast & Candlelight Lake Dinner",
      "Private Lake Pichola Sunset Boat Cruise",
      "City Palace VIP Tour Pass"
    ],
    "exclusions": [
      "Airfare to Udaipur",
      "Personal Souvenirs",
      "Alcoholic Beverages"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Romantic Lake Arrival",
        "description": "Arrival in Udaipur, hotel check-in, evening stroll around Gangaur Ghat.",
        "activity": "Ghat sunset stroll."
      },
      {
        "day": 2,
        "title": "City Palace & Crystal Gallery",
        "description": "Mewar kingdom grandeur, vintage car collection, sunset cruise past Jag Mandir.",
        "activity": "Royal palace architectural tour."
      },
      {
        "day": 3,
        "title": "Monsoon Palace & Bagore Ki Haveli",
        "description": "Hilltop Sajjangarh fort vista, evening Rajasthani Dharohar puppet & dance show.",
        "activity": "Folk dance evening."
      },
      {
        "day": 4,
        "title": "Saheliyon-ki-Bari & Departure",
        "description": "Fountain gardens of the royal maidens, souvenir marble shopping, departure.",
        "activity": "Garden leisure walk."
      }
    ]
  },
  {
    "id": "pkg_manali_01",
    "destinationId": "dest_manali",
    "title": "Manali Alpine Glaciers & Solang Valley Quest",
    "duration": "5 Days / 4 Nights",
    "baseAdultPrice": 12499,
    "rating": 4.85,
    "reviewsCount": 410,
    "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    "theme": "Alpine Adventure",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "4 Nights in Pine Forest Mountain Chalet",
      "Daily Breakfast & Dinner",
      "Atal Tunnel & Sissu Valley Day Trip",
      "Solang Valley Adventure Passes"
    ],
    "exclusions": [
      "Paragliding Pilot Fees",
      "Heavy Winter Overcoat Rental",
      "Transport to Manali"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Kullu Valley",
        "description": "Drive into Manali along Beas river, check-in, evening cedar forest walk.",
        "activity": "Hadimba temple walk."
      },
      {
        "day": 2,
        "title": "Solang Valley Sports",
        "description": "Zorbing, ATV quad biking, tandem paragliding overlooking snow ridges.",
        "activity": "Adventure sports."
      },
      {
        "day": 3,
        "title": "Atal Tunnel & Sissu Waterfalls",
        "description": "Drive through engineering marvel into Lahaul valley, frozen waterfall trek.",
        "activity": "Trans-Himalayan tunnel drive."
      },
      {
        "day": 4,
        "title": "Jogini Falls & Old Manali Cafes",
        "description": "Trek to sacred Jogini falls through apple orchards, live music cafe evening.",
        "activity": "Alpine waterfall hike."
      },
      {
        "day": 5,
        "title": "Mall Road Shopping & Farewell",
        "description": "Tibetan market woollens and apple cider honey, bus/cab boarding.",
        "activity": "Souvenir shopping."
      }
    ]
  },
  {
    "id": "pkg_alleppey_01",
    "destinationId": "dest_alleppey",
    "title": "Alleppey Luxury Houseboat & Backwaters Cruise",
    "duration": "3 Days / 2 Nights",
    "baseAdultPrice": 11999,
    "rating": 4.93,
    "reviewsCount": 350,
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    "theme": "Serene Backwaters",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "1 Night in Private Luxury Houseboat with Chef",
      "1 Night in Luxury Backwater Resort",
      "All Traditional Kerala Meals Prepared Fresh",
      "Country Shikara Village Canal Tour"
    ],
    "exclusions": [
      "Transfers to Alleppey",
      "Personal Ayurvedic Massages",
      "Beverages"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Boarding the Kettuvallam",
        "description": "Board your air-conditioned thatched houseboat at 12 PM, glide through Punnamada Lake.",
        "activity": "Overnight houseboat cruise."
      },
      {
        "day": 2,
        "title": "Narrow Canals & Resort Check-in",
        "description": "Morning canoe trip into village backwaters, disembark and transfer to lakeside resort.",
        "activity": "Village canoe paddle."
      },
      {
        "day": 3,
        "title": "Marari Beach & Farewell",
        "description": "Morning walk on secluded Marari beach, coconut groves, airport transfer to Kochi.",
        "activity": "Beach relaxation."
      }
    ]
  },
  {
    "id": "pkg_coorg_01",
    "destinationId": "dest_coorg",
    "title": "Coorg Coffee Estate & Abbey Falls Sojourn",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 10499,
    "rating": 4.87,
    "reviewsCount": 290,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "theme": "Plantation Escape",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "3 Nights in Heritage Coffee Plantation",
      "Daily Estate Breakfast & Pandi Curry Dinner",
      "Guided Coffee Cupping & Plantation Trek",
      "Private Cab for Madikeri Sightseeing"
    ],
    "exclusions": [
      "Travel to Coorg",
      "Personal Laundry",
      "Extra Coffee Purchases"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in the Mist of Kodagu",
        "description": "Check-in at coffee estate homestay, evening estate campfire with Kodava delicacies.",
        "activity": "Plantation welcome."
      },
      {
        "day": 2,
        "title": "Abbey Falls & Raja's Seat",
        "description": "Scenic drive to roaring Abbey Falls, Madikeri Fort, sunset valley vista at Raja's Seat.",
        "activity": "Waterfall & viewpoint tour."
      },
      {
        "day": 3,
        "title": "Bylakuppe Tibetan Monasteries",
        "description": "Visit the Namdroling Golden Temple, copper statues, Tibetan monk prayer hall.",
        "activity": "Tibetan culture immersion."
      },
      {
        "day": 4,
        "title": "Coffee Bean Picking & Return",
        "description": "Morning bean roasting and brewing masterclass, fresh spice shopping, departure.",
        "activity": "Coffee brewing workshop."
      }
    ]
  },
  {
    "id": "pkg_ooty_01",
    "destinationId": "dest_ooty",
    "title": "Ooty Nilgiri Heritage Toy Train Tour",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 9499,
    "rating": 4.82,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    "theme": "Colonial Hills",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "3 Nights in Colonial Hill Cottage",
      "Daily Breakfast",
      "UNESCO Toy Train Confirmed Tickets",
      "Doddabetta Peak & Pykara Boat Tour"
    ],
    "exclusions": [
      "Travel to Coimbatore",
      "Boating Fees",
      "Personal Shopping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Ascent into the Blue Mountains",
        "description": "Drive up the 36 hairpin bends of Nilgiris, check-in, evening stroll in Botanical Gardens.",
        "activity": "Botanical gardens walk."
      },
      {
        "day": 2,
        "title": "UNESCO Steam Toy Train",
        "description": "Ride the century-old Nilgiri Mountain Railway from Ooty to Coonoor through tunnels and bridges.",
        "activity": "Heritage toy train ride."
      },
      {
        "day": 3,
        "title": "Pykara Lake & Shooting Point",
        "description": "Speedboat ride on Pykara Lake, roaring waterfalls, pine forest walks.",
        "activity": "Lakeside speedboating."
      },
      {
        "day": 4,
        "title": "Homemade Chocolate Trail & Departure",
        "description": "Visit artisan chocolate factory, Nilgiri tea tasting, return to Coimbatore.",
        "activity": "Chocolate & tea tasting."
      }
    ]
  },
  {
    "id": "pkg_jaisalmer_01",
    "destinationId": "dest_jaisalmer",
    "title": "Jaisalmer Living Fort & Thar Desert Safari",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 11999,
    "rating": 4.9,
    "reviewsCount": 280,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "theme": "Desert Adventure",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 12,
    "inclusions": [
      "2 Nights in Fort Haveli + 1 Night in Luxury Desert Camp",
      "All Meals in Desert Camp",
      "Sunset Camel Safari & 4x4 Dune Bashing",
      "Kalbelia Folk Dance Performance"
    ],
    "exclusions": [
      "Travel to Jaisalmer",
      "Desert Quad Biking",
      "Personal Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Golden Citadel Welcome",
        "description": "Check-in inside the living sandstone fort, explore Patwon Ki Haveli filigree stone carvings.",
        "activity": "Living fort heritage tour."
      },
      {
        "day": 2,
        "title": "Gadisar Lake & Desert Dunes",
        "description": "Sunrise at Gadisar Lake, drive into Thar Desert, camel safari across shifting Sam Sand Dunes.",
        "activity": "Camel ride into dunes."
      },
      {
        "day": 3,
        "title": "Stargazing & Campfire Gala",
        "description": "Breathtaking desert sunset, Rajasthani folk music, buffet dinner under millions of stars.",
        "activity": "Desert campfire & folk music."
      },
      {
        "day": 4,
        "title": "Kuldhara Ghost Village & Return",
        "description": "Explore the abandoned 13th-century cursed village of Kuldhara, airport/railway transfer.",
        "activity": "Ghost village mystery tour."
      }
    ]
  },
  {
    "id": "pkg_meghalaya_01",
    "destinationId": "dest_meghalaya",
    "title": "Meghalaya Living Root Bridges & Dawki River",
    "duration": "6 Days / 5 Nights",
    "baseAdultPrice": 19499,
    "rating": 4.95,
    "reviewsCount": 240,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "theme": "Eco Trekking",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 12,
    "inclusions": [
      "5 Nights in Boutique Resorts & Village Homestays",
      "Daily Breakfast & Local Khasi Dinners",
      "Double Decker Living Root Bridge Guide",
      "Crystal Clear Dawki River Boating"
    ],
    "exclusions": [
      "Airfare to Guwahati",
      "Caving Equipment",
      "Personal Porter"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Guwahati to Shillong Scotland of the East",
        "description": "Pickup, drive via Umiam Lake, check-in, evening Police Bazar music cafes.",
        "activity": "Lake scenic drive."
      },
      {
        "day": 2,
        "title": "Cherrapunji & Nohkalikai Falls",
        "description": "Drive through cloud canyons, stand above 1,115 ft Nohkalikai Falls, Mawsmai cave exploration.",
        "activity": "Caving & waterfall view."
      },
      {
        "day": 3,
        "title": "Nongriat 3,500 Steps Root Bridge",
        "description": "Descend into ancient rainforest, walk across bio-engineered living rubber tree bridges.",
        "activity": "Living root bridge trek."
      },
      {
        "day": 4,
        "title": "Dawki Glass-Clear River & Indo-Bangla Border",
        "description": "Boat on Umngot River where water is so transparent boats appear to float in air.",
        "activity": "Glass water boating."
      },
      {
        "day": 5,
        "title": "Mawlynnong Cleanest Village in Asia",
        "description": "Walk through floral paths of cleanest village, bamboo skywalk into Bangladesh plains.",
        "activity": "Clean village eco walk."
      },
      {
        "day": 6,
        "title": "Return via Guwahati",
        "description": "Scenic drive back to Guwahati airport for onward travel.",
        "activity": "Departure transfer."
      }
    ]
  },
  {
    "id": "pkg_darjeeling_01",
    "destinationId": "dest_darjeeling",
    "title": "Darjeeling Kanchenjunga Sunrise & Tea Tasting",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 11499,
    "rating": 4.86,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    "theme": "Tea & Mountains",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "3 Nights in Mountain View Heritage Resort",
      "Daily Breakfast",
      "Tiger Hill Dawn Excursion",
      "First Flush Organic Tea Tasting Tour"
    ],
    "exclusions": [
      "Toy Train Ride Ticket",
      "Bagdogra Airport Cab",
      "Personal Drinks"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Queen of the Hills Arrival",
        "description": "Drive through pine groves from Bagdogra, check-in, Mall Road stroll.",
        "activity": "Mall Road sunset walk."
      },
      {
        "day": 2,
        "title": "Tiger Hill 4 AM Sunrise",
        "description": "Witness golden sunlight hit Kanchenjunga summit, visit Batasia Loop and Ghoom Monastery.",
        "activity": "Dawn mountain viewpoint."
      },
      {
        "day": 3,
        "title": "Happy Valley Tea Estate",
        "description": "Guided walk through 150-year-old tea bushes, plucking lesson, sommelier tea tasting.",
        "activity": "Tea factory sommelier session."
      },
      {
        "day": 4,
        "title": "Himalayan Mountaineering Institute & Departure",
        "description": "Visit Tenzing Norgay memorial, Tibetan Refugee Self-Help Centre, airport transfer.",
        "activity": "Mountaineering museum visit."
      }
    ]
  },
  {
    "id": "pkg_pondicherry_01",
    "destinationId": "dest_pondicherry",
    "title": "Pondicherry French Quarters & Auroville Retreat",
    "duration": "3 Days / 2 Nights",
    "baseAdultPrice": 8499,
    "rating": 4.84,
    "reviewsCount": 320,
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    "theme": "Colonial Seaside",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "2 Nights in French Colonial Heritage Mansion",
      "Daily French Continental Breakfast",
      "Auroville Matrimandir Inner Chamber Pass",
      "Vintage Bicycle Rental for 48 Hours"
    ],
    "exclusions": [
      "Travel to Chennai/Pondicherry",
      "Surfing Lessons",
      "Lunch & Dinner"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Boulevards of White Town",
        "description": "Check-in at pastel French villa, cycle along Promenade beach, French bakery treats.",
        "activity": "Vintage bicycle town tour."
      },
      {
        "day": 2,
        "title": "Auroville Universal Township",
        "description": "Meditate at the golden sphere Matrimandir, explore solar kitchens and organic farms.",
        "activity": "Matrimandir meditation."
      },
      {
        "day": 3,
        "title": "Paradise Beach & Ashram Farewell",
        "description": "Ferry ride to Paradise Beach sand spit, Sri Aurobindo Ashram visit, departure.",
        "activity": "Beach ferry & ashram visit."
      }
    ]
  },
  {
    "id": "pkg_amritsar_01",
    "destinationId": "dest_amritsar",
    "title": "Amritsar Golden Temple & Wagah Border Spirit",
    "duration": "3 Days / 2 Nights",
    "baseAdultPrice": 7999,
    "rating": 4.96,
    "reviewsCount": 460,
    "image": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
    "theme": "Spiritual Heritage",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "2 Nights in 4-Star Hotel near Temple",
      "Daily Punjabi Breakfast",
      "VIP Seating Passes at Wagah Border Ceremony",
      "Heritage Food Trail with Amritsari Kulcha"
    ],
    "exclusions": [
      "Flights to Amritsar",
      "Personal Souvenirs",
      "Alcohol"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Harmandir Sahib by Moonlight",
        "description": "Arrival, evening visit to illuminated Golden Temple reflecting in the Amrit Sarovar.",
        "activity": "Golden temple night darshan."
      },
      {
        "day": 2,
        "title": "Langar Seva & Wagah Beating Retreat",
        "description": "Volunteer inside the world's largest community kitchen, afternoon patriotic parade at Indo-Pak border.",
        "activity": "Wagah border ceremony."
      },
      {
        "day": 3,
        "title": "Jallianwala Bagh & Kulcha Trail",
        "description": "Pay homage at historic memorial, taste iconic stuffed butter kulchas at Maqbool Road, departure.",
        "activity": "Food & historic walk."
      }
    ]
  },
  {
    "id": "pkg_kaziranga_01",
    "destinationId": "dest_kaziranga",
    "title": "Kaziranga Wildlife Safari & Rhino Sanctuary",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 14999,
    "rating": 4.93,
    "reviewsCount": 220,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "theme": "Wildlife Exploration",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 12,
    "inclusions": [
      "3 Nights in Luxury Jungle Eco Lodge",
      "All Meals Included",
      "2 Open 4x4 Jeep Safaris + 1 Dawn Elephant Safari",
      "Park Entry Permits & Wildlife Guide"
    ],
    "exclusions": [
      "Airfare to Guwahati/Jorhat",
      "Camera Lens Rental",
      "Personal Tips"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Brahmaputra Floodplains Arrival",
        "description": "Scenic transfer from Jorhat/Guwahati, lodge check-in, evening Assamese cultural Bihu dance.",
        "activity": "Assamese cultural evening."
      },
      {
        "day": 2,
        "title": "Dawn Elephant Safari & Central Range",
        "description": "Early morning close-up rhino sightings on elephant back through tall elephant grass, afternoon jeep safari.",
        "activity": "Wild rhino close tracking."
      },
      {
        "day": 3,
        "title": "Western Range & Orchid Biodiversity",
        "description": "Jeep safari to Bagori range for wild water buffalo and wetland migratory birds, visit Orchid park.",
        "activity": "Jeep safari & orchid walk."
      },
      {
        "day": 4,
        "title": "Assam Tea Garden Walk & Departure",
        "description": "Morning stroll in Hathikuli organic tea estate, return drive to Guwahati airport.",
        "activity": "Organic tea estate stroll."
      }
    ]
  },
  {
    "id": "pkg_gokarna_01",
    "destinationId": "dest_gokarna",
    "title": "Gokarna Cliff Beaches & Om Beach Trek",
    "duration": "3 Days / 2 Nights",
    "baseAdultPrice": 7499,
    "rating": 4.85,
    "reviewsCount": 270,
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "theme": "Beach Trekking",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "2 Nights in Oceanfront Cottages",
      "Daily Coastal Breakfast",
      "5-Beach Guided Cliff Trail Hike",
      "Paddleboarding Gear & Instructor"
    ],
    "exclusions": [
      "Travel to Gokarna",
      "Beach Shack Dinners",
      "Personal Expenses"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Kudle Beach Sunset Welcome",
        "description": "Check-in at cliffside cottage, evening barefoot stroll on Kudle sands, candlelit dinner.",
        "activity": "Sunset beach walk."
      },
      {
        "day": 2,
        "title": "5-Beach Cliff Trek & Om Beach",
        "description": "Hike along rocky cliffs connecting Gokarna Main, Kudle, Om, Half Moon and Paradise beaches.",
        "activity": "Full cliff coastal trek."
      },
      {
        "day": 3,
        "title": "Mahabaleshwar Temple & Return",
        "description": "Morning visit to ancient 4th-century temple, fresh tender coconut drinks, departure.",
        "activity": "Historic temple visit."
      }
    ]
  },
  {
    "id": "pkg_kodaikanal_01",
    "destinationId": "dest_kodaikanal",
    "title": "Kodaikanal Star Lake & Pine Forest Holiday",
    "duration": "4 Days / 3 Nights",
    "baseAdultPrice": 9899,
    "rating": 4.83,
    "reviewsCount": 260,
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    "theme": "Misty Hills",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "3 Nights in Misty Valley Cottage",
      "Daily Breakfast & Dinner",
      "Star Lake Private Rowing Boat & Cycling",
      "Pillar Rocks & Coaker's Walk Sightseeing"
    ],
    "exclusions": [
      "Travel to Madurai",
      "Horseback Riding Fees",
      "Personal Shopping"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Palani Hills Ascent",
        "description": "Drive up the Western Ghats from Madurai, check-in, lakeside cycling.",
        "activity": "Lake cycling."
      },
      {
        "day": 2,
        "title": "Coaker's Walk & Pillar Rocks",
        "description": "Panoramic cliff views overlooking plains, walk through Pine Forest, Guna Caves.",
        "activity": "Pine forest walk."
      },
      {
        "day": 3,
        "title": "Mannavanur Sheep Farm & Lake",
        "description": "Offbeat day trip to rolling emerald meadows of Mannavanur, coracle ride.",
        "activity": "Meadows & lake outing."
      },
      {
        "day": 4,
        "title": "Bryant Botanical Park & Departure",
        "description": "Morning walk among hybrid dahlias, artisan fudge chocolate shopping, departure.",
        "activity": "Botanical garden visit."
      }
    ]
  },
  {
    "id": "pkg_chikmagalur_01",
    "destinationId": "dest_chikmagalur",
    "title": "Chikmagalur Mullayanagiri Peak Coffee Trail",
    "duration": "3 Days / 2 Nights",
    "baseAdultPrice": 8799,
    "rating": 4.87,
    "reviewsCount": 240,
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    "theme": "Trekking & Coffee",
    "groupDiscountThreshold": 4,
    "groupDiscountPercent": 10,
    "inclusions": [
      "2 Nights in Coffee Plantation Homestay",
      "All Malnad Style Homemade Meals",
      "Mullayanagiri Peak Guided Sunrise Trek",
      "4x4 Jeep Ride to Hebbe Waterfalls"
    ],
    "exclusions": [
      "Travel to Chikmagalur",
      "Personal Beverages",
      "Trek Gear Rental"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Plantation Warmth & Coffee Aroma",
        "description": "Check-in at estate bungalow, walk amidst arabica plants, Malnad style dinner.",
        "activity": "Coffee estate exploration."
      },
      {
        "day": 2,
        "title": "Mullayanagiri Summit & Hebbe Falls",
        "description": "Early hike to the highest peak in Karnataka (1,930m), followed by bumpy jeep ride to Hebbe falls.",
        "activity": "Mountain summit trek."
      },
      {
        "day": 3,
        "title": "Baba Budangiri & Return",
        "description": "Visit the historic shrine in Baba Budan hills where first coffee seeds sprouted, departure.",
        "activity": "Heritage hill visit."
      }
    ]
  }
];

export const HOTELS = [
  {
    "id": "hotel_munnar_01",
    "destinationId": "dest_munnar",
    "name": "Blanket Luxury Villa & Spa",
    "type": "Luxury Resort",
    "stars": 5,
    "rating": 4.92,
    "reviewsCount": 680,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 9500,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Valley View Balcony",
      "Heated Infinity Pool",
      "Ayurvedic Spa",
      "Complimentary High Tea",
      "Kids Activity Club",
      "Multi-Cuisine Restaurant"
    ],
    "location": "Attukad Waterfalls Road, Pallivasal, Munnar",
    "verifiedPartner": true
  },
  {
    "id": "hotel_munnar_02",
    "destinationId": "dest_munnar",
    "name": "Windermere Estate Heritage Retreat",
    "type": "Heritage Plantation Estate",
    "stars": 4,
    "rating": 4.88,
    "reviewsCount": 420,
    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 7800,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Cardamom Plantation Walks",
      "Barn Dining Hall",
      "Library & Fireplace",
      "Mountain View Desks",
      "Free High-Speed Wi-Fi"
    ],
    "location": "Bison Valley Road, Pothamedu, Munnar",
    "verifiedPartner": true
  },
  {
    "id": "hotel_munnar_03",
    "destinationId": "dest_munnar",
    "name": "Fragrant Nature Munnar",
    "type": "Boutique Resort",
    "stars": 5,
    "rating": 4.85,
    "reviewsCount": 390,
    "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 8200,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Fireplace in Every Room",
      "State-of-Art Spa",
      "Terrace Grill",
      "Panoramic Valley Terrace",
      "Fitness Centre"
    ],
    "location": "Pottenkad, Bisonvalley Road, Munnar",
    "verifiedPartner": true
  },
  {
    "id": "hotel_munnar_04",
    "destinationId": "dest_munnar",
    "name": "Amber Dale Luxury Resort",
    "type": "Luxury Resort",
    "stars": 4,
    "rating": 4.81,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 6400,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Jacuzzi Suites",
      "Tea Garden View",
      "Children Play Area",
      "Games Room",
      "Buffet Breakfast Included"
    ],
    "location": "KSEB Tunnel Road, Pallivasal, Munnar",
    "verifiedPartner": true
  },
  {
    "id": "hotel_munnar_05",
    "destinationId": "dest_munnar",
    "name": "The Leaf Munnar Resort",
    "type": "Nature Resort",
    "stars": 4,
    "rating": 4.83,
    "reviewsCount": 510,
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 5800,
    "maxOccupancyPerRoom": 4,
    "childFriendly": true,
    "amenities": [
      "Infinity Pool",
      "Private Villas",
      "Herb Garden Tours",
      "Multi-Cuisine Dining",
      "Outdoor Basketball"
    ],
    "location": "Anachal, Chithirapuram PO, Munnar",
    "verifiedPartner": true
  },
  {
    "id": "hotel_munnar_06",
    "destinationId": "dest_munnar",
    "name": "Mountain Club Resort Chinnakanal",
    "type": "Hilltop Cottage Resort",
    "stars": 4,
    "rating": 4.79,
    "reviewsCount": 460,
    "image": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 5500,
    "maxOccupancyPerRoom": 4,
    "childFriendly": true,
    "amenities": [
      "British Stone Cottages",
      "Campfire & Barbecue",
      "Infinity Pool",
      "Ayurvedic Treatments",
      "Ample Parking"
    ],
    "location": "Chinnakanal, Near Anayirangal Dam, Munnar",
    "verifiedPartner": false
  },
  {
    "id": "hotel_munnar_07",
    "destinationId": "dest_munnar",
    "name": "Tea County KTDC Munnar",
    "type": "Heritage Hill Hotel",
    "stars": 4,
    "rating": 4.75,
    "reviewsCount": 380,
    "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 4600,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Central Munnar Town Access",
      "Traditional Kerala Cuisine",
      "Beer & Wine Parlour",
      "Conference Room"
    ],
    "location": "KTDC Hill Resort, IK Road, Munnar Town",
    "verifiedPartner": true
  },
  {
    "id": "hotel_munnar_08",
    "destinationId": "dest_munnar",
    "name": "Blackberry Hills Retreat & Spa",
    "type": "Eco Boutique Resort",
    "stars": 4,
    "rating": 4.87,
    "reviewsCount": 290,
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 6900,
    "maxOccupancyPerRoom": 2,
    "childFriendly": false,
    "amenities": [
      "Valley View Cottages",
      "Organic Farm-to-Table Dinners",
      "Mountain Mountain Biking",
      "Campfire Evenings",
      "Yoga Pavilion"
    ],
    "location": "Mattupetty Road, Pothamedu, Munnar",
    "verifiedPartner": true
  },
  {
    "id": "hotel_munnar_09",
    "destinationId": "dest_munnar",
    "name": "Devonshire Greens Leisure Hotel",
    "type": "Leisure Resort",
    "stars": 4,
    "rating": 4.74,
    "reviewsCount": 240,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 4900,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Forest View Balconies",
      "Coffee Shop",
      "Indoor Games",
      "Sightseeing Tour Desk",
      "Fitness Studio"
    ],
    "location": "Attukad Waterfalls Road, Pallivasal, Munnar",
    "verifiedPartner": false
  },
  {
    "id": "hotel_munnar_10",
    "destinationId": "dest_munnar",
    "name": "Olive Brook Eco Heritage Cottage",
    "type": "Homestay & Eco Cottage",
    "stars": 3,
    "rating": 4.82,
    "reviewsCount": 210,
    "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 3200,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Cardamom Garden Trail",
      "Home Cooked Kerala Meals",
      "Bird Watching Walks",
      "Personalized Host Service"
    ],
    "location": "Pothamedu, Munnar",
    "verifiedPartner": true
  },
  {
    "id": "hotel_goa_01",
    "destinationId": "dest_goa",
    "name": "Taj Fort Aguada Resort & Spa",
    "type": "Luxury Beach Resort",
    "stars": 5,
    "rating": 4.93,
    "reviewsCount": 1240,
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 16500,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Private Clifftop Beach Access",
      "Jiva Spa",
      "Sea-Facing Infinity Pool",
      "Tennis Courts",
      "Multiple Fine Dining Outlets"
    ],
    "location": "Sinquerim, Candolim, North Goa",
    "verifiedPartner": true
  },
  {
    "id": "hotel_goa_02",
    "destinationId": "dest_goa",
    "name": "Alila Diwa South Goa",
    "type": "Luxury Eco Resort",
    "stars": 5,
    "rating": 4.91,
    "reviewsCount": 940,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 13200,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Paddy Field Facing Infinity Pool",
      "Spa Alila",
      "Complimentary Beach Shuttle to Gonsua",
      "Mini Cinema",
      "Kids Club"
    ],
    "location": "48/10 Adao Waddo, Majorda, South Goa",
    "verifiedPartner": true
  },
  {
    "id": "hotel_goa_03",
    "destinationId": "dest_goa",
    "name": "W Goa Vagator Beach",
    "type": "Lifestyle Luxury Resort",
    "stars": 5,
    "rating": 4.88,
    "reviewsCount": 880,
    "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 18500,
    "maxOccupancyPerRoom": 2,
    "childFriendly": false,
    "amenities": [
      "Rock Pool Bar & DJ Nights",
      "AWAY Spa",
      "FIT Gym",
      "Direct Vagator Beach Steps",
      "Sunset Deck"
    ],
    "location": "Vagator Beach, Bardez, North Goa",
    "verifiedPartner": true
  },
  {
    "id": "hotel_goa_04",
    "destinationId": "dest_goa",
    "name": "Heritage Village Resort & Spa Arossim",
    "type": "Boutique Heritage Resort",
    "stars": 4,
    "rating": 4.82,
    "reviewsCount": 650,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 7400,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Portuguese Architectural Villa",
      "Ayurvedic Spa",
      "Swimming Pool",
      "Live Band Evenings",
      "All-Inclusive Options"
    ],
    "location": "Arossim Beach Road, Cansaulim, South Goa",
    "verifiedPartner": true
  },
  {
    "id": "hotel_goa_05",
    "destinationId": "dest_goa",
    "name": "The Leela Goa Cavelossim",
    "type": "Palatial Beach Resort",
    "stars": 5,
    "rating": 4.95,
    "reviewsCount": 1100,
    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 19800,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "12-Hole Golf Course",
      "Private Mobor Beach",
      "Lagoon Waterways",
      "River Cruise Jetty",
      "Fine Dining Italian & Seafood"
    ],
    "location": "Mobor Beach, Cavelossim, South Goa",
    "verifiedPartner": true
  },
  {
    "id": "hotel_goa_06",
    "destinationId": "dest_goa",
    "name": "Fairfield by Marriott Calangute",
    "type": "Modern Leisure Hotel",
    "stars": 4,
    "rating": 4.76,
    "reviewsCount": 720,
    "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 5600,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Outdoor Pool",
      "Fitness Center",
      "Kava Restaurant",
      "Close to Calangute Market",
      "High-Speed Wi-Fi"
    ],
    "location": "Calangute Beach Road, Naikawaddo, Goa",
    "verifiedPartner": false
  },
  {
    "id": "hotel_goa_07",
    "destinationId": "dest_goa",
    "name": "Caravela Beach Resort Varca",
    "type": "Beachfront Resort",
    "stars": 5,
    "rating": 4.86,
    "reviewsCount": 590,
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 10400,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Direct Varca White Sand Beach",
      "83-Foot Atrium Lobby",
      "Swim-Up Pool Bar",
      "Ayurvedic Treatments"
    ],
    "location": "Varca Beach, Salcete, South Goa",
    "verifiedPartner": true
  },
  {
    "id": "hotel_goa_08",
    "destinationId": "dest_goa",
    "name": "Santana Beach Resort Candolim",
    "type": "Beachfront Garden Resort",
    "stars": 3,
    "rating": 4.73,
    "reviewsCount": 480,
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 3900,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Two Swimming Pools",
      "Olegario's Shack & Bar",
      "Subtropical Gardens",
      "Candolim Beach Access"
    ],
    "location": "Shop No 149, Candolim Beach Road, North Goa",
    "verifiedPartner": false
  },
  {
    "id": "hotel_goa_09",
    "destinationId": "dest_goa",
    "name": "Ahilya by the Sea Nerul",
    "type": "Boutique Heritage Villa",
    "stars": 5,
    "rating": 4.96,
    "reviewsCount": 220,
    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 24000,
    "maxOccupancyPerRoom": 2,
    "childFriendly": false,
    "amenities": [
      "Dolphin Sightings from Seawall",
      "Two Lap Pools",
      "Gourmet French-Goan Dinners",
      "Antique Art Collection"
    ],
    "location": "Coco Beach, Nerul, Bardez, Goa",
    "verifiedPartner": true
  },
  {
    "id": "hotel_goa_10",
    "destinationId": "dest_goa",
    "name": "Casa Baga Boutique Hotel",
    "type": "Boutique Hotel",
    "stars": 3,
    "rating": 4.7,
    "reviewsCount": 350,
    "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 4100,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Poolside Bar",
      "Lush Courtyard",
      "Near Tito's Lane",
      "Balcony Rooms"
    ],
    "location": "Baga Beach Road, Baga, North Goa",
    "verifiedPartner": false
  },
  {
    "id": "hotel_jaipur_01",
    "destinationId": "dest_jaipur",
    "name": "Rambagh Palace Heritage Grand",
    "type": "Royal Heritage Palace",
    "stars": 5,
    "rating": 4.97,
    "reviewsCount": 1450,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 28500,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Former Residence of the Maharaja",
      "Peacock Gardens",
      "Jiva Grande Spa",
      "Polo Bar & Vintage Car Chauffeur",
      "Suvarna Mahal Fine Dining"
    ],
    "location": "Bhawani Singh Road, C Scheme, Jaipur",
    "verifiedPartner": true
  },
  {
    "id": "hotel_jaipur_02",
    "destinationId": "dest_jaipur",
    "name": "Jai Mahal Palace",
    "type": "Indo-Saracenic Palace Resort",
    "stars": 5,
    "rating": 4.92,
    "reviewsCount": 890,
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 16800,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "18 Acres of Mughal Gardens",
      "Outdoor Pool",
      "Folk Dance Performances",
      "Cinnamon Pan-Indian Dining"
    ],
    "location": "Jacob Road, Civil Lines, Jaipur",
    "verifiedPartner": true
  },
  {
    "id": "hotel_jaipur_03",
    "destinationId": "dest_jaipur",
    "name": "Samode Haveli Old City",
    "type": "Historic Urban Haveli",
    "stars": 5,
    "rating": 4.9,
    "reviewsCount": 640,
    "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 12500,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Moorish Style Swimming Pool",
      "Hand-Painted Fresco Dining Room",
      "Courtyard Puppetry",
      "Ayurvedic Wellness"
    ],
    "location": "Gangapole, Old City, Jaipur",
    "verifiedPartner": true
  },
  {
    "id": "hotel_jaipur_04",
    "destinationId": "dest_jaipur",
    "name": "ITC Rajputana Luxury Collection",
    "type": "Luxury Hotel",
    "stars": 5,
    "rating": 4.86,
    "reviewsCount": 910,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 9800,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Peshawri Royal Dining",
      "Kaya Kalp Spa",
      "Central Pool Courtyard",
      "Near Jaipur Junction"
    ],
    "location": "Palace Road, Gopalbari, Jaipur",
    "verifiedPartner": true
  },
  {
    "id": "hotel_jaipur_05",
    "destinationId": "dest_jaipur",
    "name": "Alsisar Haveli Heritage Hotel",
    "type": "Heritage Haveli",
    "stars": 4,
    "rating": 4.82,
    "reviewsCount": 520,
    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 6200,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Carved Sandstone Archways",
      "Swimming Pool",
      "Rooftop Restaurant",
      "Traditional Rajasthani Thali"
    ],
    "location": "Sansar Chandra Road, Sindhi Camp, Jaipur",
    "verifiedPartner": true
  },
  {
    "id": "hotel_jaipur_06",
    "destinationId": "dest_jaipur",
    "name": "Shahpura Haveli Heritage",
    "type": "Eco Heritage Retreat",
    "stars": 4,
    "rating": 4.79,
    "reviewsCount": 380,
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 5400,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Restored Frescoes",
      "Courtyard Dining",
      "Village Walking Tours",
      "Solar Powered Sustainable Hotel"
    ],
    "location": "Near Shahpura, Jaipur District",
    "verifiedPartner": false
  },
  {
    "id": "hotel_jaipur_07",
    "destinationId": "dest_jaipur",
    "name": "Umaid Bhawan Heritage Style Hotel",
    "type": "Heritage Style Hotel",
    "stars": 3,
    "rating": 4.8,
    "reviewsCount": 620,
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 3800,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Rooftop Restaurant with Live Music",
      "Carved Balconies",
      "Swimming Pool",
      "Bani Park Location"
    ],
    "location": "D1-2A, Behari Marg, Bani Park, Jaipur",
    "verifiedPartner": true
  },
  {
    "id": "hotel_jaipur_08",
    "destinationId": "dest_jaipur",
    "name": "Khandela Haveli Boutique Hotel",
    "type": "Boutique Heritage",
    "stars": 3,
    "rating": 4.74,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 3400,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Rooftop Plunge Pool",
      "Terrace Dining",
      "Warm Rajput Hospitality",
      "Free High-Speed Wi-Fi"
    ],
    "location": "D-219, Amba Bari, Jaipur",
    "verifiedPartner": false
  },
  {
    "id": "hotel_ladakh_01",
    "destinationId": "dest_ladakh",
    "name": "The Grand Dragon Ladakh Leh",
    "type": "Luxury High-Altitude Hotel",
    "stars": 5,
    "rating": 4.93,
    "reviewsCount": 780,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 14500,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Oxygen-Fitted Heated Rooms",
      "Stok Kangri Mountain Panorama",
      "Zasgyath Restaurant",
      "Central Solar Heating",
      "Doctor On Call 24/7"
    ],
    "location": "Old Road, Sheynam, Leh, Ladakh",
    "verifiedPartner": true
  },
  {
    "id": "hotel_ladakh_02",
    "destinationId": "dest_ladakh",
    "name": "Chamba Camp Thiksey Luxury Glamping",
    "type": "Ultra-Luxury Glamping",
    "stars": 5,
    "rating": 4.96,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 32000,
    "maxOccupancyPerRoom": 2,
    "childFriendly": false,
    "amenities": [
      "Triple-Layered Heated Canvas Tents",
      "Private Butler Service",
      "Thiksey Monastery Sunrise Chants",
      "Gourmet Multi-Course Meals"
    ],
    "location": "Kiari Gompa Road, Thiksey, Ladakh",
    "verifiedPartner": true
  },
  {
    "id": "hotel_ladakh_03",
    "destinationId": "dest_ladakh",
    "name": "Stok Palace Heritage Hotel",
    "type": "Royal Heritage Hotel",
    "stars": 4,
    "rating": 4.9,
    "reviewsCount": 260,
    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 16000,
    "maxOccupancyPerRoom": 2,
    "childFriendly": false,
    "amenities": [
      "Centuries-Old Royal Palace",
      "Private Museum Access",
      "Traditional Ladakhi Chulli Dining",
      "Apricot Orchard Views"
    ],
    "location": "Stok Village, Leh, Ladakh",
    "verifiedPartner": true
  },
  {
    "id": "hotel_ladakh_04",
    "destinationId": "dest_ladakh",
    "name": "Ladakh Sarai Resort Saboo",
    "type": "Eco Garden Resort",
    "stars": 4,
    "rating": 4.86,
    "reviewsCount": 390,
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 8500,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Yurt Style Mud Cottages",
      "Organic Apple & Willow Orchard",
      "Stargazing Deck",
      "Himalayan Herbal Tea Corner"
    ],
    "location": "Saboo Village, Leh, Ladakh",
    "verifiedPartner": true
  },
  {
    "id": "hotel_ladakh_05",
    "destinationId": "dest_ladakh",
    "name": "Hotel Singge Palace Leh",
    "type": "Premium City Hotel",
    "stars": 4,
    "rating": 4.78,
    "reviewsCount": 450,
    "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 6200,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Close to Main Leh Bazaar",
      "Heated Rooms",
      "Conference Hall",
      "Multi-Cuisine Restaurant",
      "Oxygen Cylinders Available"
    ],
    "location": "Old Road, Leh, Ladakh",
    "verifiedPartner": false
  },
  {
    "id": "hotel_ladakh_06",
    "destinationId": "dest_ladakh",
    "name": "Nubra Organic Retreat Hunder",
    "type": "Valley Eco Camp",
    "stars": 3,
    "rating": 4.82,
    "reviewsCount": 320,
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 5100,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Walking Distance to Sand Dunes",
      "Attached Bath Deluxe Tents",
      "Organic Kitchen Garden",
      "Evening Bonfire"
    ],
    "location": "Hunder Village, Nubra Valley, Ladakh",
    "verifiedPartner": true
  },
  {
    "id": "hotel_andaman_01",
    "destinationId": "dest_andaman",
    "name": "Taj Exotica Resort & Spa Radhanagar Havelock",
    "type": "Ultra-Luxury Beachfront Resort",
    "stars": 5,
    "rating": 4.96,
    "reviewsCount": 650,
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 26000,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Private Canopy Over Radhanagar Beach",
      "Olympic-Length Infinity Pool",
      "Jiva Spa",
      "Canopy Restaurant",
      "Private Dive Guides"
    ],
    "location": "Radhanagar Beach No. 7, Havelock Island",
    "verifiedPartner": true
  },
  {
    "id": "hotel_andaman_02",
    "destinationId": "dest_andaman",
    "name": "Barefoot at Havelock Eco Resort",
    "type": "Eco Luxury Jungle Resort",
    "stars": 4,
    "rating": 4.89,
    "reviewsCount": 520,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 12500,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Thatched Mahogany Cottages",
      "No-TV Digital Detox",
      "Tropical Rainforest Pathway to Beach No. 7",
      "Scuba Training Center"
    ],
    "location": "Beach No. 7, Radhanagar, Havelock Island",
    "verifiedPartner": true
  },
  {
    "id": "hotel_andaman_03",
    "destinationId": "dest_andaman",
    "name": "Symphony Palms Beach Resort Havelock",
    "type": "Beachside Cottage Resort",
    "stars": 4,
    "rating": 4.79,
    "reviewsCount": 440,
    "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 6800,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Private Coral Beachfront",
      "Ocean Delight Restaurant",
      "Scuba & Snorkel Booking",
      "Candlelight Beach Dinners"
    ],
    "location": "Govind Nagar Beach No. 3, Havelock Island",
    "verifiedPartner": true
  },
  {
    "id": "hotel_andaman_04",
    "destinationId": "dest_andaman",
    "name": "Sea Shell Resort Neil Island",
    "type": "Island Resort",
    "stars": 4,
    "rating": 4.83,
    "reviewsCount": 380,
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 7400,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Swimming Pool",
      "Private Beach Access",
      "Seafood Barbecue",
      "Bicycle Rentals for Island Touring"
    ],
    "location": "Laxmanpur Beach, Neil Island",
    "verifiedPartner": true
  },
  {
    "id": "hotel_andaman_05",
    "destinationId": "dest_andaman",
    "name": "Welcomhotel by ITC Hotels Bay Island Port Blair",
    "type": "Harbour Luxury Hotel",
    "stars": 5,
    "rating": 4.85,
    "reviewsCount": 560,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 11000,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Overlooking Port Blair Harbour",
      "Padauk Timber Architecture",
      "Seawall Deck",
      "Infinity Pool",
      "Close to Cellular Jail"
    ],
    "location": "Marine Hill, Port Blair",
    "verifiedPartner": true
  },
  {
    "id": "hotel_andaman_06",
    "destinationId": "dest_andaman",
    "name": "TSG Blue Resort Havelock",
    "type": "Deluxe Island Resort",
    "stars": 3,
    "rating": 4.74,
    "reviewsCount": 290,
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 4800,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Swimming Pool",
      "Wooden Timber Cabins",
      "Multi-Cuisine Dining",
      "Near Radhanagar Beach"
    ],
    "location": "Radhanagar Village, Havelock Island",
    "verifiedPartner": false
  },
  {
    "id": "hotel_varanasi_01",
    "destinationId": "dest_varanasi",
    "name": "BrijRama Palace Heritage Ghats",
    "type": "Palatial Ghatside Palace",
    "stars": 5,
    "rating": 4.95,
    "reviewsCount": 810,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 21500,
    "maxOccupancyPerRoom": 2,
    "childFriendly": false,
    "amenities": [
      "Direct Boat Check-in on River Ganga",
      "18th-Century Maratha Palace",
      "Morning Flute & Sitar Recitals",
      "Darbhanga Pure Vegetarian Dining"
    ],
    "location": "Darbhanga Ghat, Dashashwamedh, Varanasi",
    "verifiedPartner": true
  },
  {
    "id": "hotel_varanasi_02",
    "destinationId": "dest_varanasi",
    "name": "Taj Ganges Varanasi",
    "type": "Luxury Garden Resort",
    "stars": 5,
    "rating": 4.91,
    "reviewsCount": 920,
    "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 12800,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "40 Acres of Lush Greenery",
      "Outdoor Pool",
      "Jiva Spa",
      "Varuna Indian Restaurant",
      "Ample Private Parking"
    ],
    "location": "Nadesar Palace Grounds, Varanasi",
    "verifiedPartner": true
  },
  {
    "id": "hotel_varanasi_03",
    "destinationId": "dest_varanasi",
    "name": "Suryauday Haveli on Shivala Ghat",
    "type": "Heritage Haveli on Ghat",
    "stars": 4,
    "rating": 4.86,
    "reviewsCount": 460,
    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 8200,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Rooftop Ganga Sunrise Views",
      "Yoga Classes on Ghat",
      "Private Boat Arrangements",
      "Traditional Satvik Kitchen"
    ],
    "location": "B-4/25 Shivala Ghat, Varanasi",
    "verifiedPartner": true
  },
  {
    "id": "hotel_varanasi_04",
    "destinationId": "dest_varanasi",
    "name": "Hotel Ganges View Assi Ghat",
    "type": "Boutique Cultural Heritage",
    "stars": 3,
    "rating": 4.82,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 5100,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Assi Ghat Rooftop Terrace",
      "Literary Library",
      "Classical Music Salon",
      "Vegetarian Home Cooked Dinners"
    ],
    "location": "Assi Ghat, Varanasi",
    "verifiedPartner": true
  },
  {
    "id": "hotel_varanasi_05",
    "destinationId": "dest_varanasi",
    "name": "Radisson Hotel Varanasi",
    "type": "Modern Premium Hotel",
    "stars": 4,
    "rating": 4.77,
    "reviewsCount": 680,
    "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 5900,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Outdoor Pool",
      "The Great Kabab Factory",
      "Fitness Centre",
      "Mall Road Cantonment Location"
    ],
    "location": "Main Mall Road, Cantonment, Varanasi",
    "verifiedPartner": false
  },
  {
    "id": "hotel_rishikesh_01",
    "destinationId": "dest_rishikesh",
    "name": "Ananda in the Himalayas Palace Estate",
    "type": "World-Class Wellness Retreat",
    "stars": 5,
    "rating": 4.98,
    "reviewsCount": 520,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 38000,
    "maxOccupancyPerRoom": 2,
    "childFriendly": false,
    "amenities": [
      "100-Acre Maharaja Palace Estate",
      "Comprehensive Ayurvedic & Vedanta Programs",
      "Outdoor Temperature-Controlled Pool",
      "Golf Course"
    ],
    "location": "The Palace Estate, Narendra Nagar, Tehri Garhwal",
    "verifiedPartner": true
  },
  {
    "id": "hotel_rishikesh_02",
    "destinationId": "dest_rishikesh",
    "name": "Taj Rishikesh Resort & Spa Singthali",
    "type": "Luxury Riverfront Resort",
    "stars": 5,
    "rating": 4.94,
    "reviewsCount": 490,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 22500,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Private Ganga Beachfront & Pebble Walk",
      "Infinity Pool",
      "Jiva Spa",
      "Rock Flour Dining",
      "Riverside Aarti Pavilion"
    ],
    "location": "Singthali, Byasi, Rishikesh-Badrinath Road",
    "verifiedPartner": true
  },
  {
    "id": "hotel_rishikesh_03",
    "destinationId": "dest_rishikesh",
    "name": "Aloha On The Ganges Tapovan",
    "type": "Premium Riverview Resort",
    "stars": 4,
    "rating": 4.84,
    "reviewsCount": 780,
    "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 7200,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Infinity Pool Overlooking Ganga",
      "Ayurvedic Centre",
      "Latitude Restaurant",
      "Yoga & Meditation Classes"
    ],
    "location": "Tapovan, National Highway 58, Rishikesh",
    "verifiedPartner": true
  },
  {
    "id": "hotel_rishikesh_04",
    "destinationId": "dest_rishikesh",
    "name": "Divine Resort & Spa Laxman Jhula",
    "type": "Boutique River Resort",
    "stars": 4,
    "rating": 4.8,
    "reviewsCount": 620,
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 5500,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Ganga Riverfront Terrace",
      "Laxman Jhula View Balconies",
      "Rooftop Yoga Shala",
      "Pure Veg Organic Dining"
    ],
    "location": "Laxman Jhula, Tapovan, Rishikesh",
    "verifiedPartner": true
  },
  {
    "id": "hotel_rishikesh_05",
    "destinationId": "dest_rishikesh",
    "name": "Ganga Kinare Riverside Boutique Hotel",
    "type": "Riverside Heritage Hotel",
    "stars": 3,
    "rating": 4.78,
    "reviewsCount": 460,
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 4300,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Private Ghat with Daily Evening Aarti",
      "Complimentary Bicycles",
      "Jal & Jalebi Restaurant",
      "Ayur Ganga Spa"
    ],
    "location": "23 Haridwar Road, Rishikesh",
    "verifiedPartner": false
  },
  {
    "id": "hotel_hampi_01",
    "destinationId": "dest_hampi",
    "name": "Evolve Back Kamalapura Palace Hampi",
    "type": "Palatial Luxury Resort",
    "stars": 5,
    "rating": 4.96,
    "reviewsCount": 520,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 24500,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "14th-Century Vijayanagara Fort Architecture",
      "Olympic Olympic Pool & Family Pool",
      "Vaidyasala Ayurvedic Spa",
      "Reading Lounge"
    ],
    "location": "Kamalapura, Near UNESCO Ruins, Hampi",
    "verifiedPartner": true
  },
  {
    "id": "hotel_hampi_02",
    "destinationId": "dest_hampi",
    "name": "Heritage Resort Hampi",
    "type": "Eco Heritage Resort",
    "stars": 4,
    "rating": 4.85,
    "reviewsCount": 410,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 6900,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Organic Vegetable Gardens",
      "Swimming Pool",
      "Bird Watching Walks",
      "Multi-Cuisine Cottage Dining"
    ],
    "location": "48/C Hosapete Taluk, Hampi",
    "verifiedPartner": true
  },
  {
    "id": "hotel_hampi_03",
    "destinationId": "dest_hampi",
    "name": "Hyatt Place Hampi Vidyanagar",
    "type": "Contemporary Luxury Hotel",
    "stars": 4,
    "rating": 4.81,
    "reviewsCount": 580,
    "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 5800,
    "maxOccupancyPerRoom": 3,
    "childFriendly": true,
    "amenities": [
      "Outdoor Swimming Pool",
      "24/7 Fitness Center",
      "Gallery Kitchen",
      "Convenient Shuttle to Hampi Heritage Sites"
    ],
    "location": "Vidyanagar Township, Toranagallu, Hampi",
    "verifiedPartner": true
  },
  {
    "id": "hotel_hampi_04",
    "destinationId": "dest_hampi",
    "name": "Kishkinda Heritage Resort Anegundi",
    "type": "Water Park & Heritage Resort",
    "stars": 3,
    "rating": 4.74,
    "reviewsCount": 390,
    "image": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 3600,
    "maxOccupancyPerRoom": 4,
    "childFriendly": true,
    "amenities": [
      "Sprawling Hillside Cottages",
      "Water Slides & Pool",
      "Coracle Crossing Point",
      "Near Anjanadri Hill"
    ],
    "location": "Near Sanapur Lake, Anegundi, Hampi",
    "verifiedPartner": false
  },
  {
    "id": "hotel_hampi_05",
    "destinationId": "dest_hampi",
    "name": "Clarks Inn Hampi",
    "type": "Boutique Hotel",
    "stars": 3,
    "rating": 4.72,
    "reviewsCount": 320,
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    "basePricePerNight": 3900,
    "maxOccupancyPerRoom": 2,
    "childFriendly": true,
    "amenities": [
      "Next to Archaeological Museum",
      "Bridge Multi-Cuisine Restaurant",
      "Spa Centre",
      "Free Parking"
    ],
    "location": "Kamalapur, State Highway 49, Hampi",
    "verifiedPartner": true
  }
];

export const TRANSPORT_DATA = {
  "flights": [
    {
      "id": "fl_01",
      "airline": "IndiGo",
      "flightNo": "6E-512",
      "from": "DEL",
      "to": "COK",
      "depTime": "06:15",
      "arrTime": "09:30",
      "price": 5800,
      "duration": "3h 15m",
      "stops": 0,
      "seatsAvailable": 14
    },
    {
      "id": "fl_02",
      "airline": "Air India",
      "flightNo": "AI-805",
      "from": "BOM",
      "to": "GOI",
      "depTime": "11:20",
      "arrTime": "12:35",
      "price": 4200,
      "duration": "1h 15m",
      "stops": 0,
      "seatsAvailable": 8
    },
    {
      "id": "fl_03",
      "airline": "Vistara",
      "flightNo": "UK-721",
      "from": "BLR",
      "to": "IXZ",
      "depTime": "08:45",
      "arrTime": "11:15",
      "price": 8400,
      "duration": "2h 30m",
      "stops": 0,
      "seatsAvailable": 6
    },
    {
      "id": "fl_04",
      "airline": "SpiceJet",
      "flightNo": "SG-123",
      "from": "DEL",
      "to": "IXL",
      "depTime": "05:40",
      "arrTime": "07:05",
      "price": 7900,
      "duration": "1h 25m",
      "stops": 0,
      "seatsAvailable": 11
    },
    {
      "id": "fl_05",
      "airline": "Akasa Air",
      "flightNo": "QP-135",
      "from": "BOM",
      "to": "VNS",
      "depTime": "14:10",
      "arrTime": "16:25",
      "price": 4600,
      "duration": "2h 15m",
      "stops": 0,
      "seatsAvailable": 19
    }
  ],
  "trains": [
    {
      "id": "tr_01",
      "trainNo": "12626",
      "name": "Kerala Superfast Express",
      "from": "New Delhi",
      "to": "Ernakulam Jn",
      "depTime": "20:10",
      "arrTime": "16:30 (+1)",
      "duration": "44h 20m",
      "classes": [
        "3A",
        "2A",
        "1A"
      ],
      "basePrice": 2250,
      "availableSeats": 32
    },
    {
      "id": "tr_02",
      "trainNo": "12051",
      "name": "Madgaon Jan Shatabdi Express",
      "from": "CSMT Mumbai",
      "to": "Madgaon",
      "depTime": "05:10",
      "arrTime": "14:10",
      "duration": "9h 00m",
      "classes": [
        "CC",
        "EV"
      ],
      "basePrice": 1040,
      "availableSeats": 48
    },
    {
      "id": "tr_03",
      "trainNo": "12015",
      "name": "Ajmer Shatabdi Express",
      "from": "New Delhi",
      "to": "Jaipur",
      "depTime": "06:10",
      "arrTime": "10:40",
      "duration": "4h 30m",
      "classes": [
        "CC",
        "EC"
      ],
      "basePrice": 940,
      "availableSeats": 65
    },
    {
      "id": "tr_04",
      "trainNo": "22436",
      "name": "Vande Bharat Express",
      "from": "New Delhi",
      "to": "Varanasi Jn",
      "depTime": "06:00",
      "arrTime": "14:00",
      "duration": "8h 00m",
      "classes": [
        "CC",
        "EC"
      ],
      "basePrice": 1750,
      "availableSeats": 26
    },
    {
      "id": "tr_05",
      "trainNo": "16592",
      "name": "Hampi Express",
      "from": "KSR Bengaluru",
      "to": "Hosapete Jn",
      "depTime": "21:50",
      "arrTime": "07:10 (+1)",
      "duration": "9h 20m",
      "classes": [
        "SL",
        "3A",
        "2A"
      ],
      "basePrice": 1120,
      "availableSeats": 42
    }
  ],
  "cabs": [
    {
      "id": "cb_01",
      "type": "Sedan (Dzire / Etios)",
      "capacity": "4 Passengers",
      "luggage": "2 Bags",
      "pricePerKm": 14,
      "minDistance": 250,
      "rating": 4.88,
      "driverRating": 4.9,
      "features": [
        "AC",
        "Free Cancellation",
        "Verified Chauffeur",
        "Bottled Water"
      ]
    },
    {
      "id": "cb_02",
      "type": "Prime SUV (Innova Crysta)",
      "capacity": "6 Passengers",
      "luggage": "4 Bags",
      "pricePerKm": 21,
      "minDistance": 250,
      "rating": 4.95,
      "driverRating": 4.98,
      "features": [
        "AC",
        "Recliner Captain Seats",
        "Roof Luggage Carrier",
        "Hill Terrain Specialist"
      ]
    },
    {
      "id": "cb_03",
      "type": "Executive Urban EV",
      "capacity": "4 Passengers",
      "luggage": "2 Bags",
      "pricePerKm": 16,
      "minDistance": 100,
      "rating": 4.91,
      "driverRating": 4.92,
      "features": [
        "Zero Emissions",
        "Quiet Cabin",
        "Fast Charger Route Optimized",
        "AC"
      ]
    },
    {
      "id": "cb_04",
      "type": "Tempo Traveller (Luxury 12-Seater)",
      "capacity": "12 Passengers",
      "luggage": "10 Bags",
      "pricePerKm": 28,
      "minDistance": 300,
      "rating": 4.82,
      "driverRating": 4.85,
      "features": [
        "Pushback Seats",
        "Surround Sound",
        "Chilled AC",
        "Group Tour Specialist"
      ]
    }
  ]
};

export const SOLO_TRIPS = [
  {
    "id": "solo_munnar_01",
    "destinationId": "dest_munnar",
    "title": "Munnar Tea Trails & Solitary Cloud Walks",
    "price": 8499,
    "duration": "4 Days / 3 Nights",
    "stayType": "Boutique Eco Hostel (Private Solo Room)",
    "safetyScore": 96,
    "womenSafe": true,
    "socialActivities": [
      "Estate Campfire & Live Acoustic Night",
      "Sunrise Group Trek to Top Station",
      "Community Tea Sommelier Workshop"
    ],
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "24/7 On-Call Buddy"
    ],
    "itineraryHighlight": "Sunrise hike through cloud inversion at Top Station followed by group bonfire dinner."
  },
  {
    "id": "solo_goa_01",
    "destinationId": "dest_goa",
    "title": "South Goa Mindful Retreat & Sunset Paddle",
    "price": 9999,
    "duration": "5 Days / 4 Nights",
    "stayType": "Beachfront Co-Living Hub & Pods",
    "safetyScore": 92,
    "womenSafe": true,
    "socialActivities": [
      "Morning Beach Hatha Yoga",
      "Sunset Stand-Up Paddleboard Session",
      "Latin Quarter Craft Beer Crawl"
    ],
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Digital Nomad Ready",
      "Private Locker Enclosed"
    ],
    "itineraryHighlight": "Peaceful paddleboard gliding on Palolem's turquoise waters with fellow travelers."
  },
  {
    "id": "solo_jaipur_01",
    "destinationId": "dest_jaipur",
    "title": "Jaipur Heritage Odyssey & Street Lens Trail",
    "price": 7499,
    "duration": "4 Days / 3 Nights",
    "stayType": "Heritage Haveli Hostel (Private Pod)",
    "safetyScore": 93,
    "womenSafe": true,
    "socialActivities": [
      "Nahargarh Fort Sunset Cycling",
      "Block-Printing Textile Workshop",
      "Night Street Food Crawl"
    ],
    "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Curated Solo Cohort",
      "Local Guide Accompanied"
    ],
    "itineraryHighlight": "Golden hour bicycle ride along Nahargarh ridge overlooking Pink City."
  },
  {
    "id": "solo_ladakh_01",
    "destinationId": "dest_ladakh",
    "title": "Ladakh High Passes & Monastic Solitude",
    "price": 18999,
    "duration": "7 Days / 6 Nights",
    "stayType": "Homestay & Heated Glamping Hub",
    "safetyScore": 94,
    "womenSafe": true,
    "socialActivities": [
      "Thiksey Sunrise Morning Chants",
      "Nubra Sand Dunes Stargazing",
      "Ladakhi Culinary Cooking Session"
    ],
    "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Oxygen Support Included",
      "Verified Women-Safe",
      "Experienced Trek Marshal"
    ],
    "itineraryHighlight": "Sitting quietly with Tibetan Buddhist monks in prayer hall during sunrise chants."
  },
  {
    "id": "solo_andaman_01",
    "destinationId": "dest_andaman",
    "title": "Andaman Ocean Discovery & Coral Drift",
    "price": 16999,
    "duration": "6 Days / 5 Nights",
    "stayType": "Eco Beach Hut & Diver's Villa",
    "safetyScore": 97,
    "womenSafe": true,
    "socialActivities": [
      "Elephant Beach Coral Snorkeling",
      "Bioluminescent Night Kayak",
      "Sunset Shack Barbecue"
    ],
    "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "PADI Instructor Escort"
    ],
    "itineraryHighlight": "Night kayak across Havelock lagoons surrounded by glowing blue bioluminescence."
  },
  {
    "id": "solo_varanasi_01",
    "destinationId": "dest_varanasi",
    "title": "Varanasi Spiritual Immersion & Sacred Ghats",
    "price": 6499,
    "duration": "3 Days / 2 Nights",
    "stayType": "Riverside Heritage Guest Sanctuary",
    "safetyScore": 91,
    "womenSafe": true,
    "socialActivities": [
      "Dawn Subah-e-Banaras Boat Ride",
      "Philosophical Ghat Walk",
      "Sitar & Tabla Classical Evening"
    ],
    "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Female Local Guide Available",
      "Private Transport Pick"
    ],
    "itineraryHighlight": "Silent dawn boat ride watching the timeless bathing rites as golden sunlight touches river Ganga."
  },
  {
    "id": "solo_rishikesh_01",
    "destinationId": "dest_rishikesh",
    "title": "Rishikesh Yoga, Rapids & Sound Bath",
    "price": 7999,
    "duration": "4 Days / 3 Nights",
    "stayType": "Ashram & Modern Boutique Pods",
    "safetyScore": 95,
    "womenSafe": true,
    "socialActivities": [
      "Daily Sunrise Ashtanga Yoga",
      "Ganga White-Water Rafting Expedition",
      "Sound Bowl Healing Circle"
    ],
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "Certified Wellness Mentors"
    ],
    "itineraryHighlight": "Tibetan sound bowl resonance session under open mountain skies beside holy river Ganga."
  },
  {
    "id": "solo_hampi_01",
    "destinationId": "dest_hampi",
    "title": "Hampi Boulder Wanderers & Cosmic Sunsets",
    "price": 6999,
    "duration": "4 Days / 3 Nights",
    "stayType": "Hippie Island Eco Mud Hut",
    "safetyScore": 93,
    "womenSafe": true,
    "socialActivities": [
      "Sunset Bouldering at Matanga Hill",
      "Sanapur Lake Coracle Paddle",
      "Live Jam Session & Rooftop Cafe"
    ],
    "image": "https://images.unsplash.com/photo-1600100397608-f010f443818e?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "ASI Certified Escort"
    ],
    "itineraryHighlight": "Climbing Matanga Hill boulders for a panoramic golden sunset over stone chariot ruins."
  },
  {
    "id": "solo_udaipur_01",
    "destinationId": "dest_udaipur",
    "title": "Udaipur Royal Lakes & Artist Residency",
    "price": 8999,
    "duration": "4 Days / 3 Nights",
    "stayType": "Lakefront Boutique Haveli Pod",
    "safetyScore": 94,
    "womenSafe": true,
    "socialActivities": [
      "Lake Pichola Sunset Sketching",
      "Miniature Painting Masterclass",
      "Rooftop Folk Music Dinner"
    ],
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "Safe Night Transfers"
    ],
    "itineraryHighlight": "Miniature stone painting lesson from a master artisan in old city haveli courtyard."
  },
  {
    "id": "solo_manali_01",
    "destinationId": "dest_manali",
    "title": "Manali Alpine Nomad & Cedar Trails",
    "price": 8499,
    "duration": "5 Days / 4 Nights",
    "stayType": "Old Manali Backpackers Lodge",
    "safetyScore": 92,
    "womenSafe": true,
    "socialActivities": [
      "Jogini Waterfall Forest Hike",
      "Solang Valley Tandem Paraglide",
      "Acoustic Fireplace Social"
    ],
    "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Adventure Gear Provided",
      "Mountain Safety Certified"
    ],
    "itineraryHighlight": "Hike through ancient apple orchards to Jogini falls with fresh mountain chai."
  },
  {
    "id": "solo_ooty_01",
    "destinationId": "dest_ooty",
    "title": "Ooty Nilgiri Toy Train & Botanical Solitude",
    "price": 7299,
    "duration": "3 Days / 2 Nights",
    "stayType": "Colonial Tea Villa (Private Room)",
    "safetyScore": 95,
    "womenSafe": true,
    "socialActivities": [
      "Nilgiri Toy Train Ride with Group",
      "Pykara Lake Pine Walk",
      "Artisan Chocolate Tasting"
    ],
    "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "Heritage Certified"
    ],
    "itineraryHighlight": "Riding open window toy train through 16 mountain tunnels in the Nilgiris."
  },
  {
    "id": "solo_coorg_01",
    "destinationId": "dest_coorg",
    "title": "Coorg Coffee Estate Writer's Retreat",
    "price": 7899,
    "duration": "4 Days / 3 Nights",
    "stayType": "Plantation Homestay & Creative Cottage",
    "safetyScore": 96,
    "womenSafe": true,
    "socialActivities": [
      "Coffee Cupping & Roasting Session",
      "Abbey Falls Photography Hike",
      "Kodava Kitchen Culinary Class"
    ],
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "High-Speed Wi-Fi Workspaces",
      "Family Homestay Care"
    ],
    "itineraryHighlight": "Quiet mornings on cottage veranda with estate-roasted pour-over coffee."
  },
  {
    "id": "solo_alleppey_01",
    "destinationId": "dest_alleppey",
    "title": "Alleppey Slow Waters & Village Canoeing",
    "price": 8299,
    "duration": "3 Days / 2 Nights",
    "stayType": "Backwater Eco Villa & Shared Houseboat Pod",
    "safetyScore": 96,
    "womenSafe": true,
    "socialActivities": [
      "Hand-Paddled Canoe Tour",
      "Village Paddy Field Walk",
      "Karimeen Cooking Demonstration"
    ],
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "Life Jackets Mandatory"
    ],
    "itineraryHighlight": "Gliding through narrow interior canals where lotus flowers brush against your canoe."
  },
  {
    "id": "solo_jaisalmer_01",
    "destinationId": "dest_jaisalmer",
    "title": "Jaisalmer Golden Dunes & Desert Campfire",
    "price": 7699,
    "duration": "3 Days / 2 Nights",
    "stayType": "Sandstone Fort Boutique & Desert Swiss Tent",
    "safetyScore": 93,
    "womenSafe": true,
    "socialActivities": [
      "Sunset Camel Ride into Thar",
      "Kalbelia Folk Dance Night",
      "Living Fort Rooftop Chai"
    ],
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "Security Escorted Desert Camps"
    ],
    "itineraryHighlight": "Stargazing under crystal-clear desert skies after an authentic Rajasthani dinner."
  },
  {
    "id": "solo_darjeeling_01",
    "destinationId": "dest_darjeeling",
    "title": "Darjeeling Mist, Monasteries & Mount Kanchenjunga",
    "price": 7999,
    "duration": "4 Days / 3 Nights",
    "stayType": "Mountain View Boutique Lodge",
    "safetyScore": 95,
    "womenSafe": true,
    "socialActivities": [
      "Tiger Hill Dawn Group Excursion",
      "Ghoom Monastery Tibetan Chants",
      "First-Flush Tea Tasting Workshop"
    ],
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "Mountain Emergency Support"
    ],
    "itineraryHighlight": "First rays of sun turning Kanchenjunga peak golden while sipping hot Darjeeling tea."
  },
  {
    "id": "solo_pondicherry_01",
    "destinationId": "dest_pondicherry",
    "title": "Pondicherry French Chic & Auroville Meditation",
    "price": 6899,
    "duration": "3 Days / 2 Nights",
    "stayType": "Pastel French Quarter Boutique Guesthouse",
    "safetyScore": 95,
    "womenSafe": true,
    "socialActivities": [
      "White Town Vintage Bicycle Tour",
      "Auroville Matrimandir Concentration",
      "French Patisserie Crawl"
    ],
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Solo Female Traveler Favorite",
      "Central Walkable Location"
    ],
    "itineraryHighlight": "Pedaling past yellow colonial villas adorned with bougainvillea in White Town."
  },
  {
    "id": "solo_amritsar_01",
    "destinationId": "dest_amritsar",
    "title": "Amritsar Soulful Seva & Border Pride",
    "price": 5999,
    "duration": "3 Days / 2 Nights",
    "stayType": "Comfort Heritage Hotel near Golden Temple",
    "safetyScore": 95,
    "womenSafe": true,
    "socialActivities": [
      "Midnight Golden Temple Darshan",
      "Langar Seva Volunteering",
      "Wagah Border Flag Lowering Ceremony"
    ],
    "image": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "24/7 Temple Corridor Safety"
    ],
    "itineraryHighlight": "Rolling rotis with smiling local grandmothers in the world's largest community kitchen."
  },
  {
    "id": "solo_meghalaya_01",
    "destinationId": "dest_meghalaya",
    "title": "Meghalaya Living Bridges & Clean Trails",
    "price": 13999,
    "duration": "5 Days / 4 Nights",
    "stayType": "Rainforest Eco Homestay",
    "safetyScore": 96,
    "womenSafe": true,
    "socialActivities": [
      "Double Decker Living Root Bridge Hike",
      "Umngot River Glass Boat Ride",
      "Mawlynnong Village Dinner"
    ],
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Local Khasi Guide Escort",
      "Zero Plastic Certified"
    ],
    "itineraryHighlight": "Trekking through lush Khasi rainforest to stand on living root bridge grown over centuries."
  },
  {
    "id": "solo_gokarna_01",
    "destinationId": "dest_gokarna",
    "title": "Gokarna Cliff Trail Hiker & Om Sunset",
    "price": 6499,
    "duration": "3 Days / 2 Nights",
    "stayType": "Cliff Beachfront Hostel (Private Pod)",
    "safetyScore": 94,
    "womenSafe": true,
    "socialActivities": [
      "5-Beach Cliff Hiking Trail",
      "Om Beach Sunset Paddleboard",
      "Beach Shack Seafood Night"
    ],
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "Community Host on-site"
    ],
    "itineraryHighlight": "Trekking between secluded paradise beaches with panoramic Arabian sea views."
  },
  {
    "id": "solo_kaziranga_01",
    "destinationId": "dest_kaziranga",
    "title": "Kaziranga Rhino Tracking & Wildlife Photo Trail",
    "price": 11999,
    "duration": "4 Days / 3 Nights",
    "stayType": "Eco Wildlife Sanctuary Lodge",
    "safetyScore": 95,
    "womenSafe": true,
    "socialActivities": [
      "Early Morning Rhino Tracking Jeep Safari",
      "Assamese Cultural Bihu Evening",
      "Tea Estate Birding Walk"
    ],
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Forest Dept Registered Guides",
      "Safe Group Vehicle Transfers"
    ],
    "itineraryHighlight": "Spotting a great one-horned rhino grazing peacefully just twenty meters from your jeep."
  },
  {
    "id": "solo_kodaikanal_01",
    "destinationId": "dest_kodaikanal",
    "title": "Kodaikanal Mist & Pine Forest Reflection",
    "price": 6899,
    "duration": "3 Days / 2 Nights",
    "stayType": "Misty Mountain Guesthouse Pod",
    "safetyScore": 93,
    "womenSafe": true,
    "socialActivities": [
      "Star Lake Sunset Rowing",
      "Pine Forest Meditation Walk",
      "Coaker's Walk Ridge Stroll"
    ],
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "24/7 Guesthouse Reception"
    ],
    "itineraryHighlight": "Walking through towering pine forests wrapped in cool mountain mist."
  },
  {
    "id": "solo_chikmagalur_01",
    "destinationId": "dest_chikmagalur",
    "title": "Chikmagalur Mullayanagiri Summit & Coffee Escape",
    "price": 6999,
    "duration": "3 Days / 2 Nights",
    "stayType": "Coffee Estate Heritage Cottage",
    "safetyScore": 95,
    "womenSafe": true,
    "socialActivities": [
      "Mullayanagiri Sunrise Trek",
      "Estate Coffee Cupping & Brewing",
      "Jeep Ride to Hebbe Falls"
    ],
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    "verifiedBadges": [
      "Verified Women-Safe",
      "Zero Single Supplement",
      "Trek Guide Accompanied"
    ],
    "itineraryHighlight": "Standing atop Karnataka's highest peak watching sunrise over a rolling sea of mist."
  }
];

export const COMMUNITY_BUDDIES = [
  {
    "id": "buddy_01",
    "name": "Rohan & Sneha",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    "destination": "Goa & Gokarna",
    "plannedDates": "Nov 14 - Nov 20, 2026",
    "travelStyle": "Cafes, Bouldering & Coastal Kayak",
    "bio": "Couple traveling from Bangalore. Looking for 2 friendly travel buddies to split catamaran charters and sunset shacks.",
    "verifiedId": true,
    "lookingFor": "2 Travel Companions"
  },
  {
    "id": "buddy_02",
    "name": "Tanvi Verma",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    "destination": "Ladakh (Leh, Nubra, Pangong)",
    "plannedDates": "Jun 02 - Jun 10, 2026",
    "travelStyle": "Photography, Stargazing & Camping",
    "bio": "Architect & landscape photographer from Delhi. Planning a high-altitude SUV trip. Looking for female co-travelers.",
    "verifiedId": true,
    "lookingFor": "Female Solo Travelers"
  },
  {
    "id": "buddy_03",
    "name": "Arjun Reddy",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    "destination": "Rishikesh & Uttarakhand",
    "plannedDates": "Oct 05 - Oct 09, 2026",
    "travelStyle": "Grade 4 Rafting, Bungee & Campfire",
    "bio": "Fitness trainer from Hyderabad looking for thrill-seekers to form a 6-person rafting and bungee team in Rishikesh.",
    "verifiedId": true,
    "lookingFor": "Adventure Enthusiasts"
  },
  {
    "id": "buddy_04",
    "name": "Meera & Pooja",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80",
    "destination": "Munnar & Alleppey",
    "plannedDates": "Dec 18 - Dec 23, 2026",
    "travelStyle": "Tea Tastings, Houseboat & Birdwatching",
    "bio": "Two college friends from Chennai doing a scenic road trip across Kerala hills and backwaters. Welcoming cheerful companions.",
    "verifiedId": true,
    "lookingFor": "1-2 Fellow Travelers"
  }
];

export const PHOTO_ALBUMS = [
  {
    "id": "alb_01",
    "title": "Misty Munnar Dawn",
    "author": "Priya Sharma",
    "authorAvatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    "destination": "Munnar",
    "price": 499,
    "rating": 4.95,
    "salesCount": 142,
    "pagesCount": 36,
    "coverImage": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    "description": "Curated high-resolution visual collection capturing sunrise through misty cardamom valleys and tea estate laborers at dawn.",
    "previewPages": [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "alb_02",
    "title": "Golden Hour in Fontainhas",
    "author": "Savio Fernandes",
    "authorAvatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    "destination": "Goa",
    "price": 399,
    "rating": 4.91,
    "salesCount": 98,
    "pagesCount": 28,
    "coverImage": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    "description": "A tribute to 450 years of Indo-Portuguese architecture, painted azulejo tiles, wooden windows, and warm evening light.",
    "previewPages": [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "alb_03",
    "title": "Silence of Pangong",
    "author": "Stanzin Dorje",
    "authorAvatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    "destination": "Ladakh",
    "price": 699,
    "rating": 4.98,
    "salesCount": 215,
    "pagesCount": 44,
    "coverImage": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    "description": "Turquoise water reflections of jagged snow peaks, prayer flags fluttered by Himalayan winds, and stars above Nubra dunes.",
    "previewPages": [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    "id": "alb_04",
    "title": "Sacred Embers of Banaras",
    "author": "Pandit Anand Mishra",
    "authorAvatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    "destination": "Varanasi",
    "price": 549,
    "rating": 4.94,
    "salesCount": 167,
    "pagesCount": 32,
    "coverImage": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    "description": "Atmospheric dawn boats, evening brass lamps flaming at Dashashwamedh, and mystical moments on the river Ganga.",
    "previewPages": [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export const FAQS = [
  {
    "q": "How does TripCraft guarantee verified women-safe solo trips?",
    "a": "Every solo trip labeled 'Women-Safe' undergoes a rigorous 14-point audit including vetted accommodation with 24/7 front desk, female or verified local guides, secure locked luggage spaces, and direct emergency hotline integration."
  },
  {
    "q": "Can I customize an existing package or itinerary?",
    "a": "Yes! Every package can be tailored with optional excursions, room upgrades, dietary preferences, and private vehicle options. Simply hit 'Customize Itinerary' on any package detail page."
  },
  {
    "q": "How does the Local Guide booking and payment work?",
    "a": "Local Guides set clear per-day transparent tariffs. When you book a guide, TripCraft holds your payment in escrow until the tour is satisfactorily completed, safeguarding both travelers and guides."
  },
  {
    "q": "What is the cancellation and refund policy?",
    "a": "Full refunds are guaranteed up to 72 hours prior to scheduled departure for standard packages and hotels. Specific cancellation terms are transparently shown inside the Booking Details review panel."
  },
  {
    "q": "How do Photo Albums work?",
    "a": "Travelers can curate and upload up to 5 personal high-resolution photos into custom albums. You can also purchase digital high-resolution photo essays created by certified local guides."
  },
  {
    "q": "Is my payment information secure?",
    "a": "TripCraft uses 256-bit SSL encryption and PCI-DSS certified mock payment gateways supporting UPI, Credit/Debit cards, Net Banking, and Wallet checkouts."
  },
  {
    "q": "How do group discounts apply on packages?",
    "a": "Packages indicate a group threshold (e.g. 4+ travelers) that automatically activates a percentage discount (10% - 15%) in your booking review calculation."
  },
  {
    "q": "Can I download my booking voucher and invoice?",
    "a": "Yes, immediately upon completing your reservation, an authentic PDF/printable voucher is generated with your booking confirmation ID, QR code, and emergency contact details."
  }
];

export const LOCAL_GUIDES = [
  {
    "id": "guide_munnar_01",
    "name": "Manoj Kumar",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_munnar",
    "city": "Munnar",
    "state": "Kerala",
    "languages": [
      "English",
      "Tamil",
      "Malayalam"
    ],
    "experienceYears": 11,
    "rating": 4.96,
    "reviewsCount": 284,
    "perDayRate": 2200,
    "specialization": "Tea Estate Trails & Nilgiri Tahr Tracking",
    "badge": "Master Naturalist",
    "verified": true,
    "bio": "Born and raised in Munnar's Kannan Devan hills. Certified naturalist specializing in high-altitude flora and endemic birding.",
    "highlights": [
      "Kolukkumalai Sunrise 4x4 specialist",
      "Expert in high-altitude wild flora",
      "First-aid certified mountain trekker"
    ],
    "availableDays": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  {
    "id": "guide_munnar_02",
    "name": "Deepa Nair",
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_munnar",
    "city": "Munnar",
    "state": "Kerala",
    "languages": [
      "English",
      "Malayalam",
      "Hindi"
    ],
    "experienceYears": 8,
    "rating": 4.92,
    "reviewsCount": 198,
    "perDayRate": 2000,
    "specialization": "Spice Plantation Botany & Forest Walks",
    "badge": "Certified Eco Guide",
    "verified": true,
    "bio": "Passionate botanist leading intimate spice trails and family-friendly nature discovery across Idukki valley.",
    "highlights": [
      "Interactive spice identification",
      "Child-friendly tea tasting",
      "Traditional culinary trails"
    ],
    "availableDays": [
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  },
  {
    "id": "guide_munnar_03",
    "name": "Suresh Pillai",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_munnar",
    "city": "Munnar",
    "state": "Kerala",
    "languages": [
      "English",
      "Tamil",
      "Malayalam",
      "Hindi"
    ],
    "experienceYears": 14,
    "rating": 4.94,
    "reviewsCount": 340,
    "perDayRate": 2500,
    "specialization": "Anamudi Foothills & Trekking Routes",
    "badge": "Senior Trekking Marshal",
    "verified": true,
    "bio": "Veteran Western Ghats trek leader with deep knowledge of forest permits, wildlife habitats, and tribal hamlets.",
    "highlights": [
      "Offbeat waterfall cascades",
      "Permit management assistance",
      "Photography spot scout"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_goa_01",
    "name": "Savio Fernandes",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_goa",
    "city": "Panaji",
    "state": "Goa",
    "languages": [
      "English",
      "Konkani",
      "Hindi",
      "Portuguese"
    ],
    "experienceYears": 13,
    "rating": 4.95,
    "reviewsCount": 390,
    "perDayRate": 2600,
    "specialization": "Latin Quarter Architecture & Culinary History",
    "badge": "Heritage Historian",
    "verified": true,
    "bio": "Proud resident of Fontainhas. Passionate about 450 years of Indo-Portuguese architecture, fado music, and authentic Goan recipes.",
    "highlights": [
      "Fontainhas hidden courtyard access",
      "Traditional bakeries & feni tasting",
      "Old Goa UNESCO churches"
    ],
    "availableDays": [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  },
  {
    "id": "guide_goa_02",
    "name": "Natasha Mascarenhas",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_goa",
    "city": "Margao",
    "state": "Goa",
    "languages": [
      "English",
      "Konkani",
      "Hindi"
    ],
    "experienceYears": 6,
    "rating": 4.91,
    "reviewsCount": 165,
    "perDayRate": 2100,
    "specialization": "South Goa Secret Coves & Kayaking",
    "badge": "Marine Adventure Guide",
    "verified": true,
    "bio": "PADI certified diver and kayak guide. Specializes in tranquil backwater mangrove trails and untouched southern beaches.",
    "highlights": [
      "Sal Backwater sunrise kayak",
      "Butterfly beach dolphin watch",
      "Sunset cliff photography"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_goa_03",
    "name": "Rohan D'Costa",
    "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_goa",
    "city": "Mapusa",
    "state": "Goa",
    "languages": [
      "English",
      "Konkani",
      "Marathi",
      "Hindi"
    ],
    "experienceYears": 9,
    "rating": 4.88,
    "reviewsCount": 215,
    "perDayRate": 2300,
    "specialization": "Dudhsagar Jeep Safaris & Spice Plantations",
    "badge": "Eco Safari Specialist",
    "verified": true,
    "bio": "Expert 4x4 driver and Western Ghats wildlife guide leading off-road expeditions to Dudhsagar and Bondla sanctuary.",
    "highlights": [
      "Bhagwan Mahavir sanctuary trails",
      "Jungle stream swimming spots",
      "Organic spice plantation lunch"
    ],
    "availableDays": [
      "Monday",
      "Tuesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  {
    "id": "guide_jaipur_01",
    "name": "Mahendra Singh Rathore",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_jaipur",
    "city": "Jaipur",
    "state": "Rajasthan",
    "languages": [
      "English",
      "Hindi",
      "Rajasthani",
      "French"
    ],
    "experienceYears": 16,
    "rating": 4.98,
    "reviewsCount": 480,
    "perDayRate": 2800,
    "specialization": "Amber Fort & Rajput Imperial Dynasty",
    "badge": "State Certified Gold Guide",
    "verified": true,
    "bio": "Direct descendant of Rajput nobility, certified by the Ministry of Tourism. Unveils secret tunnels and royal court legends of Amer.",
    "highlights": [
      "Amber Fort private underground chambers",
      "City Palace museum curator insights",
      "Nahargarh royal sunset history"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_jaipur_02",
    "name": "Meera Agarwal",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_jaipur",
    "city": "Jaipur",
    "state": "Rajasthan",
    "languages": [
      "English",
      "Hindi"
    ],
    "experienceYears": 7,
    "rating": 4.93,
    "reviewsCount": 210,
    "perDayRate": 2000,
    "specialization": "Johari Bazaar Gemology & Textile Block Printing",
    "badge": "Artisan Craft Curator",
    "verified": true,
    "bio": "Textile designer turned cultural walk leader. Guides authentic block-printing workshops and jewelry makers in Jaipur's walled city.",
    "highlights": [
      "Hands-on Bagru woodblock printing",
      "Authentic gemstone appraisal tips",
      "Hidden street food chaat stops"
    ],
    "availableDays": [
      "Monday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  {
    "id": "guide_jaipur_03",
    "name": "Gopal Sharma",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_jaipur",
    "city": "Jaipur",
    "state": "Rajasthan",
    "languages": [
      "English",
      "Hindi",
      "Gujarati"
    ],
    "experienceYears": 10,
    "rating": 4.89,
    "reviewsCount": 260,
    "perDayRate": 2200,
    "specialization": "Jantar Mantar Archaeo-Astronomy & Palaces",
    "badge": "Heritage Astronomer",
    "verified": true,
    "bio": "Mathematics graduate who decodes the 18th-century stone instruments of Jantar Mantar into captivating stories of timekeeping.",
    "highlights": [
      "Sundial precision reading demonstration",
      "Hawa Mahal photography vantage points",
      "Galta Ji Monkey Temple walk"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_ladakh_01",
    "name": "Stanzin Dorje",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_ladakh",
    "city": "Leh",
    "state": "Ladakh",
    "languages": [
      "English",
      "Ladakhi",
      "Hindi",
      "Tibetan"
    ],
    "experienceYears": 12,
    "rating": 4.97,
    "reviewsCount": 310,
    "perDayRate": 3200,
    "specialization": "High Passes, Monasteries & Pangong Expeditions",
    "badge": "Himalayan Expedition Leader",
    "verified": true,
    "bio": "Native of Zanskar, trained at Nehru Institute of Mountaineering. Guides high-altitude journeys with utmost safety and cultural reverence.",
    "highlights": [
      "Thiksey & Hemis monastery rituals",
      "High altitude pulse-oximetry safety",
      "Nubra Valley camel dunes camping"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_ladakh_02",
    "name": "Tsering Angmo",
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_ladakh",
    "city": "Leh",
    "state": "Ladakh",
    "languages": [
      "English",
      "Ladakhi",
      "Hindi"
    ],
    "experienceYears": 8,
    "rating": 4.94,
    "reviewsCount": 185,
    "perDayRate": 2900,
    "specialization": "Tibetan Buddhist Art & Village Homestays",
    "badge": "Cultural Anthropologist",
    "verified": true,
    "bio": "Specializes in Ladakhi womanhood, organic apricot cultivation, and Tibetan Thangka painting restoration.",
    "highlights": [
      "Alchi 11th century wall frescoes",
      "Homestay butter tea & momo cooking",
      "Eco-friendly zero plastic travel"
    ],
    "availableDays": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  },
  {
    "id": "guide_ladakh_03",
    "name": "Rigzin Namgyal",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_ladakh",
    "city": "Leh",
    "state": "Ladakh",
    "languages": [
      "English",
      "Ladakhi",
      "Hindi"
    ],
    "experienceYears": 15,
    "rating": 4.95,
    "reviewsCount": 340,
    "perDayRate": 3500,
    "specialization": "Snow Leopard Tracking & Astrophotography",
    "badge": "Wilderness Master Scout",
    "verified": true,
    "bio": "Hemis National Park expert tracker who leads wildlife enthusiasts and astrophotographers to pristine Himalayan dark-sky locations.",
    "highlights": [
      "Telescope night sky observation",
      "Hemis high altitude wildlife trail",
      "Winter snow leopard spotting routes"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_andaman_01",
    "name": "Karthik Raja",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_andaman",
    "city": "Havelock Island",
    "state": "Andaman Islands",
    "languages": [
      "English",
      "Tamil",
      "Hindi",
      "Bengali"
    ],
    "experienceYears": 9,
    "rating": 4.94,
    "reviewsCount": 275,
    "perDayRate": 2800,
    "specialization": "Marine Reef Snorkeling & Scuba Dive Escort",
    "badge": "PADI Master Diver",
    "verified": true,
    "bio": "Island native with over 3,000 recorded dives across Ritchie's Archipelago. Dedicated to coral conservation and safety.",
    "highlights": [
      "Elephant Beach coral gardens",
      "Night kayaking in bioluminescent waters",
      "Tidepool marine life walk"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_andaman_02",
    "name": "Sunita Roy",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_andaman",
    "city": "Port Blair",
    "state": "Andaman Islands",
    "languages": [
      "English",
      "Bengali",
      "Hindi"
    ],
    "experienceYears": 11,
    "rating": 4.91,
    "reviewsCount": 220,
    "perDayRate": 2400,
    "specialization": "Cellular Jail History & Ross Island Colonial Ruins",
    "badge": "Archival Historian",
    "verified": true,
    "bio": "Historian specializing in Indian freedom struggle history and the British penal colony on Ross and Viper islands.",
    "highlights": [
      "Cellular Jail in-depth archival walk",
      "Banyan tree-strangled Ross Island ruins",
      "Chidiya Tapu mangrove bird watching"
    ],
    "availableDays": [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  },
  {
    "id": "guide_varanasi_01",
    "name": "Pandit Anand Mishra",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_varanasi",
    "city": "Varanasi",
    "state": "Uttar Pradesh",
    "languages": [
      "English",
      "Hindi",
      "Sanskrit"
    ],
    "experienceYears": 18,
    "rating": 4.98,
    "reviewsCount": 520,
    "perDayRate": 2500,
    "specialization": "Ganga Aarti Rituals, Sanskrit Chants & 84 Ghats",
    "badge": "Vedic Scholar & Guide",
    "verified": true,
    "bio": "Seventh-generation priest and scholar at Dashashwamedh Ghat. Offers authentic historical and spiritual meaning behind ancient cremation and prayer rituals.",
    "highlights": [
      "Private dawn rowing boat with sitar player",
      "Kashi Vishwanath corridor sacred history",
      "Philosophical explanations of Manikarnika Ghat"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_varanasi_02",
    "name": "Shalini Tripathi",
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_varanasi",
    "city": "Varanasi",
    "state": "Uttar Pradesh",
    "languages": [
      "English",
      "Hindi"
    ],
    "experienceYears": 7,
    "rating": 4.9,
    "reviewsCount": 195,
    "perDayRate": 2100,
    "specialization": "Sarnath Buddhist Trail & Banarasi Silk Weaving",
    "badge": "Heritage Weave Curator",
    "verified": true,
    "bio": "Leads travelers into the century-old weaver communities of Madanpura and the serene stupas of Sarnath.",
    "highlights": [
      "Master weaver jacquard loom demonstration",
      "Archaeological Museum Lion Capital viewing",
      "Street food malaiyo & kachori stops"
    ],
    "availableDays": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  {
    "id": "guide_rishikesh_01",
    "name": "Yogi Arvind Joshi",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_rishikesh",
    "city": "Rishikesh",
    "state": "Uttarakhand",
    "languages": [
      "English",
      "Hindi"
    ],
    "experienceYears": 12,
    "rating": 4.95,
    "reviewsCount": 310,
    "perDayRate": 2400,
    "specialization": "Hatha Yoga, Breathwork & Beatles Ashram",
    "badge": "Yoga Alliance Certified Master",
    "verified": true,
    "bio": "Guides transformative sunrise pranayama on river beaches and shares the pop-cultural history of The Beatles in Rishikesh.",
    "highlights": [
      "Beatles Ashram murals and meditation caves",
      "Triveni Ghat Vedic Aarti meaning",
      "Riverside sound bowl meditation"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_rishikesh_02",
    "name": "Devendra Rawat",
    "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_rishikesh",
    "city": "Rishikesh",
    "state": "Uttarakhand",
    "languages": [
      "English",
      "Hindi",
      "Garhwali"
    ],
    "experienceYears": 10,
    "rating": 4.92,
    "reviewsCount": 280,
    "perDayRate": 2300,
    "specialization": "White-Water River Navigation & Cliff Trails",
    "badge": "Senior River Captain",
    "verified": true,
    "bio": "Garhwal native with over a decade of navigating Grade 4+ rapids on the Alaknanda and Bhagirathi.",
    "highlights": [
      "Safety instruction on Grade 4 rapids",
      "Hidden limestone waterfall treks",
      "Mohan Chatti cliff jump safety"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_hampi_01",
    "name": "Manjunath Gowda",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_hampi",
    "city": "Hampi",
    "state": "Karnataka",
    "languages": [
      "English",
      "Kannada",
      "Telugu",
      "Hindi"
    ],
    "experienceYears": 14,
    "rating": 4.97,
    "reviewsCount": 410,
    "perDayRate": 2500,
    "specialization": "Vijaya Vittala Musical Pillars & Stone Chariot",
    "badge": "ASI Accredited Archaeologist",
    "verified": true,
    "bio": "Archaeologist who has participated in UNESCO excavation campaigns across the Vijayanagara ruins.",
    "highlights": [
      "Acoustic secrets of the musical pillars",
      "Royal Zenana enclosure walk",
      "Matanga Hill sunrise vantage route"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_hampi_02",
    "name": "Radhika Kulkarni",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_hampi",
    "city": "Hampi",
    "state": "Karnataka",
    "languages": [
      "English",
      "Kannada",
      "Hindi",
      "Marathi"
    ],
    "experienceYears": 8,
    "rating": 4.91,
    "reviewsCount": 190,
    "perDayRate": 2200,
    "specialization": "Anegundi Mythology & Coracle River Trails",
    "badge": "Mythological Storyteller",
    "verified": true,
    "bio": "Specializes in Kishkindha folklore from the Ramayana, Tungabhadra coracle trips, and boulder climbing routes.",
    "highlights": [
      "Sanapur Lake coracle & cliff jumping",
      "Birthplace of Hanuman shrine hike",
      "Anegundi rural craft community"
    ],
    "availableDays": [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  },
  {
    "id": "guide_udaipur_01",
    "name": "Ranveer Singh Chundawat",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_udaipur",
    "city": "Udaipur",
    "state": "Rajasthan",
    "languages": [
      "English",
      "Hindi",
      "Mewari"
    ],
    "experienceYears": 12,
    "rating": 4.93,
    "reviewsCount": 320,
    "perDayRate": 2600,
    "specialization": "Lake Pichola Royalty & City Palace Hidden Courtyards",
    "badge": "Mewar Royal Historian",
    "verified": true,
    "bio": "Guides connoisseurs through 400 years of Maharana history, mirror inlays, and private rooftop viewpoints.",
    "highlights": [
      "City Palace Zenana Mahal private tour",
      "Sunset boat cruise narration",
      "Vintage car museum stories"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_manali_01",
    "name": "Sunil Thakur",
    "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_manali",
    "city": "Manali",
    "state": "Himachal Pradesh",
    "languages": [
      "English",
      "Hindi",
      "Pahari"
    ],
    "experienceYears": 11,
    "rating": 4.9,
    "reviewsCount": 265,
    "perDayRate": 2400,
    "specialization": "Solang Valley Skiing, Paragliding & Hampta Pass",
    "badge": "Alpine Ski Instructor",
    "verified": true,
    "bio": "Certified mountaineer and tandem paragliding pilot with extensive knowledge of Pir Panjal trekking trails.",
    "highlights": [
      "Tandem paragliding guidance",
      "Jogini Waterfall forest hike",
      "Atal Tunnel & Sissu glacier tour"
    ],
    "availableDays": [
      "Everyday"
    ]
  },
  {
    "id": "guide_alleppey_01",
    "name": "Jacob Varghese",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    "destinationId": "dest_alleppey",
    "city": "Alleppey",
    "state": "Kerala",
    "languages": [
      "English",
      "Malayalam",
      "Tamil"
    ],
    "experienceYears": 15,
    "rating": 4.96,
    "reviewsCount": 370,
    "perDayRate": 2400,
    "specialization": "Narrow Village Canal Canoeing & Duck Farming",
    "badge": "Master Canoe Captain",
    "verified": true,
    "bio": "Paddles traditional country canoes through shallow interior canals where large houseboats cannot reach.",
    "highlights": [
      "Narrow canal hand-paddled tour",
      "Traditional tod-shack seafood tasting",
      "Kuttanad below sea level farming"
    ],
    "availableDays": [
      "Everyday"
    ]
  }
];

export const ACTIVITIES = [
  {
    "id": "act_01",
    "destinationId": "dest_munnar",
    "destinationName": "Munnar",
    "title": "Kolukkumalai Sunrise 4x4 Jeep Safari",
    "category": "Adventure Trek",
    "duration": "4 Hours",
    "price": 1800,
    "rating": 4.95,
    "reviewsCount": 420,
    "image": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "4x4 Jeep Ride",
      "Estate Guide",
      "Hot Freshly Brewed Tea at Peak"
    ],
    "description": "Rugged pre-dawn 4x4 drive up to 7,900 ft at Kolukkumalai, the world's highest organic tea plantation, to witness sunrise above the clouds."
  },
  {
    "id": "act_02",
    "destinationId": "dest_munnar",
    "destinationName": "Munnar",
    "title": "Eravikulam Nilgiri Tahr Wildlife Safari",
    "category": "Wildlife",
    "duration": "3 Hours",
    "price": 650,
    "rating": 4.88,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Park Safari Bus Pass",
      "Naturalist Escort",
      "Viewpoint Access"
    ],
    "description": "Spot the endangered mountain goat Nilgiri Tahr roaming among the rolling grassy shola hills and Anamudi mountain backdrop."
  },
  {
    "id": "act_03",
    "destinationId": "dest_munnar",
    "destinationName": "Munnar",
    "title": "Artisan Tea Plucking & Factory Sommelier Tasting",
    "category": "Cultural & Gourmet",
    "duration": "2.5 Hours",
    "price": 850,
    "rating": 4.86,
    "reviewsCount": 260,
    "image": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Plucking Basket & Apron",
      "Factory Processing Tour",
      "5-Course Tea Tasting"
    ],
    "description": "Learn two-leaves-and-a-bud hand plucking from veteran estate workers and taste premium White, Green, Oolong, and Orthodox black teas."
  },
  {
    "id": "act_04",
    "destinationId": "dest_goa",
    "destinationName": "Goa",
    "title": "Fontainhas Latin Quarter Architectural Heritage Walk",
    "category": "Heritage",
    "duration": "2 Hours",
    "price": 750,
    "rating": 4.93,
    "reviewsCount": 390,
    "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Certified Historian Guide",
      "Traditional Goan Bakery Stop",
      "Map of Heritage Sites"
    ],
    "description": "Wander through cobblestone lanes lined with pastel-colored Portuguese mansions, wrought-iron balconies, and tiled street plaques."
  },
  {
    "id": "act_05",
    "destinationId": "dest_goa",
    "destinationName": "Goa",
    "title": "Scuba Diving & Dolphin Cruise at Grand Island",
    "category": "Water Sports",
    "duration": "6 Hours",
    "price": 2499,
    "rating": 4.89,
    "reviewsCount": 510,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "Boat Cruise with Dolphin Spotting",
      "PADI Certified Instructor Dive",
      "Buffet Lunch on Island Beach"
    ],
    "description": "Glide underwater alongside vibrant parrotfish, corals, and marine life followed by beach volleyball and lunch at secluded monkey beach."
  },
  {
    "id": "act_06",
    "destinationId": "dest_goa",
    "destinationName": "Goa",
    "title": "Dudhsagar Jungle Jeep Safari & Waterfall Dip",
    "category": "Adventure Trek",
    "duration": "7 Hours",
    "price": 1950,
    "rating": 4.91,
    "reviewsCount": 440,
    "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "Sanctuary Jeep Entry",
      "Life Jacket for Pool",
      "Spice Plantation Buffet Lunch"
    ],
    "description": "Exciting 4x4 stream crossings through Bhagwan Mahavir Wildlife Sanctuary reaching the four-tiered milky falls for a swim."
  },
  {
    "id": "act_07",
    "destinationId": "dest_jaipur",
    "destinationName": "Jaipur",
    "title": "Amber Fort Royal Citadel & Mirror Palace Exploration",
    "category": "Heritage",
    "duration": "3 Hours",
    "price": 900,
    "rating": 4.94,
    "reviewsCount": 620,
    "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Fast-Track Monument Entry",
      "ASI Certified Guide",
      "Access to Sheesh Mahal"
    ],
    "description": "Explore the magnificent hilltop Amer palace, intricately carved Diwan-i-Aam, and thousand-mirror Sheesh Mahal."
  },
  {
    "id": "act_08",
    "destinationId": "dest_jaipur",
    "destinationName": "Jaipur",
    "title": "Nahargarh Sunrise Ridge Cycling Tour",
    "category": "Outdoor Activity",
    "duration": "3 Hours",
    "price": 1200,
    "rating": 4.92,
    "reviewsCount": 290,
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "Geared Mountain Bike & Helmet",
      "Cycle Guide & Support Car",
      "Breakfast at Padao Cafe"
    ],
    "description": "Ride through scenic curves of Aravalli hills up to the ramparts of Nahargarh Fort as morning golden light covers Jaipur."
  },
  {
    "id": "act_09",
    "destinationId": "dest_jaipur",
    "destinationName": "Jaipur",
    "title": "Bagru Natural Dye & Hand Block Printing Workshop",
    "category": "Artisan Craft",
    "duration": "3.5 Hours",
    "price": 1400,
    "rating": 4.96,
    "reviewsCount": 230,
    "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Master Artisan Guidance",
      "Natural Vegetable Dyes",
      "Take-Home Custom Cotton Scarf"
    ],
    "description": "Work with 5th-generation Chipper printers carving teakwood blocks and stamping pure cotton fabrics using indigo and turmeric dyes."
  },
  {
    "id": "act_10",
    "destinationId": "dest_ladakh",
    "destinationName": "Ladakh",
    "title": "Pangong Tso Dark Sky Stargazing Camp",
    "category": "Astronomy & Nature",
    "duration": "Overnight",
    "price": 4500,
    "rating": 4.98,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "Heated Canvas Tent Stay",
      "Telescope Observation Session",
      "Warm Dinner & Breakfast"
    ],
    "description": "Zero light pollution at 14,270 ft reveals vivid Milky Way arms, nebulas, and shooting stars mirrored on Pangong Lake."
  },
  {
    "id": "act_11",
    "destinationId": "dest_ladakh",
    "destinationName": "Ladakh",
    "title": "Khardung La Pass Mountain Biking Descent",
    "category": "Extreme Adventure",
    "duration": "4 Hours",
    "price": 2800,
    "rating": 4.9,
    "reviewsCount": 180,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Challenging",
    "includes": [
      "Downhill Hydraulic Disc Brake MTB",
      "Protective Body Armor & Helmet",
      "Backup Safety Van with Oxygen"
    ],
    "description": "Exhilarating 38 km pure downhill mountain bike ride from the 17,982 ft pass all the way down into Leh valley."
  },
  {
    "id": "act_12",
    "destinationId": "dest_ladakh",
    "destinationName": "Ladakh",
    "title": "Thiksey Monastery Sunrise Chants & Meditation",
    "category": "Spiritual Culture",
    "duration": "2.5 Hours",
    "price": 600,
    "rating": 4.97,
    "reviewsCount": 350,
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Monastery Entry Contribution",
      "Tibetan Butter Tea with Monks",
      "Guide Narration"
    ],
    "description": "Join hundreds of Buddhist monks blowing conch shells and chanting ancient mantras in the golden prayer hall at dawn."
  },
  {
    "id": "act_13",
    "destinationId": "dest_andaman",
    "destinationName": "Andaman & Nicobar",
    "title": "Scuba Diving in Live Coral Gardens at Elephant Beach",
    "category": "Marine Adventure",
    "duration": "3 Hours",
    "price": 3500,
    "rating": 4.95,
    "reviewsCount": 380,
    "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "Full Scuba Gear & Tank",
      "1-on-1 Certified Divemaster",
      "Undersea High-Res Photos & Video"
    ],
    "description": "Dive down to 12 meters into pristine waters teeming with clownfish, sea turtles, rays, and brain corals."
  },
  {
    "id": "act_14",
    "destinationId": "dest_andaman",
    "destinationName": "Andaman & Nicobar",
    "title": "Bioluminescent Night Kayaking in Mangrove Coves",
    "category": "Eco Adventure",
    "duration": "2 Hours",
    "price": 2200,
    "rating": 4.96,
    "reviewsCount": 240,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Ocean Kayak & Carbon Paddle",
      "Life Jacket & Glow Sticks",
      "Guide Escort"
    ],
    "description": "Paddle into midnight coves of Havelock where every stroke of your paddle ignites glowing neon blue phytoplankton."
  },
  {
    "id": "act_15",
    "destinationId": "dest_andaman",
    "destinationName": "Andaman & Nicobar",
    "title": "Cellular Jail Sound & Light Memorial Experience",
    "category": "Heritage",
    "duration": "2 Hours",
    "price": 350,
    "rating": 4.92,
    "reviewsCount": 470,
    "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Entry Pass to Memorial Cells",
      "VIP Courtyard Seating",
      "Historic Audio-Visual Narration"
    ],
    "description": "Moving tribute to India's freedom fighters imprisoned in Kala Pani with dramatic narration voiced under the historic Peepal tree."
  },
  {
    "id": "act_16",
    "destinationId": "dest_varanasi",
    "destinationName": "Varanasi",
    "title": "Subah-e-Banaras Sunrise Boat Ride on River Ganga",
    "category": "Spiritual Culture",
    "duration": "2.5 Hours",
    "price": 850,
    "rating": 4.98,
    "reviewsCount": 580,
    "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Private Hand-Rowed Wooden Boat",
      "Live Flute Recital Onboard",
      "Flower Diya Float Offering"
    ],
    "description": "Drift past 84 sacred ghats at first light listening to temple bells, morning prayers, and classical flute notes."
  },
  {
    "id": "act_17",
    "destinationId": "dest_varanasi",
    "destinationName": "Varanasi",
    "title": "Dashashwamedh Evening Maha Aarti VIP Boat View",
    "category": "Spiritual Ritual",
    "duration": "2 Hours",
    "price": 1100,
    "rating": 4.96,
    "reviewsCount": 650,
    "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Reserved Moored Boat Vantage",
      "Traditional Masala Chai",
      "Priest Blessing Ceremony"
    ],
    "description": "Witness seven young priests perform synchronized fire rituals with heavy brass lamps honoring Mother Ganga."
  },
  {
    "id": "act_18",
    "destinationId": "dest_varanasi",
    "destinationName": "Varanasi",
    "title": "Old City Alleyways & Banarasi Street Food Trail",
    "category": "Culinary Walk",
    "duration": "2.5 Hours",
    "price": 750,
    "rating": 4.91,
    "reviewsCount": 340,
    "image": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Local Foodie Guide",
      "Tasting of 6 Iconic Delicacies",
      "Bottled Water & Paan"
    ],
    "description": "Savor crispy kachori sabzi, winter malaiyo, Blue Lassi with dry fruits, and authentic Banarasi Meetha Paan."
  },
  {
    "id": "act_19",
    "destinationId": "dest_rishikesh",
    "destinationName": "Rishikesh",
    "title": "Marine Drive to Rishikesh 24 km White-Water Rafting",
    "category": "White-Water Rafting",
    "duration": "4.5 Hours",
    "price": 1750,
    "rating": 4.95,
    "reviewsCount": 520,
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "Grade 3 & 4 Rapid Descent",
      "Certified River Guide & Safety Kayak",
      "Cliff Jump & Body Surfing Session"
    ],
    "description": "Conquer legendary rapids like 'The Wall', 'Three Blind Mice', 'Crossfire', and 'Roller Coaster' on emerald waters."
  },
  {
    "id": "act_20",
    "destinationId": "dest_rishikesh",
    "destinationName": "Rishikesh",
    "title": "83-Meter Bungee Jumping at Mohan Chatti",
    "category": "Extreme Adventure",
    "duration": "2 Hours",
    "price": 3700,
    "rating": 4.94,
    "reviewsCount": 380,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Extreme",
    "includes": [
      "Jump from Fixed Cantilever Platform",
      "Jump Certificate & Dare to Jump Badge",
      "Safety Harness by NZ Jump Masters"
    ],
    "description": "India's highest bungee jump platform over the rocky riverbed of Hall river, operated under New Zealand safety standards."
  },
  {
    "id": "act_21",
    "destinationId": "dest_rishikesh",
    "destinationName": "Rishikesh",
    "title": "The Beatles Ashram Historic Walk & Sound Bath",
    "category": "Music & Wellness",
    "duration": "2.5 Hours",
    "price": 650,
    "rating": 4.9,
    "reviewsCount": 320,
    "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Forest Dept Park Entry",
      "Pop Historian Guide",
      "Acoustic Meditation Cave Visit"
    ],
    "description": "Walk through Maharishi Mahesh Yogi's ashram where The Beatles wrote the White Album in 1968, admiring psychedelic murals."
  },
  {
    "id": "act_22",
    "destinationId": "dest_hampi",
    "destinationName": "Hampi",
    "title": "Matanga Hill Sunrise Bouldering & Temple Panorama",
    "category": "Trekking & Photography",
    "duration": "2.5 Hours",
    "price": 500,
    "rating": 4.96,
    "reviewsCount": 410,
    "image": "https://images.unsplash.com/photo-1600100397608-f010f443818e?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "Local Trek Escort",
      "Flashlight for Pre-Dawn Steps",
      "Summit Coconut Water"
    ],
    "description": "Climb the highest point in central Hampi for a breathtaking 360-degree vista of Virupaksha temple, boulder hills, and river."
  },
  {
    "id": "act_23",
    "destinationId": "dest_hampi",
    "destinationName": "Hampi",
    "title": "Tungabhadra River Coracle Boat Whirlpool Ride",
    "category": "River Boating",
    "duration": "1.5 Hours",
    "price": 600,
    "rating": 4.88,
    "reviewsCount": 290,
    "image": "https://images.unsplash.com/photo-1600100397608-f010f443818e?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Circular Wicker Coracle Boat",
      "Boatman Navigation",
      "Life Jacket"
    ],
    "description": "Spin gracefully in a circular bamboo coracle through river gorges and stop at ancient rock carvings carved into granite boulders."
  },
  {
    "id": "act_24",
    "destinationId": "dest_udaipur",
    "destinationName": "Udaipur",
    "title": "Lake Pichola Royal Sunset Boat Cruise & Jag Mandir",
    "category": "Heritage Cruise",
    "duration": "2 Hours",
    "price": 1250,
    "rating": 4.95,
    "reviewsCount": 460,
    "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Luxury Motorboat Cruise",
      "Jag Mandir Island Entry",
      "Sunset Photo Vantage"
    ],
    "description": "Glide past the marble walls of City Palace, Lake Palace hotel, and alight on the island palace of Jag Mandir."
  },
  {
    "id": "act_25",
    "destinationId": "dest_manali",
    "destinationName": "Manali",
    "title": "Solang Valley Tandem High-Fly Paragliding",
    "category": "Extreme Adventure",
    "duration": "1.5 Hours",
    "price": 2400,
    "rating": 4.91,
    "reviewsCount": 490,
    "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "Tandem Flight with Certified Pilot",
      "Glider Equipment & Safety Harness",
      "GoPro Aerial Video Footage"
    ],
    "description": "Launch from 8,000 ft and soar for 15-20 minutes above snow-clad Pir Panjal peaks and green deodar cedar canopies."
  },
  {
    "id": "act_26",
    "destinationId": "dest_alleppey",
    "destinationName": "Alleppey",
    "title": "Village Canal Hand-Paddled Canoe Tour",
    "category": "Eco Backwaters",
    "duration": "3 Hours",
    "price": 850,
    "rating": 4.94,
    "reviewsCount": 380,
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Narrow Country Canoe",
      "Local Villager Oarsman",
      "Tender Coconut & Banana Fritters"
    ],
    "description": "Quietly navigate shallow village waterways where kingfishers dart and ducks paddle beside traditional Kerala homesteads."
  },
  {
    "id": "act_27",
    "destinationId": "dest_coorg",
    "destinationName": "Coorg",
    "title": "Coffee Plantation Cupping & Roasting Masterclass",
    "category": "Gourmet Workshop",
    "duration": "2.5 Hours",
    "price": 950,
    "rating": 4.89,
    "reviewsCount": 270,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Plantation Walk",
      "Live Roasting Demonstration",
      "Tasting of 4 Single-Origin Arabicas"
    ],
    "description": "Learn how shade-grown arabica and robusta are harvested, depulped, sun-dried, and roasted to release rich chocolatey notes."
  },
  {
    "id": "act_28",
    "destinationId": "dest_ooty",
    "destinationName": "Ooty",
    "title": "UNESCO Nilgiri Mountain Toy Train Steam Ride",
    "category": "Heritage Train",
    "duration": "3.5 Hours",
    "price": 550,
    "rating": 4.93,
    "reviewsCount": 420,
    "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Confirmed First Class Ticket",
      "Window Seat Guaranteed",
      "Heritage Route Commentary"
    ],
    "description": "Century-old Swiss rack-and-pinion steam railway chugging through 250 bridges and 16 tunnels across blue Nilgiri mountains."
  },
  {
    "id": "act_29",
    "destinationId": "dest_jaisalmer",
    "destinationName": "Jaisalmer",
    "title": "Sam Sand Dunes 4x4 Dune Bashing & Camel Safari",
    "category": "Desert Adventure",
    "duration": "4 Hours",
    "price": 1600,
    "rating": 4.92,
    "reviewsCount": 390,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "4x4 Dune Bashing in Thar",
      "Camel Ride to Sunset Point",
      "Rajasthani Evening Chai & Snacks"
    ],
    "description": "Experience rollercoaster thrills across shifting sand dunes followed by a peaceful camel caravan into golden sunset."
  },
  {
    "id": "act_30",
    "destinationId": "dest_meghalaya",
    "destinationName": "Meghalaya",
    "title": "Nongriat Double-Decker Living Root Bridge Trek",
    "category": "Jungle Trekking",
    "duration": "6 Hours",
    "price": 1800,
    "rating": 4.97,
    "reviewsCount": 340,
    "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Challenging",
    "includes": [
      "Khasi Community Trek Guide",
      "Bamboo Trekking Stick",
      "Natural Rainbow Falls Swim Stop"
    ],
    "description": "Descend 3,500 stone steps into subtropical rainforest to cross twin living bridges crafted from rubber tree roots over 200 years."
  },
  {
    "id": "act_31",
    "destinationId": "dest_amritsar",
    "destinationName": "Amritsar",
    "title": "Golden Temple Langar Community Kitchen Volunteering",
    "category": "Selfless Service & Culture",
    "duration": "2 Hours",
    "price": 0,
    "rating": 4.99,
    "reviewsCount": 780,
    "image": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Easy",
    "includes": [
      "Head Scarf Covering",
      "Guided Volunteer Briefing",
      "Langar Holy Meal Together"
    ],
    "description": "Roll fresh rotis, stir giant dal cauldrons, or wash utensils alongside pilgrims in the world's greatest kitchen serving 100,000 free meals daily."
  },
  {
    "id": "act_32",
    "destinationId": "dest_kaziranga",
    "destinationName": "Kaziranga",
    "title": "Central Range Dawn Rhino & Elephant Safari",
    "category": "Wildlife Safari",
    "duration": "3.5 Hours",
    "price": 2100,
    "rating": 4.96,
    "reviewsCount": 310,
    "image": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    "difficulty": "Moderate",
    "includes": [
      "Dawn Elephant Back Safari",
      "Open 4x4 Jeep Safari",
      "Forest Armed Guard Escort"
    ],
    "description": "Track the Great One-Horned Rhinoceros, wild water buffalo, and hornbills through misty elephant grass of Kohora range."
  }
];
