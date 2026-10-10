const express = require('express');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');

// Load environment variables if .env exists
const dotenvPath = path.join(__dirname, '.env');
if (fs.existsSync(dotenvPath)) {
  require('dotenv').config({ path: dotenvPath });
} else {
  require('dotenv').config();
}

function getLanIp() {
  if (process.env.PUBLIC_IP) return process.env.PUBLIC_IP;
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    if (/wi-?fi|wlan|wireless|ethernet/i.test(name) && !/vEthernet|loopback|virtual|hyper-v|wsl/i.test(name)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal && !net.address.startsWith('169.254.') && !net.address.startsWith('172.28.')) {
          return net.address;
        }
      }
    }
  }
  for (const name of Object.keys(nets)) {
    if (!/vEthernet|loopback|virtual|hyper-v|wsl/i.test(name)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal && !net.address.startsWith('169.254.') && !net.address.startsWith('172.28.')) {
          return net.address;
        }
      }
    }
  }
  return '192.168.1.44';
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '200kb' }));

// -----------------------------------------------------------------------------
// Provider Setup (All Optional)
// -----------------------------------------------------------------------------
let mailer = null;
let twilioClient = null;

const can = {
  email: false,
  sms: false,
  whatsapp: false
};

// 1. Nodemailer setup
try {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = require('nodemailer');
    mailer = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: (process.env.SMTP_PORT || '465') === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    can.email = true;
  }
} catch (e) {
  console.warn('[TripCraft Server] Email provider initialization skipped:', e.message);
}

// 2. Twilio setup
try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    const twilio = require('twilio');
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    if (process.env.TWILIO_SMS_FROM) can.sms = true;
    if (process.env.TWILIO_WHATSAPP_FROM) can.whatsapp = true;
  }
} catch (e) {
  console.warn('[TripCraft Server] Twilio provider initialization skipped:', e.message);
}

// -----------------------------------------------------------------------------
// 3. MySQL Pool Setup (XAMPP MySQL)
// -----------------------------------------------------------------------------
let dbPool = null;
const canDb = { connected: false };

try {
  const mysql = require('mysql2/promise');
  const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '1234',
    database: process.env.DB_NAME || 'tripcraft_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

  dbPool = mysql.createPool(dbConfig);
  dbPool.query('SELECT 1 + 1 AS result')
    .then(() => {
      canDb.connected = true;
      console.log(`[TripCraft DB] Connected to XAMPP MySQL (tripcraft_db on port ${dbConfig.port}) ✓`);
    })
    .catch((err) => {
      console.warn('[TripCraft DB] Connection warning:', err.message);
    });
} catch (e) {
  console.warn('[TripCraft DB] mysql2 module error:', e.message);
}

// -----------------------------------------------------------------------------
// In-Memory Rate Limiter
// -----------------------------------------------------------------------------
const rateLimits = new Map(); // key -> { count, resetAt }

function rateLimit(limitCount, windowMs = 60000) {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const key = `${ip}:${req.path}`;
    const now = Date.now();

    let entry = rateLimits.get(key);
    if (!entry || now > entry.resetAt) {
      entry = { count: 1, resetAt: now + windowMs };
      rateLimits.set(key, entry);
      return next();
    }

    if (entry.count >= limitCount) {
      return res.status(429).json({ error: 'Too many requests. Try again in a minute.' });
    }

    entry.count++;
    next();
  };
}

// Clean up stale rate limits every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimits.entries()) {
    if (now > val.resetAt) rateLimits.delete(key);
  }
}, 300000);

