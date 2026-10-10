// Database Connection Pool Manager (MySQL2) with Automatic Fallback
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

let pool = null;
let isConnected = false;

// In-Memory Data Store fallback if local MySQL is offline
const inMemoryStore = {
  users: [
    { id: 'usr_admin_01', name: 'Aakash Mehta', email: 'admin@tripcraft.io', password_hash: 'Admin@123', role: 'admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80', phone: '+91 98765 43210', loyalty_tier: 'Platinum', loyalty_points: 12500 },
    { id: 'usr_solo_02', name: 'Priya Sharma', email: 'priya.backpacker@gmail.com', password_hash: 'Travel@123', role: 'traveler', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80', phone: '+91 94455 12345', loyalty_tier: 'Gold', loyalty_points: 4800 },
    { id: 'usr_family_03', name: 'Vikram & Neha Iyer', email: 'vikram.family@tripcraft.io', password_hash: 'Family@123', role: 'traveler', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80', phone: '+91 98840 98765', loyalty_tier: 'Silver', loyalty_points: 2100 },
    { id: 'usr_luxury_04', name: 'Ananya Roy', email: 'ananya.luxury@gmail.com', password_hash: 'Luxury@123', role: 'traveler', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80', phone: '+91 97112 34567', loyalty_tier: 'Gold', loyalty_points: 8900 },
    { id: 'usr_guide_05', name: 'Rajesh Kulkarni', email: 'rajesh.guide@tripcraft.io', password_hash: 'Guide@123', role: 'guide', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80', phone: '+91 99887 66554', loyalty_tier: 'Certified Partner', loyalty_points: 6200 }
  ],
  bookings: [
    {
      id: 'TC-BK-2026-884210',
      user_id: 'usr_solo_02',
      item_title: 'Munnar Misty Highland Trails & Tea Sanctuary',
      item_type: 'package',
      destination: 'Munnar, Kerala',
      travel_date: '2026-10-18',
      adults: 2,
      children: 1,
      child_ages: [7],
      rooms: 1,
      nights: 3,
      fare_summary: { grandTotal: 34157, gst: 3660 },
      status: 'Confirmed',
      contact_info: { fullName: 'Priya Sharma', email: 'priya.backpacker@gmail.com', phone: '+91 94455 12345' },
      payment_details: { method: 'upi', accountRef: 'priya@oksbi' },
      created_at: new Date().toISOString()
    }
  ],
  destinations: [
    { id: 'dest_munnar', name: 'Munnar', state: 'Kerala', category: 'Hill Station', rating: 4.85, base_price: 4200, safety_score: 94, hero_image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80' },
    { id: 'dest_jaipur', name: 'Jaipur', state: 'Rajasthan', category: 'Heritage', rating: 4.90, base_price: 3800, safety_score: 90, hero_image: 'https://images.unsplash.com/photo-1603288940316-25f0a20ba967?auto=format&fit=crop&w=1200&q=80' },
    { id: 'dest_ladakh', name: 'Leh Ladakh', state: 'Ladakh UT', category: 'Adventure', rating: 4.95, base_price: 8500, safety_score: 96, hero_image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80' },
    { id: 'dest_goa', name: 'South Goa', state: 'Goa', category: 'Beach', rating: 4.82, base_price: 3200, safety_score: 92, hero_image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80' },
    { id: 'dest_andaman', name: 'Havelock Island', state: 'Andaman & Nicobar', category: 'Island & Marine', rating: 4.92, base_price: 7200, safety_score: 95, hero_image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9cab193?auto=format&fit=crop&w=1200&q=80' },
    { id: 'dest_hampi', name: 'Hampi', state: 'Karnataka', category: 'Heritage & Trekking', rating: 4.88, base_price: 2800, safety_score: 91, hero_image: 'https://images.unsplash.com/photo-1600100397608-f010e42e1281?auto=format&fit=crop&w=1200&q=80' }
  ]
};

async function initDatabase() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tripcraft_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const conn = await pool.getConnection();
    conn.release();
    isConnected = true;
    console.log(' [Database] MySQL Database Connected Successfully to tripcraft_db');
  } catch (err) {
    isConnected = false;
    console.warn(' [Database] MySQL Server not responding on localhost:3306. Operating in resilient SQL memory mode.');
    console.warn('  -> Tip: Run "mysql -u root -p < database/schema.sql" to setup local tables.');
  }
}

async function query(sql, params = []) {
  if (isConnected && pool) {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (err) {
      console.error('MySQL Query Execution Error:', err.message);
      throw err;
    }
  }

  // Fallback simulator for essential queries
  const upper = sql.trim().toUpperCase();
  if (upper.startsWith('SELECT') && upper.includes('FROM USERS')) {
    if (params.length > 0) {
      const user = inMemoryStore.users.find(u => u.email.toLowerCase() === params[0].toLowerCase());
      return user ? [user] : [];
    }
    return inMemoryStore.users;
  }

  if (upper.startsWith('SELECT') && upper.includes('FROM BOOKINGS')) {
    return inMemoryStore.bookings;
  }

  if (upper.startsWith('SELECT') && upper.includes('FROM DESTINATIONS')) {
    return inMemoryStore.destinations;
  }

  if (upper.startsWith('INSERT INTO BOOKINGS')) {
    const newBooking = params[0] || {};
    inMemoryStore.bookings.unshift(newBooking);
    return { affectedRows: 1, insertId: newBooking.id };
  }

  return [];
}

module.exports = {
  initDatabase,
  query,
  inMemoryStore,
  isLiveDb: () => isConnected
};
