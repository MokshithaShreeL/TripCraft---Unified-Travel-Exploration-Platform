const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: __dirname + '/../config.env' });
require('dotenv').config();

const app = express();

// Security Middleware
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting (500 requests per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TripCraft Full-Stack Travel Platform API',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount All Domain Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/search', require('./routes/search'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/hotels', require('./routes/hotels'));
const { transportRouter, flightRouter, trainRouter, busRouter, cabRouter } = require('./routes/transport');
app.use('/api/transport', transportRouter);
app.use('/api/flights', flightRouter);
app.use('/api/trains', trainRouter);
app.use('/api/buses', busRouter);
app.use('/api/cabs', cabRouter);
app.use('/api/guides', require('./routes/guides'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/planner', require('./routes/planner'));
app.use('/api/solo-travel', require('./routes/solo'));
app.use('/api/albums', require('./routes/albums'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/itinerary', require('./routes/itinerary'));
app.use('/api/community', require('./routes/community'));
app.use('/api/recent', require('./routes/recent'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/admin', require('./routes/admin'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