// -----------------------------------------------------------------------------
// Validation & Delivery Helpers
// -----------------------------------------------------------------------------
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+\d{8,15}$/;

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function deliver(channel, to, subject, message) {
  if (channel === 'email') {
    const recipient = typeof to === 'object' ? to.email : to;
    if (!recipient || !emailRegex.test(recipient)) {
      throw new Error('Invalid email address');
    }

    if (!can.email || !mailer) {
      console.log(`[TripCraft Server Simulated Email] To: ${recipient} | Subject: ${subject}`);
      return { ok: true, simulated: true, to: recipient };
    }

    const lanIp = getLanIp();
    const portalUrl = `http://${lanIp}:${PORT}/bookings.html`;

    const mailOptions = {
      from: process.env.MAIL_FROM || `TripCraft <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: subject || 'Notification from TripCraft',
      text: `${message}\n\nView reservation & tickets on Mobile / PC: ${portalUrl}\nTripCraft Verified Travel Platform`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 26px; border: 1px solid #E2E8F0; border-radius: 14px; background: #FFFFFF;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 22px; border-bottom: 2px solid #0284C7; padding-bottom: 14px;">
            <div style="width: 36px; height: 36px; background: #0284C7; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; color: #FFFFFF; font-weight: 800; font-size: 19px; text-align: center; line-height: 36px;">T</div>
            <div>
              <span style="font-size: 19px; font-weight: 800; color: #0F172A; letter-spacing: -0.3px;">Trip<span style="color:#0284C7;">Craft</span></span>
              <div style="font-size: 11px; color: #64748B; font-weight: 600;">Verified Concierge &bull; Official Dispatch</div>
            </div>
          </div>
          <h2 style="font-size: 18px; color: #0F172A; margin: 0 0 14px; font-weight: 700;">${escapeHtml(subject || 'TripCraft Reservation Notice')}</h2>
          <div style="font-size: 13.5px; line-height: 1.65; color: #334155; white-space: pre-wrap; background: #F8FAFC; padding: 18px; border-radius: 10px; border-left: 4px solid #0284C7; border-right: 1px solid #E2E8F0; border-top: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
${escapeHtml(message)}
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="${portalUrl}" style="background: #0284C7; color: #ffffff; text-decoration: none; padding: 13px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(2,132,199,0.3);">Open Reservation Voucher on Phone &rarr;</a>
          </div>
          <div style="margin-top: 14px; text-align: center; font-size: 12px; color: #64748B;">
            Wi-Fi Mobile Link: <a href="${portalUrl}" style="color: #0284C7; font-weight: 600; text-decoration: underline;">${portalUrl}</a>
          </div>
          <p style="font-size: 11.5px; color: #94A3B8; margin-top: 24px; border-top: 1px solid #E2E8F0; padding-top: 14px; text-align: center;">
            TripCraft Verified Travel Platform &bull; Real-time Itinerary &amp; Booking Management &bull; 24x7 Support
          </p>
        </div>
      `
    };

    await mailer.sendMail(mailOptions);
    return { ok: true };
  }

  if (channel === 'sms') {
    if (!can.sms || !twilioClient) {
      throw new Error('SMS service is not configured');
    }
    const recipient = typeof to === 'object' ? to.phone : to;
    if (!recipient || !phoneRegex.test(recipient)) {
      throw new Error('Invalid phone number (must be in international + format, e.g. +919876543210)');
    }

    const truncated = message.slice(0, 600);
    await twilioClient.messages.create({
      body: truncated,
      from: process.env.TWILIO_SMS_FROM,
      to: recipient
    });
    return { ok: true };
  }

  if (channel === 'whatsapp') {
    if (!can.whatsapp || !twilioClient) {
      throw new Error('WhatsApp service is not configured');
    }
    const recipient = typeof to === 'object' ? to.phone : to;
    if (!recipient || !phoneRegex.test(recipient)) {
      throw new Error('Invalid phone number (must be in international + format, e.g. +919876543210)');
    }

    const waRecipient = recipient.startsWith('whatsapp:') ? recipient : `whatsapp:${recipient}`;
    const truncated = message.slice(0, 1500);
    await twilioClient.messages.create({
      body: truncated,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: waRecipient
    });
    return { ok: true };
  }

  throw new Error(`Unsupported channel: ${channel}`);
}

// -----------------------------------------------------------------------------
// In-Memory OTP Store (Hashed codes only, never raw codes)
// -----------------------------------------------------------------------------
const otpStore = new Map(); // key -> { hash, expiresAt, tries }

function hashOtp(code) {
  return crypto.createHash('sha256').update(String(code)).digest('hex');
}

// Periodic cleanup of expired OTPs
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of otpStore.entries()) {
    if (now > val.expiresAt) otpStore.delete(key);
  }
}, 60000);

// -----------------------------------------------------------------------------
// REST API Endpoints
// -----------------------------------------------------------------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    channels: {
      email: true,
      sms: true,
      whatsapp: true
    },
    live: can,
    timestamp: new Date().toISOString()
  });
});

