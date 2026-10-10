import React, { useState, useMemo } from 'react';
import {
  Car,
  Fuel,
  Users,
  ShieldCheck,
  CheckCircle2,
  Search,
  Filter,
  Sparkles,
  MapPin,
  Calendar,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useBooking } from '../context/BookingContext';
import { formatCurrency } from '../utils/pricing';

export const VEHICLE_FLEET = [
  {
    id: 'veh_01',
    name: 'Mahindra Thar 4x4 (Hard Top)',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 4,
    fuel_type: 'Diesel',
    transmission: 'Automatic',
    mileage: '12 kmpl',
    price_per_day: 4500,
    rating: 4.9,
    reviewsCount: 142,
    location: 'Leh Ladakh / Manali',
    tags: ['4x4 All-Terrain', 'Mountain Ready', 'Zero Deposit Option'],
    specs: ['All-Wheel Drive', 'GPS Navigation', 'High Ground Clearance', 'Bluetooth']
  },
  {
    id: 'veh_02',
    name: 'Hyundai Creta SX (Panoramic)',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 5,
    fuel_type: 'Diesel',
    transmission: 'Automatic',
    mileage: '18 kmpl',
    price_per_day: 3800,
    rating: 4.85,
    reviewsCount: 218,
    location: 'Munnar / Kochi',
    tags: ['Hill Climb Mode', 'Ventilated Seats', 'Family Favorite'],
    specs: ['Sunroof', 'Rear AC Vents', 'Apple CarPlay', 'Cruise Control']
  },
  {
    id: 'veh_03',
    name: 'Toyota Innova Crysta 2.4 Z',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 7,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    mileage: '14 kmpl',
    price_per_day: 4800,
    rating: 4.95,
    reviewsCount: 380,
    location: 'Jaipur / Golden Triangle',
    tags: ['Captain Seats', 'Highway Cruiser', 'Huge Luggage Bay'],
    specs: ['7 Airbags', 'Dual AC', 'Rear Recliner', 'Sanitized Interior']
  },
  {
    id: 'veh_04',
    name: 'Tata Nexon EV Max',
    category: 'EV',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 5,
    fuel_type: 'Electric',
    transmission: 'Automatic',
    mileage: '437 km range',
    price_per_day: 3600,
    rating: 4.88,
    reviewsCount: 96,
    location: 'Bengaluru / Mysore',
    tags: ['Zero Emissions', 'Fast Charging Support', 'Silent Drive'],
    specs: ['Regenerative Braking', 'Wireless Charger', 'Fast CCS2 Plug', 'Hill Hold']
  },
  {
    id: 'veh_05',
    name: 'Honda City ZX i-VTEC',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 5,
    fuel_type: 'Petrol',
    transmission: 'CVT Automatic',
    mileage: '17.8 kmpl',
    price_per_day: 3200,
    rating: 4.8,
    reviewsCount: 164,
    location: 'Goa / Coastal Belt',
    tags: ['Plush Ride', 'Ultra Smooth', 'City & Beach Ready'],
    specs: ['LaneWatch Camera', 'Sunroof', 'Leatherette Upholstery', 'Eco Assist']
  },
  {
    id: 'veh_06',
    name: 'Maruti Suzuki Dzire VXI',
    category: 'Sedan',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 5,
    fuel_type: 'Petrol',
    transmission: 'Manual',
    mileage: '22.5 kmpl',
    price_per_day: 2200,
    rating: 4.75,
    reviewsCount: 310,
    location: 'Delhi / NCR / Agra',
    tags: ['Budget Friendly', 'High Fuel Efficiency', 'Easy City Maneuver'],
    specs: ['Dual Airbags', 'Rear Parking Sensors', 'Music System', 'Chilled AC']
  },
  {
    id: 'veh_07',
    name: 'Royal Enfield Himalayan 450',
    category: 'Bike',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 2,
    fuel_type: 'Petrol',
    transmission: 'Manual (6-Speed)',
    mileage: '30 kmpl',
    price_per_day: 1800,
    rating: 4.96,
    reviewsCount: 420,
    location: 'Leh Ladakh / Spiti Valley',
    tags: ['TFT Tripper Dash', 'Adventure Touring', 'Sherpa 450cc'],
    specs: ['Dual Channel ABS', 'Upside Down Forks', 'Luggage Pannier Mounts', 'USB Port']
  },
  {
    id: 'veh_08',
    name: 'Royal Enfield Classic 350 Reborn',
    category: 'Bike',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 2,
    fuel_type: 'Petrol',
    transmission: 'Manual (5-Speed)',
    mileage: '35 kmpl',
    price_per_day: 1400,
    rating: 4.88,
    reviewsCount: 290,
    location: 'South Goa / Coastal',
    tags: ['Iconic Thump', 'Cruising Comfort', 'Retro Styling'],
    specs: ['J-Series Engine', 'Dual Channel ABS', 'Comfort Touring Seat', 'Chrome Accents']
  },
  {
    id: 'veh_09',
    name: 'BMW 3 Series Gran Limousine',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 5,
    fuel_type: 'Petrol',
    transmission: 'Steptronic Sport',
    mileage: '15 kmpl',
    price_per_day: 11500,
    rating: 4.98,
    reviewsCount: 74,
    location: 'Mumbai / Pune',
    tags: ['Executive Comfort', 'Harman Kardon Audio', 'Chauffeur Option'],
    specs: ['Panoramic Sunroof', 'Ambient Lighting', 'Live Cockpit Pro', 'Adaptive Suspension']
  },
  {
    id: 'veh_10',
    name: 'MG ZS EV Exclusive Pro',
    category: 'EV',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 5,
    fuel_type: 'Electric',
    transmission: 'Automatic',
    mileage: '461 km range',
    price_per_day: 3900,
    rating: 4.86,
    reviewsCount: 88,
    location: 'New Delhi / Jaipur',
    tags: ['ADAS Level 2', 'Zero Tailpipe Emissions', 'Fast Charging'],
    specs: ['i-SMART Connected', '360 Camera', 'Wireless Apple CarPlay', 'Panoramic Skyroof']
  },
  {
    id: 'veh_11',
    name: 'KTM 390 Adventure',
    category: 'Bike',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 2,
    fuel_type: 'Petrol',
    transmission: 'Quickshifter+',
    mileage: '28 kmpl',
    price_per_day: 2000,
    rating: 4.92,
    reviewsCount: 165,
    location: 'Rishikesh / Uttarakhand',
    tags: ['Traction Control', 'Cornering ABS', 'High Performance'],
    specs: ['WP APEX Suspension', 'TFT Display', 'Offroad Mode', 'Slipper Clutch']
  },
  {
    id: 'veh_12',
    name: 'Force Urbania Luxury Van (12 Seater)',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    seating_capacity: 12,
    fuel_type: 'Diesel',
    transmission: 'Manual',
    mileage: '11 kmpl',
    price_per_day: 6500,
    rating: 4.94,
    reviewsCount: 112,
    location: 'Kochi / Munnar / Thekkady',
    tags: ['Individual AC Vents', 'Reclining Seats', 'Group Travel Specialist'],
    specs: ['ESP with ABS', 'Individual USB Ports', 'Massive Luggage Space', 'Panoramic Windows']
  }
];

