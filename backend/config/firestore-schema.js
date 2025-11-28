/**
 * Firestore Data Model Schema
 * 
 * Collections:
 * 
 * 1. events/{eventId}
 *    - name: string
 *    - description: string
 *    - eventCode: string (unique, for joining)
 *    - organizerId: string (Firebase Auth UID)
 *    - organizerTelegramChatId: string (optional)
 *    - location: { lat: number, lng: number, address: string }
 *    - date: timestamp
 *    - ticketPrice: number
 *    - indoorMapUrl: string (Firebase Storage URL)
 *    - indoorMapPOIs: array of { id, name, x, y, description }
 *    - createdAt: timestamp
 *    - updatedAt: timestamp
 * 
 * 2. events/{eventId}/documents/{documentId}
 *    - filename: string
 *    - storageUrl: string
 *    - uploadedAt: timestamp
 *    - processedAt: timestamp (null if not processed)
 *    - chunkCount: number
 * 
 * 3. events/{eventId}/chunks/{chunkId}
 *    - documentId: string
 *    - text: string (chunk content)
 *    - embedding: array of numbers (768-dim vector from Gemini)
 *    - position: number (chunk index in document)
 *    - createdAt: timestamp
 * 
 * 4. registrations/{registrationId}
 *    - eventId: string
 *    - userId: string (Firebase Auth UID or Telegram user ID)
 *    - name: string
 *    - email: string
 *    - telegramUserId: string (optional)
 *    - telegramChatId: string (optional)
 *    - paymentStatus: string (pending, paid, failed)
 *    - razorpayOrderId: string
 *    - razorpayPaymentId: string
 *    - amount: number
 *    - registeredAt: timestamp
 * 
 * 5. tickets/{ticketId}
 *    - eventId: string
 *    - userId: string (Telegram user ID)
 *    - chatId: string (Telegram chat ID)
 *    - message: string (user's question/report)
 *    - category: string (faq, report, general)
 *    - status: string (open, answered, closed)
 *    - shouldFlag: boolean
 *    - confidence: number
 *    - autoAnswer: string (optional, from RAG)
 *    - organizerReply: string (optional)
 *    - createdAt: timestamp
 *    - answeredAt: timestamp
 * 
 * 6. messages/{messageId}
 *    - eventId: string
 *    - userId: string
 *    - chatId: string
 *    - message: string
 *    - fromOrganizer: boolean
 *    - createdAt: timestamp
 * 
 * Firebase Storage Layout:
 * 
 * /events/{eventId}/documents/{filename}
 * /events/{eventId}/indoor-maps/{filename}
 */

module.exports = {
    COLLECTIONS: {
        EVENTS: 'events',
        REGISTRATIONS: 'registrations',
        TICKETS: 'tickets',
        MESSAGES: 'messages'
    },

    SUBCOLLECTIONS: {
        DOCUMENTS: 'documents',
        CHUNKS: 'chunks'
    },

    PAYMENT_STATUS: {
        PENDING: 'pending',
        PAID: 'paid',
        FAILED: 'failed'
    },

    TICKET_STATUS: {
        OPEN: 'open',
        ANSWERED: 'answered',
        CLOSED: 'closed'
    },

    TICKET_CATEGORY: {
        FAQ: 'faq',
        REPORT: 'report',
        GENERAL: 'general'
    }
};