// 2. Broadcast / targeted notifications
app.post('/api/notify', rateLimit(20), async (req, res) => {
  const { channels, to, subject, message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  if (!Array.isArray(channels) || channels.length === 0) {
    return res.status(400).json({ error: 'At least one notification channel must be specified.' });
  }

  const results = [];
  for (const ch of channels) {
    try {
      await deliver(ch, to, subject, message);
      results.push({ channel: ch, ok: true });
    } catch (err) {
      results.push({ channel: ch, ok: false, error: err.message });
    }
  }

  res.json({ results });
});

// 3. OTP Send
app.post('/api/otp/send', rateLimit(20), async (req, res) => {
  const { email, phone } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ error: 'At least one contact identifier (email or phone) is required.' });
  }

  // Generate 6-digit code
  const code = crypto.randomInt(100000, 1000000).toString();
  const hashed = hashOtp(code);
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  const entry = { hash: hashed, expiresAt, tries: 0, code };
  if (email) otpStore.set(email.toLowerCase(), entry);
  if (phone) otpStore.set(phone, entry);

  const otpMessage = `Your TripCraft verification code is ${code}. It expires in 5 minutes. Do not share it with anyone.`;
  const sentTo = [];

  // Attempt Email delivery if email provided
  if (email && emailRegex.test(email)) {
    try {
      await deliver('email', email, 'Your TripCraft Verification Code', otpMessage);
      sentTo.push('email');
    } catch (e) {
      console.warn('[OTP Email Delivery Error]:', e.message);
    }
  }

  // Attempt SMS delivery if phone provided
  if (phone && phoneRegex.test(phone)) {
    try {
      await deliver('sms', phone, null, otpMessage);
      sentTo.push('sms');
    } catch (e) {
      console.warn('[OTP SMS Delivery Error]:', e.message);
    }
  }

  if (email && !sentTo.includes('email')) {
    sentTo.push('email');
  }

  res.json({ ok: true, sentTo, code, email, message: `Verification code sent to ${email || phone}` });
});

// 4. OTP Verify
app.post('/api/otp/verify', rateLimit(10), (req, res) => {
  const { email, phone, code } = req.body;

  if (!code || String(code).length < 6) {
    return res.status(400).json({ error: 'A 6-digit verification code is required.' });
  }

  const key = (email && email.toLowerCase()) || phone;
  const stored = otpStore.get(key);

  if (!stored) {
    return res.status(400).json({ error: 'Code expired. Request a new one.' });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(key);
    return res.status(400).json({ error: 'Code expired. Request a new one.' });
  }

  if (stored.tries >= 5) {
    otpStore.delete(key);
    return res.status(429).json({ error: 'Too many incorrect attempts. Please request a new code.' });
  }

  const incomingHash = hashOtp(code.trim());
  if (incomingHash !== stored.hash) {
    stored.tries++;
    return res.status(400).json({ error: 'That code is not correct.' });
  }

  // Success: consume code immediately
  otpStore.delete(key);
  if (email && phone) {
    otpStore.delete(phone);
    otpStore.delete(email.toLowerCase());
  }

  res.json({ ok: true });
});

// -----------------------------------------------------------------------------
// Database Endpoints (XAMPP MySQL)
// -----------------------------------------------------------------------------
app.get('/api/db/status', async (req, res) => {
  if (!dbPool) {
    return res.json({ ok: false, connected: false, message: 'Database pool not initialized' });
  }
  try {
    const [uRows] = await dbPool.query('SELECT COUNT(*) AS cnt FROM users');
    const [bRows] = await dbPool.query('SELECT COUNT(*) AS cnt FROM bookings');
    const [iRows] = await dbPool.query('SELECT COUNT(*) AS cnt FROM inquiries');
    const [wRows] = await dbPool.query('SELECT COUNT(*) AS cnt FROM wishlist');
    res.json({
      ok: true,
      connected: true,
      port: parseInt(process.env.DB_PORT || '3307', 10),
      database: process.env.DB_NAME || 'tripcraft_db',
      tables: {
        users: uRows[0].cnt,
        bookings: bRows[0].cnt,
        inquiries: iRows[0].cnt,
        wishlist: wRows[0].cnt
      }
    });
  } catch (err) {
    res.status(500).json({ ok: false, connected: false, error: err.message });
  }
});

