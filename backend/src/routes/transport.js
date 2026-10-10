const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');

// Multi-modal general endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    modes: ['flights', 'trains', 'buses', 'cabs'],
    endpoints: {
      flights: '/api/flights/search',
      trains: '/api/trains/search',
      buses: '/api/buses/search',
      cabs: '/api/cabs/search'
    }
  });
});

// Under /api/transport/flights/search, etc.
router.get('/flights/search', transportController.searchFlights);
router.get('/flights', transportController.searchFlights);
router.post('/flights/book', transportController.bookFlight);

router.get('/trains/search', transportController.searchTrains);
router.get('/trains', transportController.searchTrains);
router.post('/trains/book', transportController.bookTrain);

router.get('/buses/search', transportController.searchBuses);
router.get('/buses', transportController.searchBuses);
router.post('/buses/book', transportController.bookBus);

router.get('/cabs/search', transportController.searchCabs);
router.get('/cabs', transportController.searchCabs);
router.post('/cabs/book', transportController.bookCab);

// Subrouters for direct top-level mounts: /api/flights, /api/trains, /api/buses, /api/cabs
const flightRouter = express.Router();
flightRouter.get('/search', transportController.searchFlights);
flightRouter.get('/', transportController.searchFlights);
flightRouter.post('/book', transportController.bookFlight);

const trainRouter = express.Router();
trainRouter.get('/search', transportController.searchTrains);
trainRouter.get('/', transportController.searchTrains);
trainRouter.post('/book', transportController.bookTrain);

const busRouter = express.Router();
busRouter.get('/search', transportController.searchBuses);
busRouter.get('/', transportController.searchBuses);
busRouter.post('/book', transportController.bookBus);

const cabRouter = express.Router();
cabRouter.get('/search', transportController.searchCabs);
cabRouter.get('/', transportController.searchCabs);
cabRouter.post('/book', transportController.bookCab);

module.exports = {
  transportRouter: router,
  flightRouter,
  trainRouter,
  busRouter,
  cabRouter
};
