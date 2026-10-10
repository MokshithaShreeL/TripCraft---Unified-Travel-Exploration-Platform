const prisma = require('../models/prismaClient');
const paymentProvider = require('../integrations/paymentProvider');

exports.createOrder = async (req, res) => {
  try {
    const { bookingId, amount, customerEmail, customerPhone } = req.body;
    const order = await paymentProvider.createPaymentOrder({
      bookingId,
      amount: Number(amount) || 5000,
      customerEmail,
      customerPhone
    });
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create payment order' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { bookingId, paymentId, signature, orderId } = req.body;

    const verification = await paymentProvider.verifyPayment({ orderId, paymentId, signature });
    if (!verification.success) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    if (bookingId) {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'Confirmed' }
      });

      await prisma.payment.upsert({
        where: { booking_id: bookingId },
        update: { status: 'Success', transaction_ref: paymentId || 'TXN_' + Date.now() },
        create: {
          booking_id: bookingId,
          amount: 5000,
          transaction_ref: paymentId || 'TXN_' + Date.now(),
          status: 'Success'
        }
      });
    }

    return res.json({
      success: true,
      message: 'Payment verified and booking confirmed',
      transactionRef: verification.transactionRef
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Payment verification error', error: err.message });
  }
};
