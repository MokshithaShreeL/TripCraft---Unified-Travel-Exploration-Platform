const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.get('/:bookingId', invoiceController.getInvoice);
router.get('/:bookingId/pdf', invoiceController.getInvoiceHtml);

module.exports = router;
