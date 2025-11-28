const crypto = require('crypto');
const axios = require('axios');
const { admin } = require('../config/firebase');
const { COLLECTIONS, PAYMENT_STATUS } = require('../config/firestore-schema');

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

/**
 * Create Razorpay order
 */
async function createOrder(amount, receiptId, notes = {}) {
    try {
        const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

        const response = await axios.post(
            'https://api.razorpay.com/v1/orders',
            {
                amount: amount * 100, // Convert to paise
                currency: 'INR',
                receipt: receiptId,
                notes
            },
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Razorpay order creation error:', error.response?.data || error.message);
        throw new Error('Failed to create payment order');
    }
}

/**
 * Verify Razorpay payment signature
 */
function verifyPaymentSignature(orderId, paymentId, signature) {
    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(text)
        .digest('hex');

    return generated_signature === signature;
}

/**
 * Verify Razorpay webhook signature
 */
function verifyWebhookSignature(payload, signature) {
    const generated_signature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(payload)
        .digest('hex');

    return generated_signature === signature;
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(orderId, paymentId) {
    const db = admin.firestore();

    // Find registration by orderId
    const regsSnapshot = await db.collection(COLLECTIONS.REGISTRATIONS)
        .where('razorpayOrderId', '==', orderId)
        .limit(1)
        .get();

    if (regsSnapshot.empty) {
        console.error('Registration not found for order:', orderId);
        return;
    }

    const regDoc = regsSnapshot.docs[0];

    // Update registration
    await regDoc.ref.update({
        paymentStatus: PAYMENT_STATUS.PAID,
        razorpayPaymentId: paymentId,
        paidAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`✅ Payment successful for registration ${regDoc.id}`);
}

/**
 * Handle failed payment
 */
async function handlePaymentFailure(orderId) {
    const db = admin.firestore();

    const regsSnapshot = await db.collection(COLLECTIONS.REGISTRATIONS)
        .where('razorpayOrderId', '==', orderId)
        .limit(1)
        .get();

    if (regsSnapshot.empty) {
        console.error('Registration not found for order:', orderId);
        return;
    }

    const regDoc = regsSnapshot.docs[0];

    await regDoc.ref.update({
        paymentStatus: PAYMENT_STATUS.FAILED
    });

    console.log(`❌ Payment failed for registration ${regDoc.id}`);
}

module.exports = {
    createOrder,
    verifyPaymentSignature,
    verifyWebhookSignature,
    handlePaymentSuccess,
    handlePaymentFailure
};