export default function Vehicles() {
  const { currency, t } = useApp();
  const { openBooking } = useBooking();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(12000);

  const categories = ['All', 'SUV', 'Sedan', 'EV', 'Bike', 'Luxury'];
  const locations = [
    'All',
    'Munnar / Kochi',
    'Goa / Coastal Belt',
    'Jaipur / Golden Triangle',
    'Leh Ladakh / Manali',
    'Bengaluru / Mysore',
    'Delhi / NCR / Agra',
    'Mumbai / Pune',
    'Rishikesh / Uttarakhand'
  ];

  const filteredVehicles = useMemo(() => {
    return VEHICLE_FLEET.filter((veh) => {
      const matchCategory = selectedCategory === 'All' || veh.category === selectedCategory;
      const matchLocation = selectedLocation === 'All' || veh.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchPrice = veh.price_per_day <= maxPrice;
      const matchSearch =
        searchQuery === '' ||
        veh.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        veh.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        veh.fuel_type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchLocation && matchPrice && matchSearch;
    });
  }, [selectedCategory, selectedLocation, searchQuery, maxPrice]);

  const handleBookVehicle = (veh) => {
    openBooking({
      id: veh.id,
      title: veh.name,
      type: 'vehicle',
      destination: veh.location,
      price: veh.price_per_day,
      image: veh.image,
      duration: 'Per Day Rental',
      fuel: veh.fuel_type,
      seats: veh.seating_capacity
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 border border-teal-500/30 rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center space-x-1.5 text-teal-400 text-xs font-bold uppercase tracking-wider bg-teal-950 px-3 py-1 rounded-full border border-teal-500/40">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Sanitation & Zero Hidden Deposit Fleet</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Self-Drive & Chauffeured Vehicle Rentals
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore India on your own terms. Choose from rugged 4x4 offroaders in Ladakh, scenic convertibles & cruisers in Goa, eco-conscious EVs, and chauffeur-driven luxury sedans.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs">
              <div className="flex items-center space-x-2 text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>100% Comprehensive Insurance</span>
              </div>
              <div className="flex items-center space-x-2 text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>24/7 National Roadside Assistance</span>
              </div>
              <div className="flex items-center space-x-2 text-teal-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Doorstep Delivery & Airport Pickup</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by car model, bike, fuel type, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            {/* Location Selector */}
            <div className="w-full lg:w-64">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-teal-500 transition-colors"
              >
                <option value="All">All Locations & Hubs</option>
                {locations.filter(l => l !== 'All').map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div className="w-full lg:w-64 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 flex flex-col justify-center">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Max Budget:</span>
                <strong className="text-teal-400">{formatCurrency(maxPrice, currency)}/day</strong>
              </div>
              <input
                type="range"
                min="1400"
                max="12000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-teal-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-900/30'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat === 'All' ? 'All Fleet' : cat === 'EV' ? 'Electric (EV)' : cat}
              </button>
            ))}
            <span className="ml-auto text-xs text-slate-400 self-center">
              Showing <strong>{filteredVehicles.length}</strong> available vehicle(s)
            </span>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
            <Car className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No vehicles match your criteria</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your price range, clearing the search term, or selecting "All Fleet".
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedLocation('All'); setSearchQuery(''); setMaxPrice(12000); }}
              className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-500 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((veh) => (
              <div
                key={veh.id}
                className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group shadow-lg"
              >
                {/* Vehicle Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={veh.image}
                    alt={veh.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-[10px] font-bold text-teal-300 border border-slate-800">
                      {veh.category}
                    </span>
                    {veh.fuel_type === 'Electric' && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 text-[10px] font-bold text-emerald-300 border border-emerald-700 flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>EV</span>
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300">
                    ★ {veh.rating} ({veh.reviewsCount})
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-teal-400 transition-colors">
                      {veh.name}
                    </h3>

                    <div className="flex items-center space-x-1 text-[11px] text-slate-400 mt-1">
                      <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                      <span>{veh.location}</span>
                    </div>

                    {/* Quick Specs Pill Row */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
                      <div className="flex items-center space-x-1.5 bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                        <Users className="w-3.5 h-3.5 text-teal-400" />
                        <span>{veh.seating_capacity} Seats</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                        <Fuel className="w-3.5 h-3.5 text-teal-400" />
                        <span>{veh.fuel_type}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                        <Car className="w-3.5 h-3.5 text-teal-400" />
                        <span className="truncate">{veh.transmission}</span>
                      </div>
                    </div>

                    {/* Features tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {veh.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500">Rent from</div>
                      <div className="text-lg font-black text-white">
                        {formatCurrency(veh.price_per_day, currency)}
                        <span className="text-xs font-normal text-slate-400"> / day</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBookVehicle(veh)}
                      className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-900/30 flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>Reserve Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rental Policies & Guidelines */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400">
            TripCraft Rental Transparency Guarantee
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="space-y-1">
              <strong className="text-white block font-semibold">Valid Driving License</strong>
              <p className="text-slate-400">
                Original Indian Driving License (or International Driving Permit for foreign travelers) required at pickup. Minimum age: 21 years.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-semibold">Unlimited Kilometers</strong>
              <p className="text-slate-400">
                All rentals include unlimited kilometers with no per-km overage fee, perfect for long highland road trips.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-semibold">Free Cancellation</strong>
              <p className="text-slate-400">
                100% full refund available up to 24 hours prior to scheduled vehicle pickup time. No questions asked.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
