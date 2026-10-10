// Check if script already loaded
(function() {
    // Destinations Master Database
    const destinationsMasterDB = {
        'Munnar': {
            name: 'Munnar',
            state: 'Kerala',
            heroTitle: 'Munnar — Kashmir of South India',
            tag: 'Hill Station',
            safety: '8.8 / 10',
            rating: '4.8',
            reviews: '(2,450 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop',
            lead: 'Rolling emerald tea plantations, misty valleys, and the home of the endangered Nilgiri Tahr in the Western Ghats.',
            overview: 'Situated at 1,600 metres above sea level, Munnar was once the summer resort of the British Government in South India. Today it is renowned for its vast expanse of tea gardens, colonial bungalows, aromatic spice trails, and pristine trekking routes like Anamudi (South India\'s highest peak).',
            gallery: [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Tea Garden Trails, Museum & Lockhart Sunset', desc: 'Arrive in Munnar, check in to your hillside stay, explore the colonial KDHP Tea Museum machinery, and take an evening walk through the aromatic Lockhart Tea Estate ridge.' },
                { title: 'Day 2: Eravikulam National Park Safari & Mattupetty Boating', desc: 'Morning safari to spot the endangered Nilgiri Tahr mountain ibex at Rajamalai, followed by pure veg sadhya and speedboating at Mattupetty Dam & Echo Point.' },
                { title: 'Day 3: Kolukkumalai Sunrise 4x4 & Top Station Border Cliff', desc: 'Early 5 AM rugged jeep safari ascending to the highest organic tea estate in the world (7,900 ft), followed by Karimeen Pollichathu lunch and Top Station vistas.' },
                { title: 'Day 4: Attukad Waterfalls & Punarjani Kathakali Martial Arts', desc: 'Trek across forest suspension bridges at Attukad Falls, sample authentic Malabar dum biryani, and attend a mesmerizing live Kathakali & Kalaripayattu performance.' }
            ],
            foods: [
                { icon: '🥞', title: 'Appam & Vegetable / Chicken Stew', desc: 'Fermented fluffy rice hoppers with fragrant coconut milk & cardamom infusion.', badge: 'Breakfast Staple' },
                { icon: '🫓', title: 'Malabar Parotta & Kerala Beef / Egg Roast', desc: 'Flaky layered flatbread served with slow-cooked roasted curry leaves and spices.', badge: 'Local Legend' },
                { icon: '🐟', title: 'Karimeen Pollichathu & Tapioca Kappa', desc: 'Pearl spot fish marinated in spicy shallots, wrapped in banana leaf and pan-roasted.', badge: 'Kerala Coast' },
                { icon: '☕', title: 'Freshly Brewed Estate Cardamom Tea', desc: 'High-grown organic tea leaves brewed with freshly crushed high-range green cardamom pods.', badge: 'KDHP Fresh' }
            ],
            gems: [
                { title: 'Kolukkumalai 4x4 Offroad Trek', tag: '7,900 ft', desc: 'World\'s highest tea estate. Accessible only by 4x4 jeeps across 17 km of boulder trails. Legendary cloud-inversion sunrises.' },
                { title: 'Chokramudi Peak Wilderness', tag: 'Hidden Trail', desc: 'Lesser-known solitary hike through shola forests and misty ridges without the tourist crowds of Rajamalai.' }
            ],
            hotels: [
                { name: 'Munnar Tea Country Resort', price: 5400, rating: '4.8', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Chithirapuram · Munnar', amenities: ['Valley View', 'Spa', 'Breakfast Free'], roomType: 'Valley View Deluxe Cottage', inclusions: 'Breakfast Buffet, Tea Tasting, WiFi' },
                { name: 'Fragrant Nature Munnar', price: 7200, rating: '4.9', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Pothamedu Ridge · Munnar', amenities: ['Fireplace', 'Infinity Pool', 'Ayurveda Spa'], roomType: 'Ocean of Mist Luxury Suite', inclusions: 'Fireplace, Gourmet Breakfast, Heated Pool' },
                { name: 'Blanket Hotel & Spa', price: 8900, rating: '4.9', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop', location: 'Attukad Falls Road · Munnar', amenities: ['Waterfall View', 'Heated Pool', 'Fine Dining'], roomType: 'Premier Waterfall Jacuzzi Suite', inclusions: 'Buffet Breakfast, Waterfall Trek, Spa Access' }
            ],
            facts: { season: 'September to March (15°C – 25°C)', airport: 'Cochin International (COK) — 110 km', duration: '4 Days · 3 Nights', safety: '8.8 / 10 · High Safety Rating', mapRoute: 'Town Center → KDHP Museum → Mattupetty → Top Station' }
        },
        'Jaipur': {
            name: 'Jaipur',
            state: 'Rajasthan',
            heroTitle: 'Jaipur — The Royal Pink City of Forts & Palaces',
            tag: 'Royal Heritage',
            safety: '8.6 / 10',
            rating: '4.8',
            reviews: '(3,100 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1920&auto=format&fit=crop',
            lead: 'Majestic Rajput fortresses, terracotta pink sandstone facades, ornate royal havelis, and vibrant artisanal bazaars.',
            overview: 'Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is India\'s first planned heritage city. From the clifftop ramparts of Amber Fort and the honeycombed screens of Hawa Mahal to the astronomical instruments at Jantar Mantar, Jaipur embodies the golden age of Rajput valor and opulent artistry.',
            gallery: [
                'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1605649487212-47bdab064df8?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Amber Fort Royalty & Jal Mahal Lake Sunset', desc: 'Ascend the cobbled paths to Amber Palace, marvel at the Sheesh Mahal mirror mosaics, and watch the sun dip behind Jal Mahal palace floating on Man Sagar Lake.' },
                { title: 'Day 2: Hawa Mahal Facade & City Palace Royal Courtyards', desc: 'Photograph the 953 jharokha windows of Hawa Mahal, explore the Chandra Mahal royal residence, and decipher the giant sundials at Jantar Mantar.' },
                { title: 'Day 3: Nahargarh Fort Panoramic Ridge & Johari Bazaar Gems', desc: 'Enjoy scenic hilltop views over the Pink City at Nahargarh, feast on spicy Pyaaz Kachoris, and explore Johari Bazaar for block-print textiles and blue pottery.' },
                { title: 'Day 4: Jaigarh Cannon Ramparts & Chokhi Dhani Cultural Night', desc: 'Visit the world\'s largest wheeled cannon (Jaivana) at Jaigarh Fort, followed by traditional Rajasthani folk dances, puppet shows, and Dal Baati Churma at Chokhi Dhani.' }
            ],
            foods: [
                { icon: '🍲', title: 'Dal Baati Churma with Pure Ghee', desc: 'Baked wheat balls soaked in desi ghee, served with spiced lentils and sweet jaggery churma.', badge: 'Royal Signature' },
                { icon: '🥟', title: 'Crispy Pyaaz Kachori at Rawat Mishtan', desc: 'Flaky deep-fried pastry stuffed with spiced onion filling, served with mint and tamarind chutney.', badge: 'Morning Street Staple' },
                { icon: '🍖', title: 'Royal Laal Maas', desc: 'Slow-cooked tender lamb curry infused with fiery Mathania red chilies and whole spices.', badge: 'Rajput Heritage' },
                { icon: '🍮', title: 'Honeycomb Ghewar & Malpua', desc: 'Traditional disc-shaped sweet soaked in saffron sugar syrup and topped with rich rabri and almonds.', badge: 'Festival Sweet' }
            ],
            gems: [
                { title: 'Nahargarh Stepwell (Baori)', tag: 'Architectural Gem', desc: 'Intricate subterranean water reservoir featured in classical movies, offering golden-hour views of the Aravalli hills.' },
                { title: 'Galta Ji Sun Temple (Monkey Temple)', tag: 'Sacred Gorge', desc: 'Historic temple complex built into a mountain pass with natural sacred water springs and playful macaque troops.' }
            ],
            hotels: [
                { name: 'The Heritage Haveli Palace', price: 6800, rating: '4.9', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Civil Lines · Jaipur', amenities: ['Royal Suite', 'Courtyard Pool', 'Folk Evenings'], roomType: 'Maharaja Heritage Suite', inclusions: 'Royal Breakfast, Haveli Heritage Walk, WiFi' },
                { name: 'Alsisar Haveli Boutique Stay', price: 5200, rating: '4.8', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Sansar Chandra Road · Jaipur', amenities: ['Carved Arches', 'Swimming Pool', 'Puppet Shows'], roomType: 'Deluxe Heritage Room', inclusions: 'Buffet Breakfast, Evening Tea & Snacks' },
                { name: 'Fairmont Jaipur Luxury Resort', price: 12500, rating: '4.9', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', location: 'Riico Kukas · Jaipur', amenities: ['Palatial Architecture', 'Royal Spa', 'High Tea'], roomType: 'Signature Royal Palace Suite', inclusions: 'Champagne Breakfast, Royal Butler, Spa Credit' }
            ],
            facts: { season: 'October to March (12°C – 28°C)', airport: 'Jaipur International Airport (JAI) — 12 km', duration: '3 Days · 2 Nights', safety: '8.6 / 10 · High Safety Rating', mapRoute: 'Amber Fort → Jal Mahal → Hawa Mahal → City Palace → Nahargarh' }
        },
        'Goa': {
            name: 'Goa',
            state: 'Goa',
            heroTitle: 'Goa — Tropical Sands, Heritage Forts & Coastal Vibe',
            tag: 'Coastal Paradise',
            safety: '8.9 / 10',
            rating: '4.9',
            reviews: '(4,200 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1920&auto=format&fit=crop',
            lead: 'Sun-drenched golden beaches, Portuguese colonial Latin Quarters, vibrant seaside shacks, and thrilling water adventures.',
            overview: 'Goa blends European heritage with carefree coastal lifestyle. From the historic churches of Old Goa and rugged clifftop fortresses of Chapora and Aguada to secret south Goa coves like Palolem and Butterfly Beach, Goa is India\'s premier beach sanctuary.',
            gallery: [
                'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: North Goa Beaches & Fort Aguada Sunset', desc: 'Check in to your beachside resort, explore Sinquerim and Candolim coast, tour the Portuguese Fort Aguada lighthouse, and relax at a sunset beach shack.' },
                { title: 'Day 2: Fontainhas Heritage Walk & Catamaran Cruise', desc: 'Stroll past colorful yellow and indigo colonial villas in Panaji\'s Latin Quarter, followed by evening river cruising along the Mandovi.' },
                { title: 'Day 3: South Goa Tranquility & Palolem Kayaking', desc: 'Escape to South Goa, kayak around Palolem\'s sheltered bay, take a wooden motorboat to Butterfly Beach, and dine on fresh seafood.' },
                { title: 'Day 4: Dudhsagar Waterfall 4x4 Jeep Safari', desc: 'Take an adventurous jungle jeep safari through Bhagwan Mahavir Wildlife Sanctuary to the majestic multi-tiered Dudhsagar Waterfalls.' }
            ],
            foods: [
                { icon: '🥘', title: 'Goan Prawn Curry with Rice', desc: 'Fresh prawns simmered in creamy coconut milk, fiery red chilies, and tangy kokum extract.', badge: 'Coastal Icon' },
                { icon: '🍛', title: 'Pork / Chicken Vindaloo', desc: 'Traditional Portuguese-influenced slow-cooked curry infused with malt vinegar, garlic, and Kashmiri red chilies.', badge: 'Heritage Recipe' },
                { icon: '🥞', title: 'Bebinca Layered Coconut Pudding', desc: 'Traditional Indo-Portuguese dessert with alternating layers of coconut milk, egg yolk, and caramelized sugar.', badge: 'Goan Dessert' },
                { icon: '🍹', title: 'Chilled Tender Coconut Feni Cocktail', desc: 'Refreshing local cashew or coconut spirit cocktail garnished with lime and mint leaves.', badge: 'Beachside Sip' }
            ],
            gems: [
                { title: 'Cabo de Rama Fort Ridge', tag: 'South Goa Cliff', desc: 'Secluded ancient cliff fortress commanding panoramic 360-degree views of the turquoise Arabian Sea.' },
                { title: 'Devil\'s Canyon (Devcharacho Gund)', tag: 'Hidden Gorge', desc: 'Curious underwater river gorge nestled deep inside the dense Mollem national park canopy.' }
            ],
            hotels: [
                { name: 'South Goa Beachfront Villa', price: 8200, rating: '4.9', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop', location: 'Palolem Beach · South Goa', amenities: ['Private Beach', 'Infinity Pool', 'Seafood Grill'], roomType: 'Ocean Villa with Plunge Pool', inclusions: 'Breakfast, Catamaran Sunset Cruise, WiFi' },
                { name: 'Heritage Village Resort & Spa', price: 6100, rating: '4.7', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop', location: 'Arossim Beach · Cansaulim', amenities: ['Ayurvedic Spa', 'Sea View', 'Live Music'], roomType: 'Grand Heritage Club Room', inclusions: 'Buffet Breakfast & Dinner, Spa Discount' },
                { name: 'W Goa Luxury Coastal Retreat', price: 14500, rating: '4.9', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Vagator Beach · North Goa', amenities: ['Clifftop Rock Pool', 'Spa', 'Sunset DJ'], roomType: 'Marvelous Suite with Balcony', inclusions: 'Breakfast Buffet, Rock Pool Access, High Tea' }
            ],
            facts: { season: 'November to February (22°C – 32°C)', airport: 'Goa Dabolim / Manohar Mopa (GOX) — 28 km', duration: '4 Days · 3 Nights', safety: '8.9 / 10 · Very High Safety Rating', mapRoute: 'Panaji → Fontainhas → Aguada → Anjuna → Palolem' }
        },
        'Ladakh': {
            name: 'Leh Ladakh',
            state: 'Jammu & Kashmir',
            heroTitle: 'Leh Ladakh — The Moonland of High Mountain Passes',
            tag: 'High Altitude',
            safety: '9.3 / 10',
            rating: '4.9',
            reviews: '(1,500 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1920&auto=format&fit=crop',
            lead: 'Stark snow-dusted Himalayan peaks, cobalt blue Pangong Tso lake, double-humped camel dunes in Nubra, and centuries-old Tibetan gompas.',
            overview: 'Nestled between the Kunlun mountain range and the Great Himalayas, Ladakh is a world apart. Experience the pristine high-altitude deserts, prayer flags fluttering over Khardung La (17,582 ft), and ancient monasteries like Thiksey and Hemis.',
            gallery: [
                'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Acclimatization in Leh & Shanti Stupa Sunset', desc: 'Arrive at Kushok Bakula Rimpochee Airport (11,500 ft), rest for altitude adjustment, and take an evening walk up to Shanti Stupa overlooking Leh valley.' },
                { title: 'Day 2: Sham Valley, Magnetic Hill & Sangam Confluence', desc: 'Drive to the magnetic hill optical illusion, Gurudwara Pathar Sahib, and the dramatic confluence of the emerald Indus and muddy Zanskar rivers.' },
                { title: 'Day 3: Khardung La Pass & Nubra Valley Sand Dunes', desc: 'Cross Khardung La pass (17,582 ft), descend into Nubra Valley, explore Diskit Monastery giant Buddha statue, and ride double-humped Bactrian camels at Hunder.' },
                { title: 'Day 4: Pangong Tso Lake Turquoise Wonders', desc: 'Travel through Chang La pass to the mesmerizing Pangong Lake that changes colors from azure to turquoise under the clear alpine sky.' }
            ],
            foods: [
                { icon: '🍜', title: 'Steaming Thukpa Noodle Soup', desc: 'Hearty Tibetan hand-pulled noodles in a hot, aromatic vegetable or mutton broth with local herbs.', badge: 'Himalayan Warmth' },
                { icon: '🥟', title: 'Authentic Steamed Tingmo & Momos', desc: 'Fluffy flower-shaped steamed buns served with fiery spicy chili dip and savory vegetable stuffing.', badge: 'Monastery Favorite' },
                { icon: '☕', title: 'Traditional Butter Tea (Gur Gur Chai)', desc: 'Brewed black tea churned with yak butter, milk, and salt in a wooden cylinder.', badge: 'Altitude Essential' },
                { icon: '🍲', title: 'Skyu Traditional Stew', desc: 'Thumb-pressed wheat flour dough nuggets simmered with root vegetables and dried mountain mutton.', badge: 'Ancient Ladakhi Dish' }
            ],
            gems: [
                { title: 'Tso Moriri High-Altitude Wetland', tag: '14,836 ft', desc: 'Untouched pristine lake in Changthang plateau, sanctuary to black-necked cranes and Tibetan wild asses (Kiang).' },
                { title: 'Turtuk Village Border Oasis', tag: 'Balti Culture', desc: 'India\'s northernmost border village famed for sweet apricot orchards and unique Baltistan wooden architecture.' }
            ],
            hotels: [
                { name: 'The Grand Dragon Ladakh', price: 9500, rating: '4.9', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop', location: 'Old Road · Sheynam, Leh', amenities: ['Heated Rooms', 'Mountain View', 'Oxygen Backup'], roomType: 'Deluxe Heritage Mountain Suite', inclusions: 'Buffet Breakfast, Oxygen Concentrator in Room, Airport Transfer' },
                { name: 'Nubra Valley Organic Retreat', price: 5800, rating: '4.8', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop', location: 'Hunder Sand Dunes · Nubra', amenities: ['Organic Farm', 'Glamping Tents', 'Star Gazing'], roomType: 'Luxury Swiss Glamping Cottage', inclusions: 'Farm-to-Table Breakfast & Dinner, Bonfire' },
                { name: 'Pangong Lake Luxury Camp', price: 6900, rating: '4.8', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=1200&auto=format&fit=crop', location: 'Spangmik · Pangong Tso', amenities: ['Lakefront View', 'Heated Blankets', 'Stargazing Dome'], roomType: 'Premium Lakeview Wooden Cottage', inclusions: 'All Meals Included, Hot Water Service' }
            ],
            facts: { season: 'May to September (10°C – 25°C)', airport: 'Leh Kushok Bakula Rimpochee (IXL) — 4 km', duration: '5 Days · 4 Nights', safety: '9.3 / 10 · Exceptional Safety', mapRoute: 'Leh → Sham Valley → Khardung La → Nubra → Pangong' }
        },
        'Andaman': {
            name: 'Andaman & Nicobar',
            state: 'UT India',
            heroTitle: 'Andaman — Turquoise Lagoons & Pristine Coral Reefs',
            tag: 'Tropical Island',
            safety: '9.2 / 10',
            rating: '4.9',
            reviews: '(1,800 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop',
            lead: 'Powder-white beaches, underwater scuba diving in coral gardens, bioluminescent sea shores, and cellular jail history.',
            overview: 'The Andaman and Nicobar archipelago in the Bay of Bengal boasts some of Asia\'s finest tropical beaches. Radhanagar Beach on Havelock Island has been consistently ranked among the world\'s best beaches for its emerald waters and powder sand.',
            gallery: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Port Blair Cellular Jail & Light & Sound Show', desc: 'Arrive at Veer Savarkar Airport, tour the historic Cellular Jail national memorial, and attend the moving evening light & sound tribute.' },
                { title: 'Day 2: Havelock Catamaran & Radhanagar Sunset', desc: 'Board the Makruzz luxury catamaran to Havelock Island, check into a private beach villa, and witness sunset at Radhanagar Beach.' },
                { title: 'Day 3: Elephant Beach Scuba & Snorkeling Safari', desc: 'Speedboat to Elephant Beach for PADI-certified coral reef scuba diving, sea walking, and snorkeling with colorful clownfish and turtles.' },
                { title: 'Day 4: Neil Island Natural Rock Bridge & Laxmanpur Beach', desc: 'Cruise to tranquil Neil Island, photograph the geological natural rock bridge, and explore the crystal-clear shallow lagoons.' }
            ],
            foods: [
                { icon: '🦞', title: 'Grilled Lobster in Lemon Garlic Butter', desc: 'Freshly caught Andaman rock lobster charred over coals and brushed with aromatic herb butter.', badge: 'Seafood Sensation' },
                { icon: '🐟', title: 'Machli Curry with Coconut & Mustard', desc: 'Fresh reef fish simmered with grated coconut paste, mustard seeds, and curry leaves.', badge: 'Island Classic' },
                { icon: '🥥', title: 'Chilled Coconut Water & Tropical Smoothie', desc: 'Sweet high-grade coastal king coconut water straight from fresh palm groves.', badge: 'Beach Refreshment' },
                { icon: '🦀', title: 'Spicy Andaman Crab Masala', desc: 'Mud crab tossed in roasted spices, fresh black pepper, and thick caramelized onion gravy.', badge: 'Chef Special' }
            ],
            gems: [
                { title: 'Baratang Island Mud Volcano & Caves', tag: 'Geological Wonder', desc: 'Speedboat journey through dense mangrove creeks to limestone caves and active mud volcanoes.' },
                { title: 'Kalapathar Beach Turquoise Solitude', tag: 'Secret Beach', desc: 'Quiet coastline lined with black rocks and glowing aquamarine sea away from crowds.' }
            ],
            hotels: [
                { name: 'Havelock Island Beach Resort', price: 7800, rating: '4.8', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1200&auto=format&fit=crop', location: 'Govind Nagar Beach · Havelock', amenities: ['Coral Reef Scuba', 'Private Beach', 'Waterfront Dining'], roomType: 'Deluxe Poolside Cottage', inclusions: 'Complimentary Scuba Briefing, Breakfast, Ferry Assist' },
                { name: 'Barefoot at Havelock Eco Resort', price: 9200, rating: '4.9', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', location: 'Radhanagar Beach · Havelock', amenities: ['Radhanagar Walk', 'Eco Villas', 'Rainforest Spa'], roomType: 'Nicobari Wooden Cottage', inclusions: 'Organic Breakfast, Guided Birding Walk, Snorkeling Gear' },
                { name: 'Taj Exotica Resort & Spa Andamans', price: 18500, rating: '4.9', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Radhanagar Beach · Havelock', amenities: ['Olympic Infinity Pool', 'Butler Service', 'Private Beach'], roomType: 'Grand Luxury Villa', inclusions: 'Champagne Breakfast, Airport Ferry Transfer, Spa Voucher' }
            ],
            facts: { season: 'October to May (23°C – 30°C)', airport: 'Port Blair Veer Savarkar (IXZ) — 5 km', duration: '5 Days · 4 Nights', safety: '9.2 / 10 · Very High Safety', mapRoute: 'Port Blair → Cellular Jail → Havelock → Radhanagar → Neil Island' }
        },
        'Manali': {
            name: 'Manali',
            state: 'Himachal Pradesh',
            heroTitle: 'Manali — Snow-Capped Peaks & Alpine Pine Valleys',
            tag: 'Snow Peaks',
            safety: '8.7 / 10',
            rating: '4.7',
            reviews: '(2,900 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1920&auto=format&fit=crop',
            lead: 'Majestic deodar forests, roaring Beas River rapids, Solang Valley winter adventure sports, and high mountain passes.',
            overview: 'Situated at 2,050 meters at the northern end of Kullu Valley, Manali is India\'s premier mountain playground. Known for the ancient timber Hadimba Temple, hot sulfur springs of Vashisht, and the engineering marvel of Atal Tunnel leading into Lahaul valley.',
            gallery: [
                'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Hadimba Temple & Old Manali Bohemian Cafes', desc: 'Visit the 16th-century cedar-wood Hadimba Temple, stroll past riverside pine paths in Old Manali, and relax in vibrant mountain music cafes.' },
                { title: 'Day 2: Solang Valley Paragliding & Atal Tunnel to Sissu', desc: 'Experience tandem paragliding and ski slopes in Solang Valley, drive through the 9 km Atal Tunnel, and admire Sissu Waterfall in Lahaul.' },
                { title: 'Day 3: Rohtang Pass Snow Glaciers & Beas River Rafting', desc: 'Ascend to Rohtang Pass (13,058 ft) for panoramic glacier views, followed by thrilling Grade III white-water rafting in Kullu.' },
                { title: 'Day 4: Vashisht Sulfur Baths & Jogini Waterfall Trek', desc: 'Soak in natural therapeutic hot sulfur springs at Vashisht village, and hike the scenic apple orchard trail to cascading Jogini Falls.' }
            ],
            foods: [
                { icon: '🥟', title: 'Himachali Siddu with Ghee', desc: 'Steamed fermented wheat bun stuffed with crushed walnuts, poppy seeds, and spices, drenched in desi ghee.', badge: 'Mountain Staple' },
                { icon: '🐟', title: 'Pan-Fried Himalayan River Trout', desc: 'Fresh trout caught from the crystal Beas River, pan-seared with herbs and served with lemon butter sauce.', badge: 'Fresh Catch' },
                { icon: '🍲', title: 'Kullu Dham Feast', desc: 'Traditional festive platter with Madra (chickpeas in yogurt), chana dal, and sweet rice served on leaf plates.', badge: 'Traditional Dham' },
                { icon: '🍎', title: 'Fresh Manali Apple Crumble Pie', desc: 'Warm dessert prepared with freshly picked crunchy green and red Kinnaur apples and cinnamon.', badge: 'Orchard Special' }
            ],
            gems: [
                { title: 'Jogini Waterfall Pine Trail', tag: 'Scenic Hike', desc: 'Peaceful hiking trail meandering through whispering pine groves, wooden footbridges, and mountain streams.' },
                { title: 'Naggar Castle & Roerich Art Gallery', tag: 'Heritage Timber', desc: 'Ancient wooden castle built by Kullu rajas overlooking Beas valley, featuring Nicholas Roerich\'s Himalayan paintings.' }
            ],
            hotels: [
                { name: 'The Himalayan Luxury Castle & Resort', price: 7400, rating: '4.8', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', location: 'Hadimba Road · Manali', amenities: ['Victorian Architecture', 'Heated Pool', 'Orchard View'], roomType: 'Castle Tower Deluxe Suite', inclusions: 'Complimentary Breakfast, Fireplace, Castle Tour' },
                { name: 'Apple Country Resorts & Spa', price: 5100, rating: '4.7', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Log Huts Area · Old Manali', amenities: ['Panoramic Snow Peaks', 'Cedar Spa', 'Pure Veg Dining'], roomType: 'Honeymoon Valley View Room', inclusions: 'Buffet Breakfast, Evening High Tea, Spa Discount' },
                { name: 'Solang Valley Snow Glamping Retreat', price: 6200, rating: '4.8', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Solang Valley · Manali', amenities: ['Geodesic Domes', 'Ski-in Ski-out', 'Bonfire & BBQ'], roomType: 'Glass Igloo Mountain Dome', inclusions: 'All Meals, Stargazing Telescope, Ski Rental Assist' }
            ],
            facts: { season: 'March to June (Summer) / Dec to Feb (Snow)', airport: 'Bhuntar Airport (KUU) — 50 km', duration: '4 Days · 3 Nights', safety: '8.7 / 10 · High Safety', mapRoute: 'Manali Mall Road → Hadimba → Solang → Atal Tunnel → Sissu' }
        },
        'Ooty': {
            name: 'Ooty',
            state: 'Tamil Nadu',
            heroTitle: 'Ooty — Queen of Hill Stations in the Nilgiris',
            tag: 'Hill Station',
            safety: '8.9 / 10',
            rating: '4.8',
            reviews: '(3,400 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1920&auto=format&fit=crop',
            lead: 'Colonial stone bungalows, Nilgiri Mountain Railway toy train, Doddabetta Peak panoramas, and lush eucalyptus groves.',
            overview: 'Perched at 2,240 meters in the blue Nilgiri Mountains, Udhagamandalam (Ooty) was the British summer headquarters of Madras Presidency. Famed for its UNESCO toy train, botanical gardens with exotic flora, and fragrant homemade chocolates.',
            gallery: [
                'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Nilgiri Mountain Toy Train & Government Botanical Garden', desc: 'Board the historic steam-operated toy train from Coonoor, walk through the 55-acre botanical gardens, and browse Ooty homemade chocolates.' },
                { title: 'Day 2: Doddabetta Peak (8,650 ft) & Ooty Lake Boating', desc: 'Catch sunrise from Doddabetta\'s telescope observatory, and enjoy pedal-boating amidst eucalyptus trees at Ooty Lake.' },
                { title: 'Day 3: Pykara Lake Speedboating & Pine Forest Trail', desc: 'Visit the scenic Pykara Waterfalls and reservoir, followed by a romantic walk through the soaring shooting-loc pine forests.' },
                { title: 'Day 4: Avalanche Lake Wilderness & Emerald Tea Valleys', desc: 'Take a forest department safari into the untouched Avalanche Lake sanctuary, and tour the high-grown Nilgiri orthodox tea factories.' }
            ],
            foods: [
                { icon: '🍫', title: 'Ooty Handcrafted Fudge & Chocolates', desc: 'Creamy dark, white, and roasted almond chocolates crafted in traditional Nilgiri confectioneries.', badge: 'Ooty Must-Buy' },
                { icon: '🍵', title: 'Nilgiri Orthodox Black Tea with Cardamom', desc: 'High-elevation brisk black tea celebrated globally for its golden liquor and delicate floral aroma.', badge: 'GI Tagged' },
                { icon: '🍲', title: 'Badaga Traditional Sandhagai & Kootu', desc: 'Steamed rice noodles served with savory coconut milk and mountain vegetable curry from the indigenous Badaga community.', badge: 'Tribal Specialty' },
                { icon: '🍞', title: 'Varkey Nilgiri Crisp Pastry', desc: 'Flaky baked traditional crust biscuits made with wheat flour, semolina, and clarified butter.', badge: 'Tea-Time Classic' }
            ],
            gems: [
                { title: 'Avalanche Lake Wilderness Reserve', tag: 'Untouched Haven', desc: 'Pristine lake surrounded by magnolia blossoms and trout hatcheries accessible only by forest safari jeeps.' },
                { title: 'Needle Rock Viewpoint (Gudalur)', tag: '360° Panorama', desc: 'Conical rock peak providing an eagle-eye view over Mudumalai Tiger Reserve and misty Western Ghat valleys.' }
            ],
            hotels: [
                { name: 'Savoy - IHCL SeleQtions Ooty', price: 8400, rating: '4.9', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Sylks Road · Ooty', amenities: ['Colonial Fireplaces', 'Rose Garden', 'High Tea'], roomType: 'Heritage Colonial Cottage', inclusions: 'Breakfast, British High Tea, Fireplace Turndown' },
                { name: 'Sinclairs Retreat Ooty', price: 4800, rating: '4.7', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Gorishola Road · Ooty', amenities: ['Highest Altitude View', 'Spa', 'Multi-Cuisine'], roomType: 'Premier Valley View Room', inclusions: 'Buffet Breakfast, Evening Bonfire, Games Room' },
                { name: 'Sterling Ooty Elk Hill', price: 5600, rating: '4.8', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop', location: 'Ramakrishna Math Road · Ooty', amenities: ['Hilltop Panorama', 'Organic Garden', 'Kids Club'], roomType: 'Classic Nilgiri View Room', inclusions: 'Buffet Breakfast & Dinner, Guided Nature Walk' }
            ],
            facts: { season: 'October to June (10°C – 22°C)', airport: 'Coimbatore Airport (CJB) — 88 km', duration: '3 Days · 2 Nights', safety: '8.9 / 10 · Very High Safety', mapRoute: 'Ooty Town → Botanical Garden → Doddabetta → Pykara → Avalanche' }
        },
        'Udaipur': {
            name: 'Udaipur',
            state: 'Rajasthan',
            heroTitle: 'Udaipur — The Romantic City of Shimmering Lakes',
            tag: 'Royal Heritage',
            safety: '8.8 / 10',
            rating: '4.9',
            reviews: '(2,700 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1920&auto=format&fit=crop',
            lead: 'Floating white marble palaces on Lake Pichola, intricate City Palace courtyards, and glorious Aravalli sunsets.',
            overview: 'Often hailed as the Venice of the East, Udaipur was founded in 1559 by Maharana Udai Singh II. Its series of interconnected royal lakes and centuries-old Mewar palaces render it one of the most romantic cities on earth.',
            gallery: [
                'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: City Palace Mewar & Lake Pichola Boat Cruise', desc: 'Explore the grand City Palace museum, crystal gallery, and take a magical sunset boat cruise around Taj Lake Palace and Jag Mandir island.' },
                { title: 'Day 2: Jagdish Temple, Saheliyon Ki Bari & Bagore Ki Haveli', desc: 'Visit the 1651 carved stone Jagdish Temple, the fountains of Saheliyon Ki Bari, and watch Rajasthani Dharohar folk dances at Bagore Ki Haveli.' },
                { title: 'Day 3: Monsoon Palace (Sajjangarh) Clifftop Sunset', desc: 'Drive up to the clifftop Monsoon Palace for jaw-dropping sunset vistas over Udaipur\'s lakes and the Aravalli mountain ridges.' },
                { title: 'Day 4: Shilpgram Artisans & Vintage Car Museum', desc: 'Browse rural artisan crafts and pottery at Shilpgram, and view the royal Mewar vintage Rolls-Royce automobile collection.' }
            ],
            foods: [
                { icon: '🍛', title: 'Mewari Gatta Curry with Bajra Roti', desc: 'Steamed gram flour dumplings simmered in rich spiced curd gravy, paired with wholesome pearl millet flatbread.', badge: 'Mewar Heritage' },
                { icon: '🥘', title: 'Udaipur Dal Baati with Ker Sangri', desc: 'Golden baked baatis drenched in ghee, complemented by desert bean (ker sangri) stir-fry.', badge: 'Royal Platter' },
                { icon: '🥟', title: 'Kachori with Sweet Kadhi at Jagdish Chowk', desc: 'Crisp dal kachori served drowned in hot sweet-and-sour spiced buttermilk curry.', badge: 'Breakfast Favorite' },
                { icon: '🍨', title: 'Mawa Kulfi with Saffron Rabri', desc: 'Rich condensed milk kulfi topped with rose syrup, pistachios, and thickened rabri.', badge: 'Night Treat' }
            ],
            gems: [
                { title: 'Badi Lake (Jiyan Sagar) & Bahubali Hill', tag: 'Serene Panorama', desc: 'Peaceful lake tucked in the hills with a 15-minute hike to Bahubali Hill offering 360-degree fjord-like water views.' },
                { title: 'Ahar Cenotaphs Royal Memorials', tag: 'Archaeological Jewel', desc: 'Stunning field of 372 white marble domed cenotaphs commemorating the Maharanas of Mewar over four centuries.' }
            ],
            hotels: [
                { name: 'Fateh Garh Heritage Palace', price: 7900, rating: '4.9', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Sisarma · Udaipur', amenities: ['Infinity Lake View Pool', 'Vintage Cars', 'Spa'], roomType: 'Renaissance Heritage Suite', inclusions: 'Buffet Breakfast, Vintage Car Museum Tour, WiFi' },
                { name: 'Radisson Blu Udaipur Palace Resort', price: 6500, rating: '4.8', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Fateh Sagar Lake · Udaipur', amenities: ['Lakefront', 'Two Pools', 'Fine Dining'], roomType: 'Deluxe Lake View Room', inclusions: 'Buffet Breakfast, Lake Cruise Assist, Spa Access' },
                { name: 'The Leela Palace Udaipur', price: 21000, rating: '4.9', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', location: 'Lake Pichola · Udaipur', amenities: ['Private Boat Arrival', 'Royal Butler', 'ESPA Spa'], roomType: 'Grand Heritage Lake View Villa', inclusions: 'Private Boat Transfer, Champagne Breakfast, ESPA Credit' }
            ],
            facts: { season: 'October to March (14°C – 29°C)', airport: 'Maharana Pratap Airport (UDR) — 22 km', duration: '3 Days · 2 Nights', safety: '8.8 / 10 · Very High Safety', mapRoute: 'City Palace → Lake Pichola → Jag Mandir → Sajjangarh → Badi Lake' }
        },
        'Bali': {
            name: 'Bali',
            state: 'Indonesia',
            heroTitle: 'Bali — Island of the Gods, Temples & Terraces',
            tag: 'International Paradise',
            safety: '9.1 / 10',
            rating: '4.9',
            reviews: '(5,200 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1920&auto=format&fit=crop',
            lead: 'Lush terraced rice fields in Ubud, clifftop temples in Uluwatu, black volcanic beaches, private pool villas, and surf.',
            overview: 'Bali is Indonesia\'s jewel of culture and natural wonder. From sacred water temples like Tirta Empul and clifftop sunsets at Tanah Lot to the artistic sanctuary of Ubud and surfing breaks of Canggu and Seminyak, Bali promises an unforgettable escape.',
            gallery: [
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Ubud Cultural Heart & Sacred Monkey Forest', desc: 'Arrive in Denpasar, transfer to Ubud jungle villa, visit Sacred Monkey Forest sanctuary, and dine at an organic farm-to-table cafe.' },
                { title: 'Day 2: Tegallalang Rice Terraces & Tirta Empul Holy Springs', desc: 'Walk along the emerald Tegallalang rice terraces, try the jungle swing, and participate in a traditional purification blessing at Tirta Empul.' },
                { title: 'Day 3: Nusa Penida Island Speedboat Day Cruise', desc: 'Cruise to Nusa Penida island, photograph the iconic T-Rex cliff at Kelingking Beach, and snorkel with giant manta rays at Manta Point.' },
                { title: 'Day 4: Uluwatu Clifftop Temple & Kecak Fire Dance', desc: 'Visit Uluwatu clifftop temple perched 70 meters above crashing waves, watch the dramatic sunset Kecak fire dance, and enjoy Jimbaran seafood.' }
            ],
            foods: [
                { icon: '🍛', title: 'Nasi Campur Bali with Satay Lilit', desc: 'Balinese mixed rice platter with minced seafood satay on lemongrass sticks, lawar vegetables, and sambal matah.', badge: 'Island Classic' },
                { icon: '🍗', title: 'Ayam Betutu (Slow-Cooked Spiced Chicken)', desc: 'Whole chicken wrapped in banana leaves and slow-roasted for 8 hours with 16 Balinese herbs and spices.', badge: 'Ceremonial Dish' },
                { icon: '🍲', title: 'Babi Guling / Crispy Duck (Bebek Bengil)', desc: 'Famous deep-fried crispy duck served with steamed rice, spiced green beans, and three types of sambal chili.', badge: 'Ubud Specialty' },
                { icon: '🥥', title: 'Pisang Goreng with Palm Sugar Ice Cream', desc: 'Crispy fried banana fritters served with authentic toasted coconut and organic palm sugar gelato.', badge: 'Sweet Delight' }
            ],
            gems: [
                { title: 'Leke Leke Hidden Waterfall', tag: 'Jungle Oasis', desc: 'Secluded narrow jungle cascade surrounded by hanging ferns and bamboo bridges without tourist queues.' },
                { title: 'Sidemen Valley Emerald Foothills', tag: 'Authentic Bali', desc: 'Pristine traditional farming village under Mount Agung offering stunning hiking trails through chili and rice paddies.' }
            ],
            hotels: [
                { name: 'Ubud Hanging Gardens Jungle Pool Villa', price: 16500, rating: '4.9', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Payangan · Ubud, Bali', amenities: ['Multi-Tiered Infinity Pool', 'Jungle View', 'Spa'], roomType: 'Private Pool River Villa', inclusions: 'Floating Champagne Breakfast, Spa Ritual, Airport Transfer' },
                { name: 'The Seminyak Beach Resort & Spa', price: 11200, rating: '4.8', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Seminyak Beach · Bali', amenities: ['Beachfront', 'Sunset Bar', 'Infinity Pool'], roomType: 'Ocean Facing Luxury Room', inclusions: 'Buffet Breakfast, Afternoon Tea, Free WiFi' },
                { name: 'Uluwatu Clifftop Luxury Retreat', price: 14800, rating: '4.9', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', location: 'Pecatu · Uluwatu, Bali', amenities: ['Ocean Cliff View', 'Private Plunge Pool', 'Beach Club Access'], roomType: 'Sunset Clifftop Ocean Villa', inclusions: 'Daily Breakfast, VIP Beach Club Cabana, Butler' }
            ],
            facts: { season: 'April to October (Dry Season, 26°C – 31°C)', airport: 'Ngurah Rai International (DPS) — 15 km', duration: '5 Days · 4 Nights', safety: '9.1 / 10 · High Safety', mapRoute: 'Ubud → Tegallalang → Tirta Empul → Nusa Penida → Uluwatu' }
        },
        'Varanasi': {
            name: 'Varanasi',
            state: 'Uttar Pradesh',
            heroTitle: 'Varanasi — Spiritual Capital & Sacred Ganga Ghats',
            tag: 'Spiritual & Cultural',
            safety: '8.7 / 10',
            rating: '4.8',
            reviews: '(4,100 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1920&auto=format&fit=crop',
            lead: 'Mesmerizing evening Ganga Aarti at Dashashwamedh Ghat, sunrise wooden boat rides, and sacred ancient alleyways.',
            overview: 'One of the world\'s oldest continuously inhabited cities, Varanasi is the spiritual pulse of India. Experience the evening aarti with rhythmic bells and fire lamps, sunrise boat journeys past Manikarnika and Assi Ghats, and world-famed Banarasi silk weaves.',
            gallery: [
                'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Dashashwamedh Ghat & Evening Maha Aarti', desc: 'Arrive in Varanasi, check in to your heritage riverside stay, and witness the grand evening Ganga Aarti ceremony with priests holding flaming brass lamps.' },
                { title: 'Day 2: Dawn Boat Ride & Kashi Vishwanath Golden Temple', desc: 'Sublime sunrise boat ride along 84 ghats, darshan at the sacred Kashi Vishwanath corridor, and explore Banarasi paan and thandai stalls.' },
                { title: 'Day 3: Sarnath Dhamek Stupa & Buddhist Legacy', desc: 'Visit Sarnath where Lord Buddha preached his first sermon, admire the Ashoka Lion Capital museum, and browse silk weaving looms.' },
                { title: 'Day 4: Assi Ghat Morning Yoga & Street Food Trail', desc: 'Early morning yoga and classical music at Assi Ghat, feasting on hot kachori jalebi at Ram Bhandar, and evening boat farewell.' }
            ],
            foods: [
                { icon: '🍲', title: 'Banarasi Kachori Sabzi & Jalebi', desc: 'Crisp urad dal kachoris served with spicy potato curry and warm coiled sugar jalebis.', badge: 'Morning Staple' },
                { icon: '🥛', title: 'Blue Lassi & Malaiyo Saffron Froth', desc: 'Winter saffron milk foam flavored with pistachios, served in traditional earthen clay cups (kulhad).', badge: 'Legendary' },
                { icon: '🍃', title: 'Authentic Meetha Banarasi Paan', desc: 'Betel leaf filled with gulkand, sweetened fennel, kattha, and aromatic spices.', badge: 'Heritage Classic' },
                { icon: '🥛', title: 'Kashi Thandai with Dry Fruits', desc: 'Chilled rich milk infused with crushed almonds, fennel, melon seeds, and rose petals.', badge: 'Ghat Favorite' }
            ],
            gems: [
                { title: 'Chet Singh Fort on Shivala Ghat', tag: '18th-century Citadel', desc: 'Historic fortress where Maharaja Chet Singh revolted against Warren Hastings in 1781.' },
                { title: 'Chunar Fort River Ramparts', tag: 'Ancient Sandstone', desc: 'Rugged fortress 40 km from the city perched over a dramatic bend of the River Ganges.' }
            ],
            hotels: [
                { name: 'BrijRama Palace Heritage Ghat Hotel', price: 12800, rating: '4.9', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Darbhanga Ghat · Varanasi', amenities: ['Direct River Front', 'Private Bajra Boat', 'Rooftop Aarti View'], roomType: 'Maharaja River Suite', inclusions: 'Private Boat Transfer, Royal Vegetarian Breakfast, Aarti Guide' },
                { name: 'Taj Nadesar Palace Varanasi', price: 19500, rating: '4.9', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Nadesar Palace Grounds', amenities: ['Horse Carriage Ride', 'Royal Butler', 'Jiva Spa'], roomType: 'Heritage Palace Suite', inclusions: 'Champagne Breakfast, Royal Carriage Arrival, Spa Session' },
                { name: 'Surya Kaiser Palace Boutique Stay', price: 4200, rating: '4.7', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop', location: 'Cantonment · Varanasi', amenities: ['Swimming Pool', 'Garden Cafe', 'Silk Tour Assist'], roomType: 'Deluxe Palace Room', inclusions: 'Buffet Breakfast, Evening High Tea, WiFi' }
            ],
            facts: { season: 'October to March (12°C – 28°C)', airport: 'Lal Bahadur Shastri Airport (VNS) — 24 km', duration: '3 Days · 2 Nights', safety: '8.7 / 10 · High Safety', mapRoute: 'Assi Ghat → Dashashwamedh → Kashi Vishwanath → Sarnath' }
        },
        'Rishikesh': {
            name: 'Rishikesh',
            state: 'Uttarakhand',
            heroTitle: 'Rishikesh — World Capital of Yoga & River Rafting',
            tag: 'Adventure & Spiritual',
            safety: '9.0 / 10',
            rating: '4.9',
            reviews: '(3,600 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop',
            lead: 'Emerald Ganges white-water rapids, tranquil Himalayan ashrams, evening Triveni Ghat aarti, and suspension bridges.',
            overview: 'Located at the foothills of the Himalayas where the holy Ganges leaves the mountains, Rishikesh attracts seekers, yogis, and thrill-seekers from across the globe.',
            gallery: [
                'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Laxman Jhula & Beatles Ashram Street Murals', desc: 'Cross the suspension bridges, visit Chaurasi Kutia (Beatles Ashram) with its graffiti domes, and dine at a riverside cafe.' },
                { title: 'Day 2: Grade IV Ganges White Water Rafting & Cliff Jump', desc: 'Thrill of navigating The Wall and Roller Coaster rapids from Marine Drive, with cliff jumping and beach volleyball.' },
                { title: 'Day 3: Kunjapuri Temple Sunrise & Neer Garh Waterfall Hike', desc: '4:30 AM drive to Kunjapuri Devi for Himalayan sunrise views over Chaukhamba peaks, followed by swimming in Neer Garh falls.' },
                { title: 'Day 4: Parmarth Niketan Ganga Aarti & Sound Healing', desc: 'Participate in Vedic yoga meditation, sound bath therapies, and attend the devotional sunset aarti on the banks of Mother Ganga.' }
            ],
            foods: [
                { icon: '🥗', title: 'Ayurvedic Satvik Thali & Kitchari', desc: 'Wholesome organic dining cooked with medicinal herbs, cold-pressed oils, and fresh farm greens.', badge: 'Yoga Fuel' },
                { icon: '🥞', title: 'Buckwheat Pancakes with Himalayan Honey', desc: 'Nutritious gluten-free mountain pancakes drizzled with raw wildflower honey and roasted walnuts.', badge: 'Cafe Special' },
                { icon: '🍵', title: 'Herbal Tulsi Ginger Chai with Jaggery', desc: 'Fresh holy basil leaves brewed with organic crushed ginger and country jaggery in clay kulhads.', badge: 'Daily Energy' },
                { icon: '🍕', title: 'Wood-Fired Neapolitan Pizza in Tapovan', desc: 'Thin crust artisanal pizza baked in stone ovens overlooking the rushing turquoise river.', badge: 'Traveler Choice' }
            ],
            gems: [
                { title: 'Vashishta Gufa (Hermit\'s Meditation Cave)', tag: 'Silent Sanctum', desc: 'Ancient cave along the Ganges bank where sage Vashishta meditated, offering profound peaceful energy.' },
                { title: 'Patna Waterfall Limestone Cave', tag: 'Hidden Falls', desc: 'Uncrowded trek through Rajaji National Park forest leading to secluded cascading pools.' }
            ],
            hotels: [
                { name: 'Aloha On The Ganges Riverside Resort', price: 7800, rating: '4.9', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Tapovan · Rishikesh', amenities: ['Infinity River Pool', 'Daily Yoga', 'Ayurvedic Spa'], roomType: 'Ganga Facing Luxury Suite', inclusions: 'Buffet Breakfast, Morning Yoga Session, WiFi' },
                { name: 'Ananda in the Himalayas Luxury Wellness', price: 28000, rating: '4.9', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Palace Estate · Narendra Nagar', amenities: ['Viceroy Palace', 'Hydrotherapy', 'Meditation Pavilion'], roomType: 'Palace View Suite', inclusions: 'Ayurvedic Wellness Meals, Spa Treatment, Yoga Guide' },
                { name: 'Ganga Kinare Riverside Boutique Hotel', price: 5400, rating: '4.8', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop', location: 'Veerbhadra Road · Rishikesh', amenities: ['Private Ghat', 'Riverfront Lawn', 'Bicycle Rental'], roomType: 'Executive River Facing Room', inclusions: 'Buffet Breakfast, Private Aarti Access, Cycle Tour' }
            ],
            facts: { season: 'September to November / March to May', airport: 'Dehradun Jolly Grant (DED) — 21 km', duration: '4 Days · 3 Nights', safety: '9.0 / 10 · Very High Safety', mapRoute: 'Tapovan → Laxman Jhula → Marine Drive Raft → Beatles Ashram → Parmarth' }
        },
        'Hampi': {
            name: 'Hampi',
            state: 'Karnataka',
            heroTitle: 'Hampi — The UNESCO Golden Ruins of Vijayanagara',
            tag: 'UNESCO Heritage',
            safety: '8.9 / 10',
            rating: '4.8',
            reviews: '(2,200 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f4439050?q=80&w=1920&auto=format&fit=crop',
            lead: 'Surreal boulder-strewn landscapes, stone chariot at Vijaya Vittala, and grand Virupaksha Temple on the Tungabhadra River.',
            overview: 'Hampi was the fabulously wealthy 14th-century capital of the Vijayanagara Empire. Spread across 4,100 hectares of otherworldly granite hills and palm groves, its dramatic ruins are a photographer\'s dream.',
            gallery: [
                'https://images.unsplash.com/photo-1600100397608-f010f4439050?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Virupaksha Temple & Hemakuta Hill Sunset', desc: 'Arrive in Hampi, marvel at the 160-foot gopuram of Virupaksha Temple, and watch the sun set over boulder formations from Hemakuta Hill.' },
                { title: 'Day 2: Vijaya Vittala Stone Chariot & Musical Pillars', desc: 'Explore the iconic stone chariot and 56 musical acoustic granite pillars at Vittala complex, and take a coracle boat ride.' },
                { title: 'Day 3: Royal Enclosure, Lotus Mahal & Elephant Stables', desc: 'Tour the Indo-Islamic Lotus Mahal, the domed Elephant Stables, and the subterranean Stepped Tank (Pushkarani).' },
                { title: 'Day 4: Hippie Island (Anegundi) Bouldering & Sanapur Lake', desc: 'Rent a moped to explore Anegundi across the river, cliff jumping at Sanapur Lake, and sunset at Anjaneya Monkey Temple hill.' }
            ],
            foods: [
                { icon: '🍛', title: 'North Karnataka Jolada Rotti Oota', desc: 'Wholesome sorghum flatbread served with stuffed brinjal curry (enne gai), shenga chutney, and fresh curd.', badge: 'Deccan Signature' },
                { icon: '🥞', title: 'Bisi Bele Bath with Ghee & Boondi', desc: 'Aromatic hot lentil and rice casserole spiced with nutmeg, cloves, tamarind, and roasted cashews.', badge: 'Comfort Food' },
                { icon: '🥥', title: 'Fresh Tender Coconut & Mango Lassi', desc: 'Chilled local drinks served in open-air hippie cafes overlooking lush banana plantations.', badge: 'Cafe Chill' },
                { icon: '🍌', title: 'Crisp Banana Fritters & Filter Coffee', desc: 'Crispy golden South Indian banana bajjis served alongside strong chicory filter kaapi.', badge: 'Evening Snack' }
            ],
            gems: [
                { title: 'Sanapur Lake Boulder Lagoon', tag: 'Hidden Lake', desc: 'Peaceful reservoir surrounded by colossal granite rock balances, ideal for coracle paddling away from crowds.' },
                { title: 'Malyavanta Raghunatha Temple', tag: 'Continuous Chanting', desc: 'Hilltop temple with unbroken 24/7 Ramayana chanting, offering breathtaking 360-degree sunset views.' }
            ],
            hotels: [
                { name: 'Evolve Back Kamalapura Palace Hampi', price: 18500, rating: '4.9', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Kamalapura · Hampi', amenities: ['Palatial Architecture', 'Private Jacuzzi', 'Infinity Pool'], roomType: 'Nivasa Luxury Heritage Villa', inclusions: 'Royal Breakfast & Dinner, Guided Heritage Walk, Spa Access' },
                { name: 'Heritage Resort Hampi', price: 6200, rating: '4.8', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Hosapete Taluk · Hampi', amenities: ['Organic Farm', 'Swimming Pool', 'Spa'], roomType: 'Deluxe Heritage Cottage', inclusions: 'Buffet Breakfast, Coracle Ride Voucher, Free WiFi' },
                { name: 'Kishkinda Heritage Resort Anegundi', price: 3800, rating: '4.6', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop', location: 'Near Sanapur Lake · Anegundi', amenities: ['Boulder View', 'Water Slides', 'Garden Dining'], roomType: 'Standard AC Cottage', inclusions: 'Breakfast, Scooter Rental Assist, Bonfire' }
            ],
            facts: { season: 'October to March (18°C – 32°C)', airport: 'Hubli Airport (HBX) — 145 km / Jindal (VDY) — 38 km', duration: '3 Days · 2 Nights', safety: '8.9 / 10 · Very High Safety', mapRoute: 'Virupaksha → Hemakuta → Vittala Stone Chariot → Royal Enclosure → Anegundi' }
        },
        'Varkala': {
            name: 'Varkala',
            state: 'Kerala',
            heroTitle: 'Varkala — Red Clifftop Coast & Arabian Sea Sunsets',
            tag: 'Coastal & Cliffs',
            safety: '9.0 / 10',
            rating: '4.8',
            reviews: '(2,900 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop',
            lead: 'Breathtaking red sandstone cliffs rising above the Arabian Sea, natural mineral water springs, and beach cafes.',
            overview: 'Varkala is Kerala\'s unique geological gem where towering cliffs flank the coastline. Known for the ancient 2,000-year-old Janardhanaswamy Temple, natural mineral springs at Papanasam Beach, and vibrant bohemian cafes.',
            gallery: [
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: North Cliff Boardwalk & Sunset Cafes', desc: 'Arrive in Varkala, check in to your clifftop villa, stroll the cliff-edge boardwalk, and dine with live acoustic music at sunset.' },
                { title: 'Day 2: Papanasam Beach Holy Springs & Janardhanaswamy Temple', desc: 'Dip into the sacred mineral spring waters at Papanasam beach, followed by darshan at the 2,000-year-old hilltop temple.' },
                { title: 'Day 3: Kappil Beach & Backwater Lake Kayaking', desc: 'Travel 7 km north where the serene Edava-Nadayara lake meets the crashing Arabian Sea, with scenic kayaking and coconut groves.' },
                { title: 'Day 4: Anjengo (Anchuthengu) Fort & Lighthouse Panorama', desc: 'Explore the 17th-century British East India Company fort, climb the lighthouse for 360-degree ocean views, and ayurvedic massage.' }
            ],
            foods: [
                { icon: '🐟', title: 'Tandoori & Tava Seer Fish Fry', desc: 'Fresh morning catch marinated in fiery red chili shallot paste and roasted on flat tavas.', badge: 'Cliff Fresh' },
                { icon: '🥘', title: 'Kerala Prawn Moilee in Coconut Milk', desc: 'Mild fragrant stew with plump prawns, green chilies, ginger, and thick fresh coconut milk.', badge: 'Coastal Specialty' },
                { icon: '🥞', title: 'Fluffy Appam with Vegetable Kurma', desc: 'Crispy-edged fermented rice hoppers paired with spiced mixed vegetable and cashew gravy.', badge: 'Breakfast Favorite' },
                { icon: '🍹', title: 'Watermelon Mint Cooler & Cold Brew', desc: 'Refreshing seaside coolers served in wooden clifftop bamboo shacks overlooking crashing waves.', badge: 'Beach Chill' }
            ],
            gems: [
                { title: 'Odayam Beach Quiet Sandy Cove', tag: 'Peaceful Shore', desc: 'Golden sand cove just 1 km north of North Cliff without the commercial shops, ideal for quiet swimming.' },
                { title: 'Ponnumthuruthu (Golden Island)', tag: 'Backwater Oasis', desc: 'Serene mangrove island in Anjengo backwaters accessible by country wooden boat, home to ancient Shiva temple.' }
            ],
            hotels: [
                { name: 'Gateway Varkala - IHCL SeleQtions', price: 7900, rating: '4.8', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Janardhanapuram · Varkala', amenities: ['Clifftop Ocean View', 'Ayurvedic Spa', 'Swimming Pool'], roomType: 'Superior Sea Facing Room', inclusions: 'Buffet Breakfast, Evening High Tea, Yoga Session' },
                { name: 'Elixir Cliff Beach Resort & Spa', price: 6200, rating: '4.9', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'North Cliff · Varkala', amenities: ['Private Jacuzzi', 'Infinity Pool', 'Seaside Lawn'], roomType: 'Grand Jacuzzi Cliff Suite', inclusions: 'Buffet Breakfast, Afternoon Tea & Snacks, Free WiFi' },
                { name: 'Hindustan Beach Retreat', price: 4500, rating: '4.7', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop', location: 'Papanasam Beach · Varkala', amenities: ['Beachfront Access', 'Rooftop Dining', 'Ayurveda'], roomType: 'Executive Sea View Room', inclusions: 'Breakfast, Ayurveda Consultation, Pool Access' }
            ],
            facts: { season: 'October to March (24°C – 32°C)', airport: 'Trivandrum International (TRV) — 42 km', duration: '3 Days · 2 Nights', safety: '9.0 / 10 · High Safety Rating', mapRoute: 'North Cliff → Papanasam → Odayam → Kappil → Anjengo' }
        },
        'Coorg': {
            name: 'Coorg',
            state: 'Karnataka',
            heroTitle: 'Coorg — Scotland of India & Aromatic Coffee Country',
            tag: 'Coffee Highlands',
            safety: '9.0 / 10',
            rating: '4.8',
            reviews: '(3,100 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1920&auto=format&fit=crop',
            lead: 'Misty Western Ghats mountain ridges, sprawling Arabica and Robusta estates, Abbey Falls, and Tibetan golden shrines.',
            overview: 'Kodagu (Coorg) is celebrated for its lush coffee slopes, spice plantations, brave Kodava culture, and the origin of the sacred Cauvery River at Talacauvery.',
            gallery: [
                'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Madikeri Fort, Raja\'s Seat & Abbey Falls', desc: 'Visit 17th-century Madikeri Fort, witness misty valley sunset from Raja\'s Seat, and walk to cascading Abbey Falls.' },
                { title: 'Day 2: Namdroling Golden Temple & Dubare Elephant Camp', desc: 'Bathe and feed gentle giants at Dubare Elephant Camp, and admire 40-foot gilded statues at Bylakuppe Tibetan settlement.' },
                { title: 'Day 3: Tadiandamol Mountain Trek & Coffee Plantation Tour', desc: 'Hike to Coorg\'s highest peak (5,740 ft) with panoramic clouds, followed by bean-to-cup coffee and spice tasting.' },
                { title: 'Day 4: Talacauvery Holy Origin & Iruppu Waterfalls', desc: 'Visit the holy birthspring of River Cauvery at Brahmagiri hills, and trek to forest-clad Iruppu Falls.' }
            ],
            foods: [
                { icon: '🍖', title: 'Traditional Pandi Curry with Akki Rotti', desc: 'Tender pork cooked with dark roasted spices and sour kachampuli fruit vinegar, served with thin rice flatbread.', badge: 'Kodava Classic' },
                { icon: '🍛', title: 'Kadamputtu (Steamed Rice Balls) & Dal', desc: 'Melt-in-mouth steamed cardamom-infused rice balls served with spicy coconut vegetable curry.', badge: 'Kodava Feast' },
                { icon: '☕', title: 'Fresh Coorg Single-Origin Filter Coffee', desc: 'Estate-roasted Arabica beans brewed with chicory and thick whole milk.', badge: 'Estate Direct' },
                { icon: '🍯', title: 'Wild Coorg Forest Honey & Bamboo Shoot Curry', desc: 'Pure raw forest honey paired with seasonal tender bamboo shoots (baimbale).', badge: 'Forest Harvest' }
            ],
            gems: [
                { title: 'Chelavara Waterfalls & Kabbe Hills Ridge', tag: 'Cliff Panorama', desc: 'Natural tortoise-shaped rock waterfall and windswept clifftop walk near the Kerala border.' },
                { title: 'Mandalpatti 4x4 Jeep Fog Peak', tag: 'Offroad Thrill', desc: 'Rugged jeep drive ascending through misty grassland heights overlooking Pushpagiri wildlife.' }
            ],
            hotels: [
                { name: 'The Tamara Coorg Luxury Plantation Resort', price: 14200, rating: '4.9', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Kabbinakad Estate · Madikeri', amenities: ['Elevated Wooden Cottages', 'Coffee Blossom Spa', 'Nature Trails'], roomType: 'Luxury Forest Cottage', inclusions: 'Buffet Breakfast & Dinner, Guided Plantation Trek, Yoga' },
                { name: 'Club Mahindra Madikeri Resort', price: 6800, rating: '4.7', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Galibeedu Road · Madikeri', amenities: ['Two Pools', 'Adventure Zone', 'Coffee Tasting'], roomType: 'Superior Studio Suite', inclusions: 'Buffet Breakfast, Evening High Tea, Free WiFi' },
                { name: 'Evolve Back Kuruba Safari Lodge Coorg', price: 19500, rating: '4.9', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', location: 'Karadigodu Post · Siddapur', amenities: ['Private Plunge Pool', 'Ayurvedic Spa', 'Lakefront'], roomType: 'Lily Pool Heritage Villa', inclusions: 'All Meals, Private Pool, Plantation Tour, Coracle Ride' }
            ],
            facts: { season: 'October to April (15°C – 28°C)', airport: 'Kannur International (CNN) — 90 km / Mangalore (IXE) — 135 km', duration: '4 Days · 3 Nights', safety: '9.0 / 10 · Very High Safety', mapRoute: 'Madikeri → Abbey Falls → Dubare → Bylakuppe → Talacauvery' }
        },
        'Kashmir': {
            name: 'Kashmir',
            state: 'Jammu & Kashmir',
            heroTitle: 'Kashmir — Paradise on Earth, Dal Lake & Gulmarg',
            tag: 'Alpine Paradise',
            safety: '8.8 / 10',
            rating: '4.9',
            reviews: '(4,800 Reviews)',
            heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1920&auto=format&fit=crop',
            lead: 'Dal Lake shikaras, cedar houseboats, Gulmarg snow gondola, saffron valleys, and Mughal blossom gardens.',
            overview: 'Described by emperor Jahangir as paradise on earth ("Agar firdaus bar rooy-e zameen ast, hameen ast-o hameen ast"), Kashmir enchants with its reflections on Dal Lake, snow glaciers in Sonamarg, and pine-scented meadows in Pahalgam.',
            gallery: [
                'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop'
            ],
            itinerary: [
                { title: 'Day 1: Srinagar Shikara Ride & Luxury Houseboat Check-in', desc: 'Glide through Dal Lake lotus gardens and floating vegetable market on a colorful shikara, and stay in a carved cedar houseboat.' },
                { title: 'Day 2: Gulmarg Gondola Cable Car to Apharwat Peak', desc: 'Take the world\'s second-highest cable car (14,000 ft) to snow-covered Apharwat peak for skiing and panoramic Pir Panjal views.' },
                { title: 'Day 3: Pahalgam Valley of Shepherds & Betaab Valley', desc: 'Drive through saffron fields at Pampore to Pahalgam, horse riding in Baisaran meadow, and exploring Betaab and Aru valleys.' },
                { title: 'Day 4: Sonamarg Meadow of Gold & Mughal Gardens', desc: 'Pony trek to Thajiwas Glacier in Sonamarg, followed by Shalimar and Nishat Bagh terraced water fountains in Srinagar.' }
            ],
            foods: [
                { icon: '🍲', title: 'Traditional 36-Course Wazwan & Rogan Josh', desc: 'Tender slow-cooked lamb in Kashmiri chili oil, fennel, and maval flower extract, served on a communal trami plate.', badge: 'Royal Feast' },
                { icon: '🍵', title: 'Saffron Kehwa with Crushed Almonds', desc: 'Golden green tea brewed with saffron strands, whole cinnamon, and cardamom, garnished with almond slivers.', badge: 'Kashmiri Soul' },
                { icon: '🥟', title: 'Gushtaba & Rista Meatballs in Gravy', desc: 'Silky hand-pounded mutton meatballs simmered in rich yogurt and saffron gravy.', badge: 'Master Recipe' },
                { icon: '🥖', title: 'Crispy Girda & Lavasa Bread with Nun Chai', desc: 'Fresh tandoor morning bread with pink salted butter tea from traditional Kandur bakeries.', badge: 'Morning Tradition' }
            ],
            gems: [
                { title: 'Doodhpathri Valley of Milk', tag: 'Untouched Meadow', desc: 'Pristine alpine bowl where the crystal-white river froths over rocks amidst dense pine and cedar ridges.' },
                { title: 'Chatpal Secluded Shangri-La', tag: 'Secret Paradise', desc: 'Peaceful hamlet in South Kashmir without commercial crowds, perfect for pure mountain solitude.' }
            ],
            hotels: [
                { name: 'The Khyber Himalayan Resort & Spa Gulmarg', price: 18900, rating: '4.9', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop', location: 'Near Gondola · Gulmarg', amenities: ['Heated Indoor Pool', 'Snow Peak View', 'L\'Occitane Spa'], roomType: 'Premier Mountain View Room', inclusions: 'Buffet Breakfast & Dinner, Gondola Assistance, Spa Discount' },
                { name: 'Mascot Heritage Dal Lake Houseboats', price: 5800, rating: '4.8', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop', location: 'Nigeen Lake · Srinagar', amenities: ['Hand-Carved Walnut Wood', 'Private Shikara', 'Lakefront Balcony'], roomType: 'Royal Cedar Houseboat Suite', inclusions: 'Traditional Wazwan Dinner, Shikara Ride, Morning Kehwa' },
                { name: 'Pahalgam Pine N Peak Resort', price: 8200, rating: '4.8', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop', location: 'Aru Road · Pahalgam', amenities: ['Lidder River View', 'Pine Forest', 'Bonfire'], roomType: 'Executive River Suite', inclusions: 'Buffet Breakfast, Evening Bonfire, Free WiFi' }
            ],
            facts: { season: 'April to October (Spring/Summer) / Dec to Feb (Snow)', airport: 'Sheikh ul-Alam International Srinagar (SXR) — 14 km', duration: '5 Days · 4 Nights', safety: '8.8 / 10 · High Safety', mapRoute: 'Srinagar → Dal Lake → Gulmarg Gondola → Pahalgam → Sonamarg' }
        }
    };

    // Global Exposure
    window.destinationsMasterDB = destinationsMasterDB;

    // Render destination details dynamically
    window.renderDestinationDetail = function(key) {
        let matchedKey = 'Munnar';
        const cleanKey = (key || '').trim().toLowerCase();
        for (const k of Object.keys(destinationsMasterDB)) {
            if (k.toLowerCase() === cleanKey || cleanKey.includes(k.toLowerCase()) || k.toLowerCase().includes(cleanKey)) {
                matchedKey = k;
                break;
            }
        }

        const data = destinationsMasterDB[matchedKey] || destinationsMasterDB['Munnar'];

        // 1. Title & Breadcrumb
        document.title = data.name + ', ' + data.state + ' Travel Guide & Handpicked Hotels — TripCraft';
        const bc = document.getElementById('destBreadcrumbName');
        if (bc) bc.textContent = data.name + ', ' + data.state;

        // 2. Hero Section
        const hero = document.getElementById('destHeroSection');
        if (hero && data.heroImage) hero.style.backgroundImage = 'url(\'' + data.heroImage + '\')';

        const heroTitle = document.getElementById('destHeroTitle');
        if (heroTitle) heroTitle.innerHTML = data.heroTitle;

        const heroLead = document.getElementById('destHeroLead');
        if (heroLead) heroLead.textContent = data.lead;

        const badgeTag = document.getElementById('destBadgeTag');
        if (badgeTag) badgeTag.textContent = data.tag;

        const safetyTag = document.getElementById('destSafetyTag');
        if (safetyTag) safetyTag.textContent = 'Safety Score: ' + data.safety;

        const ratingVal = document.getElementById('destRatingVal');
        if (ratingVal) ratingVal.textContent = data.rating;

        const ratingReviews = document.getElementById('destRatingReviews');
        if (ratingReviews) ratingReviews.textContent = data.reviews;

        // 3. Overview
        const overviewText = document.getElementById('destOverviewText');
        if (overviewText) overviewText.textContent = data.overview;

        // 4. Gallery with reference photos
        const gallery = document.getElementById('destGalleryContainer');
        if (gallery && data.gallery) {
            gallery.innerHTML = data.gallery.map(function(img) {
                return '<div class="gallery-item" style="background-image: url(\'' + img + '\');" onclick="if(window.TripCraftLightbox) TripCraftLightbox.open(\'' + img + '\');"></div>';
            }).join('');
        }

        // 5. Itinerary
        const itin = document.getElementById('destItineraryContainer');
        if (itin && data.itinerary) {
            itin.innerHTML = data.itinerary.map(function(step, idx) {
                return '<div class="itinerary-step">' +
                    '<div class="step-num">' + (idx + 1) + '</div>' +
                    '<div class="step-content">' +
                        '<div class="step-title">' + step.title + '</div>' +
                        '<div class="step-desc">' + step.desc + '</div>' +
                    '</div>' +
                '</div>';
            }).join('');
        }

        // 6. Regional Foods
        const foodsHeading = document.getElementById('destFoodsHeading');
        if (foodsHeading) foodsHeading.textContent = 'Authentic ' + data.name + ' Regional Specialties';

        const foods = document.getElementById('destFoodsContainer');
        if (foods && data.foods) {
            foods.innerHTML = data.foods.map(function(f) {
                return '<div style="background:var(--white); border:1px solid var(--gray-100); border-radius:var(--r-md); padding:16px; display:flex; gap:14px; align-items:center;">' +
                    '<div style="font-size:32px;">' + f.icon + '</div>' +
                    '<div>' +
                        '<div style="font-weight:700; color:var(--navy); font-size:14px;">' + f.title + '</div>' +
                        '<div style="font-size:12px; color:var(--text-muted); margin-top:2px;">' + f.desc + '</div>' +
                        '<span class="chip chip-gold" style="font-size:9.5px; margin-top:6px;">' + f.badge + '</span>' +
                    '</div>' +
                '</div>';
            }).join('');
        }

        // 7. Hidden Gems
        const gems = document.getElementById('destGemsContainer');
        if (gems && data.gems) {
            gems.innerHTML = data.gems.map(function(g) {
                return '<div style="background:var(--gray-50); border:1px solid var(--gray-200); border-radius:var(--r-md); padding:16px;">' +
                    '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">' +
                        '<strong style="color:var(--navy); font-size:14px;">' + g.title + '</strong>' +
                        '<span class="chip chip-teal" style="font-size:10px;">' + g.tag + '</span>' +
                    '</div>' +
                    '<p style="font-size:12.5px; color:var(--text-mid); line-height:1.5;">' + g.desc + '</p>' +
                '</div>';
            }).join('');
        }

        // 8. Handpicked Hotels with Reference Photos & Booking Buttons
        const hotelsTitle = document.getElementById('destHotelsSectionTitle');
        if (hotelsTitle) hotelsTitle.textContent = 'Verified Hotels & Resorts in ' + data.name;

        const hotels = document.getElementById('destHotelsContainer');
        if (hotels && data.hotels) {
            hotels.innerHTML = data.hotels.map(function(h) {
                const amenitiesHtml = h.amenities.map(function(a) {
                    return '<span class="chip chip-teal" style="font-size:10px;">' + a + '</span>';
                }).join(' ');

                return '<div class="card" style="display:flex; flex-direction:column; overflow:hidden; border-radius:var(--r-xl); border:1px solid var(--gray-200); box-shadow:var(--shadow-sm); transition:transform 0.2s;">' +
                    '<div style="height: 180px; background-image: url(\'' + h.image + '\'); background-size: cover; background-position:center; position:relative;">' +
                        '<span class="chip chip-gold" style="position:absolute; top:12px; left:12px; font-size:10px;">★ ' + h.rating + ' &bull; Verified Partner</span>' +
                    '</div>' +
                    '<div style="padding: 18px; flex: 1; display:flex; flex-direction:column; justify-content:space-between;">' +
                        '<div>' +
                            '<h3 style="font-family:\'Bricolage Grotesque\', sans-serif; font-size: 17px; font-weight:700; color:var(--navy); margin-bottom:4px;">' + h.name + '</h3>' +
                            '<div style="font-size: 12px; color: var(--text-muted); margin-bottom:10px;">' + h.location + ' &middot; ' + h.roomType + '</div>' +
                            '<div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px;">' + amenitiesHtml + '</div>' +
                        '</div>' +
                        '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--gray-100); padding-top:12px;">' +
                            '<div>' +
                                '<div style="font-size: 18px; font-weight: 800; color: var(--teal);">&#8377;' + h.price.toLocaleString('en-IN') + '</div>' +
                                '<div style="font-size:10.5px; color:var(--text-muted);">per night &middot; taxes incl.</div>' +
                            '</div>' +
                            '<button class="btn btn-teal" style="padding:8px 16px; font-size:12.5px;" onclick="openBookingModal({' +
                                'title: \'' + h.name.replace(/'/g, "\\'") + '\',' +
                                'category: \'Hotel Reservation\',' +
                                'image: \'' + h.image + '\',' +
                                'price: \'₹' + h.price.toLocaleString('en-IN') + '\',' +
                                'description: \'Luxury verified stay in ' + data.name.replace(/'/g, "\\'") + ' with curated guest amenities.\',' +
                                'specs: [' +
                                    '{ label: \'Location\', val: \'' + h.location.replace(/'/g, "\\'") + '\' },' +
                                    '{ label: \'Room Type\', val: \'' + h.roomType.replace(/'/g, "\\'") + '\' },' +
                                    '{ label: \'Inclusions\', val: \'' + h.inclusions.replace(/'/g, "\\'") + '\' },' +
                                    '{ label: \'Rating\', val: \'★ ' + h.rating + ' Verified Reviews\' }' +
                                ']' +
                            '})">Book Hotel</button>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            }).join('');
        }

        // 9. Quick Facts
        if (data.facts) {
            const sEl = document.getElementById('destFactSeason');
            if (sEl) sEl.textContent = data.facts.season;

            const aEl = document.getElementById('destFactAirport');
            if (aEl) aEl.textContent = data.facts.airport;

            const dEl = document.getElementById('destFactDuration');
            if (dEl) dEl.textContent = data.facts.duration;

            const sfEl = document.getElementById('destFactSafety');
            if (sfEl) sfEl.textContent = data.facts.safety;

            const mb = document.getElementById('destMapBadge');
            if (mb) mb.textContent = data.name + ' Highlights Route';

            const mw = document.getElementById('destMapWaypoints');
            if (mw && data.facts.mapRoute) mw.innerHTML = '<strong>Waypoints:</strong> ' + data.facts.mapRoute;
        }

        // 10. Build Itinerary CTA
        const btn = document.getElementById('destBuildItineraryBtn');
        if (btn) {
            btn.href = 'itinerary.html?dest=' + encodeURIComponent(data.name) + '&days=4';
            const span = btn.querySelector('span');
            if (span) span.textContent = 'Build 4-Day ' + data.name + ' Itinerary';
        }

        // Compare section
        const cmpCur = document.getElementById('destCompareCurrentName');
        if (cmpCur) cmpCur.innerHTML = data.name + ', ' + data.state + ' <span class="dest-compare-badge">Viewing</span>';
        const cmpPrice = document.getElementById('destComparePrice');
        if (cmpPrice && data.hotels[0]) cmpPrice.textContent = '₹' + data.hotels[0].price.toLocaleString('en-IN');

        // Record into Recently Viewed History
        if (window.TripCraftHistory) {
            TripCraftHistory.add({
                title: data.name + ', ' + data.state,
                url: 'dest-detail.html?dest=' + encodeURIComponent(data.name),
                category: 'Destination',
                meta: data.tag + ' · ' + data.safety + ' Safety · 4 Days'
            });
        }

        // Mount reviews
        if (window.TripCraftReviews) {
            TripCraftReviews.mountReviewsComponent('#destReviewsSectionMount', {
                overallScore: data.rating,
                totalCount: data.reviews.replace(/[^0-9,]/g, '') || '2,450',
                ratingWord: 'Exceptional',
                categories: { cleanliness: 4.8, location: 4.9, staff: 4.7, value: 4.6 }
            });
        }
    };
})();
