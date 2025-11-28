const express = require('express');
const { admin } = require('../config/firebase');
const { COLLECTIONS, TICKET_STATUS } = require('../config/firestore-schema');
const { sendOrganizerReply } = require('../services/telegram');

const router = express.Router();

/**
 * GET /api/tickets - List tickets (with optional eventId filter)
 */
router.get('/', async (req, res) => {
    try {
        const db = admin.firestore();
        const { eventId, status } = req.query;

        let query = db.collection(COLLECTIONS.TICKETS);

        if (eventId) {
            query = query.where('eventId', '==', eventId);
        }
        if (status) {
            query = query.where('status', '==', status);
        }

        const snapshot = await query.orderBy('createdAt', 'desc').get();

        const tickets = [];
        snapshot.forEach(doc => {
            tickets.push({ id: doc.id, ...doc.data() });
        });

        res.json({ tickets });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

/**
 * POST /api/tickets/:id/reply - Reply to ticket
 */
router.post('/:id/reply', async (req, res) => {
    try {
        const { replyText } = req.body;

        await sendOrganizerReply(req.params.id, replyText);

        res.json({ success: true });
    } catch (error) {
        console.error('Error replying to ticket:', error);
        res.status(500).json({ error: 'Failed to send reply' });
    }
});

/**
 * PUT /api/tickets/:id/status - Update ticket status
 */
router.put('/:id/status', async (req, res) => {
    try {
        const db = admin.firestore();
        const { status } = req.body;

        await db.collection(COLLECTIONS.TICKETS).doc(req.params.id).update({
            status,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating ticket status:', error);
        res.status(500).json({ error: 'Failed to update ticket status' });
    }
});

module.exports = router;