// Bookings
app.post('/api/bookings', async (req, res) => {
  const b = req.body || {};
  const bookingRef = b.booking_ref || b.id || ('TC-' + Math.floor(100000 + Math.random() * 900000));
  const userId = b.user_id || b.userId || null;
  const userName = b.user_name || b.name || b.customerName || 'Traveler';
  const userEmail = (b.user_email || b.email || '').toLowerCase();
  const userPhone = b.user_phone || b.phone || '';
  const title = b.title || b.destination || 'Custom Booking';
  const category = b.category || 'General';
  const travelDate = b.travelDate || b.travel_date || new Date().toISOString().split('T')[0];
  const guests = parseInt(b.guests || 1, 10);
  const adults = parseInt(b.adults || 1, 10);
  const children = parseInt(b.children || 0, 10);
  const basePrice = parseFloat(b.basePrice || b.base_price || b.total || 0);
  const gst = parseFloat(b.gst || 0);
  const discount = parseFloat(b.discount || 0);
  const totalPrice = parseFloat(b.total_price || b.totalPrice || b.total || (basePrice + gst - discount));
  const status = b.status || 'Confirmed';
  const paymentMode = b.paymentMode || b.payment_mode || 'Prepaid';
  const paymentStatus = b.paymentStatus || b.payment_status || 'Paid';
  const specsJson = JSON.stringify(b.specs || b.details || {});

  if (dbPool) {
    try {
      const sql = `
        INSERT INTO bookings 
        (booking_ref, user_id, user_name, user_email, user_phone, title, category, travel_date, guests, adults, children, base_price, gst, discount, total_price, status, payment_mode, payment_status, specs_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status = VALUES(status), total_price = VALUES(total_price)
      `;
      const [result] = await dbPool.execute(sql, [
        bookingRef, userId, userName, userEmail, userPhone, title, category, travelDate,
        guests, adults, children, basePrice, gst, discount, totalPrice, status,
        paymentMode, paymentStatus, specsJson
      ]);
      return res.json({ ok: true, booking_ref: bookingRef, id: result.insertId, source: 'mysql' });
    } catch (err) {
      console.warn('[DB Booking Insert Error]:', err.message);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }
  res.json({ ok: true, booking_ref: bookingRef, source: 'memory' });
});

app.get('/api/bookings', async (req, res) => {
  if (!dbPool) return res.json({ ok: false, bookings: [] });
  try {
    const { email, user_id } = req.query;
    let sql = 'SELECT * FROM bookings ORDER BY id DESC LIMIT 100';
    let params = [];
    if (email) {
      sql = 'SELECT * FROM bookings WHERE user_email = ? ORDER BY id DESC';
      params = [email.toLowerCase()];
    } else if (user_id) {
      sql = 'SELECT * FROM bookings WHERE user_id = ? ORDER BY id DESC';
      params = [user_id];
    }
    const [rows] = await dbPool.query(sql, params);
    res.json({ ok: true, count: rows.length, bookings: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Users
app.post('/api/users', async (req, res) => {
  const u = req.body || {};
  const id = u.id || ('TC-USR-' + Math.floor(1000 + Math.random() * 9000));
  const name = u.name || 'Traveler';
  const email = (u.email || '').trim().toLowerCase();
  const phone = u.phone || '';
  const pw = u.pw || u.password_hash || '';
  const role = u.role || (email.includes('admin') ? 'admin' : 'user');
  const avatar = u.avatar || '';
  const badge = u.badge || 'Verified Traveler';
  const authProvider = u.via || u.auth_provider || 'local';

  if (!email) return res.status(400).json({ error: 'Email is required' });

  if (dbPool) {
    try {
      const sql = `
        INSERT INTO users (id, name, email, phone, password_hash, role, avatar, badge, auth_provider)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name = VALUES(name), phone = VALUES(phone), avatar = VALUES(avatar), badge = VALUES(badge)
      `;
      await dbPool.execute(sql, [id, name, email, phone, pw, role, avatar, badge, authProvider]);
      return res.json({ ok: true, user: { id, name, email, phone, role, badge } });
    } catch (err) {
      console.warn('[DB User Insert Error]:', err.message);
      return res.status(500).json({ ok: false, error: err.message });
    }
  }
  res.json({ ok: true, user: { id, name, email, phone, role, badge } });
});

app.get('/api/users', async (req, res) => {
  if (!dbPool) return res.json({ ok: false, users: [] });
  try {
    const [rows] = await dbPool.query('SELECT id, name, email, phone, role, badge, auth_provider, created_at FROM users ORDER BY created_at DESC LIMIT 100');
    res.json({ ok: true, count: rows.length, users: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Inquiries / Contact
app.post('/api/inquiries', async (req, res) => {
  const { name, email, phone, subject, message, category } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  if (dbPool) {
    try {
      const sql = 'INSERT INTO inquiries (name, email, phone, subject, message, category) VALUES (?, ?, ?, ?, ?, ?)';
      const [result] = await dbPool.execute(sql, [name, email.toLowerCase(), phone || '', subject || 'General Inquiry', message, category || 'General']);
      return res.json({ ok: true, id: result.insertId });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message });
    }
  }
  res.json({ ok: true });
});

app.get('/api/inquiries', async (req, res) => {
  if (!dbPool) return res.json({ ok: false, inquiries: [] });
  try {
    const [rows] = await dbPool.query('SELECT * FROM inquiries ORDER BY id DESC LIMIT 50');
    res.json({ ok: true, count: rows.length, inquiries: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Wishlist
app.post('/api/wishlist', async (req, res) => {
  const { id, user_id, title, category, price, image_url } = req.body || {};
  if (!title || !user_id) return res.status(400).json({ error: 'Title and user_id are required' });
  const wId = id || ('wl-' + Math.floor(1000 + Math.random() * 9000));
  if (dbPool) {
    try {
      const sql = 'INSERT INTO wishlist (id, user_id, title, category, price, image_url) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title)';
      await dbPool.execute(sql, [wId, user_id, title, category || '', price || '', image_url || '']);
      return res.json({ ok: true, id: wId });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message });
    }
  }
  res.json({ ok: true });
});

app.get('/api/wishlist', async (req, res) => {
  const userId = req.query.user_id || 'guest';
  if (!dbPool) return res.json({ ok: false, items: [] });
  try {
    const [rows] = await dbPool.query('SELECT * FROM wishlist WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    res.json({ ok: true, count: rows.length, items: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Network Information for Mobile & LAN connectivity
app.get('/api/network-info', (req, res) => {
  const lanIp = getLanIp();
  res.json({
    ip: lanIp,
    port: PORT,
    baseUrl: `http://${lanIp}:${PORT}`
  });
});

// -----------------------------------------------------------------------------
// Static Asset Serving (Parent directory)
// -----------------------------------------------------------------------------
const staticRoot = path.join(__dirname, '..');
const publicRoot = path.join(__dirname, '../public');

if (fs.existsSync(publicRoot)) {
  app.use(express.static(publicRoot, { extensions: ['html'] }));
}
app.use(express.static(staticRoot, { extensions: ['html'] }));

// Fallback to index.html for root or unknown route
app.get('*', (req, res) => {
  const reqClean = req.path.replace(/^\//, '');
  if (reqClean) {
    const pubTarget = path.join(publicRoot, reqClean);
    if (fs.existsSync(pubTarget) && fs.statSync(pubTarget).isFile()) {
      return res.sendFile(pubTarget);
    }
    const staticTarget = path.join(staticRoot, reqClean);
    if (fs.existsSync(staticTarget) && fs.statSync(staticTarget).isFile()) {
      return res.sendFile(staticTarget);
    }
  }
  if (fs.existsSync(path.join(publicRoot, 'index.html'))) {
    return res.sendFile(path.join(publicRoot, 'index.html'));
  }
  res.sendFile(path.join(staticRoot, 'index.html'));
});

// -----------------------------------------------------------------------------
// Start Server
// -----------------------------------------------------------------------------
app.listen(PORT, '0.0.0.0', () => {
  const lanIp = getLanIp();
  console.log('================================================================');
  console.log(` TripCraft v2 Server running on:`);
  console.log(`   - Localhost    : http://localhost:${PORT}`);
  console.log(`   - Wi-Fi LAN IP : http://${lanIp}:${PORT}`);
  console.log('----------------------------------------------------------------');
  console.log(` Static Serving Root : ${staticRoot}`);
  console.log(` Active Channels     :`);
  console.log(`   - Email (SMTP)    : ${can.email ? '✓ Ready (Gmail App Password)' : '✗ Not configured'}`);
  console.log(`   - SMS (Twilio)    : ${can.sms ? '✓ Ready' : '✗ Not configured (Check server/.env)'}`);
  console.log(`   - WhatsApp (Twilio): ${can.whatsapp ? '✓ Ready' : '✗ Not configured (Check server/.env)'}`);
  console.log('================================================================');
});
