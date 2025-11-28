# Event Management System - Complete Prototype

A comprehensive event management platform with AI-powered Q&A, Telegram bot integration, payment processing, and interactive maps.

## 🎯 Features

- **Event Management**: Create and manage events with custom details, locations, and pricing
- **AI-Powered Q&A**: Document ingestion with embeddings and RAG for intelligent question answering
- **Telegram Bot**: Automated attendee support with `/join`, `/faq`, and `/report` commands
- **Payment Processing**: Razorpay integration for ticket purchases with verification
- **Interactive Maps**: Mapbox for venue location and custom indoor maps with POI markers
- **Ticket System**: Automated classification and organizer dashboard for support tickets
- **Polls**: Send Telegram polls to attendees from the admin dashboard

## 📁 Project Structure

```
.
├── backend/                 # Node.js + Express API server
│   ├── config/             # Firebase and schema configuration
│   ├── services/           # Core services (Gemini, Telegram, Razorpay, etc.)
│   ├── routes/             # API endpoints
│   ├── tests/              # Smoke tests
│   ├── server.js           # Main server file
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── pages/         # React pages/components
│   │   ├── services/      # API client
│   │   ├── config/        # Firebase config
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── .env.example
├── firestore.rules         # Firestore security rules
├── storage.rules           # Storage security rules
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Firebase project with Firestore and Storage enabled
- Gemini API key
- Telegram bot token (from @BotFather)
- Razorpay account (test mode for development)
- Mapbox account and token

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in all required credentials:
   - `FIREBASE_SERVICE_ACCOUNT_JSON`: Your Firebase service account JSON
   - `GEMINI_API_KEY`: Google AI Gemini API key
   - `TELEGRAM_BOT_TOKEN`: Token from @BotFather
   - `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`: From Razorpay dashboard
   - `MAPBOX_TOKEN`: From Mapbox account

4. **Start the server**:
   ```bash
   npm start
   ```
   
   Server runs on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in:
   - Firebase web app configuration
   - Mapbox token
   - Razorpay key ID (public key only)

4. **Start development server**:
   ```bash
   npm start
   ```
   
   App runs on `http://localhost:3000`

### Firebase Setup

1. **Deploy Firestore rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Deploy Storage rules**:
   ```bash
   firebase deploy --only storage:rules
   ```

### Telegram Bot Setup

1. **Set webhook URL**:
   ```bash
   curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_SERVER_URL>/webhook/telegram"
   ```

## 🧪 Testing

Run smoke tests:
```bash
cd backend
npm test
```

## 🐳 Docker Deployment

Build and run backend container:
```bash
cd backend
docker build -t event-backend .
docker run -p 3001:3001 --env-file .env event-backend
```

## 📖 API Documentation

### Events API

- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `POST /api/events/:id/documents` - Upload document for processing
- `POST /api/events/:id/indoor-map` - Upload indoor map image
- `PUT /api/events/:id/pois` - Update POI markers

### Registrations API

- `GET /api/registrations?eventId=` - List registrations
- `POST /api/registrations` - Create registration and payment order
- `POST /api/registrations/verify-payment` - Verify Razorpay payment

### Tickets API

- `GET /api/tickets?eventId=&status=` - List tickets
- `POST /api/tickets/:id/reply` - Send organizer reply
- `PUT /api/tickets/:id/status` - Update ticket status

### Webhooks

- `POST /webhook/telegram` - Telegram bot webhook
- `POST /webhook/razorpay` - Razorpay payment webhook
- `POST /webhook/poll` - Send Telegram poll

## 🤖 Telegram Bot Commands

- `/join <eventcode>` - Join an event
- `/faq` - Get help
- `/report <message>` - Report an issue
- Send any message to ask questions (answered via RAG)

## 💡 Architecture Overview

### Document Ingestion Pipeline

1. Upload PDF/DOCX/TXT via dashboard
2. Parse document text
3. Split into 400-token chunks with 100-token overlap
4. Generate embeddings using Gemini
5. Store chunks + embeddings in Firestore

### RAG (Retrieval-Augmented Generation)

1. User asks question via Telegram
2. Generate query embedding
3. Compute cosine similarity with all chunks
4. Retrieve top-5 most relevant chunks
5. Pass chunks + question to Gemini
6. Return AI-generated answer

### Classification System

1. Quick keyword fallback (urgent words → flag immediately)
2. If inconclusive, use Gemini to classify
3. Determine if message needs organizer attention
4. Auto-create ticket if flagged or low confidence

### Payment Flow

1. User submits registration form
2. Backend creates Razorpay order
3. Frontend opens Razorpay Checkout
4. User completes payment
5. Razorpay redirects with payment details
6. Frontend calls verify endpoint
7. Backend validates HMAC signature
8. Update registration status to "paid"

## 🗺️ Indoor Maps

Indoor maps use absolute positioning over a background image:

1. Upload floorplan image via dashboard
2. Image stored in Firebase Storage (made public)
3. POI markers positioned using x%, y% coordinates
4. Frontend displays image with absolute-positioned markers
5. Hover for POI tooltip

## 🔒 Security

- Firestore rules restrict write access to event organizers
- Payment verification uses HMAC-SHA256 signature validation
- Telegram webhooks processed asynchronously
- Firebase Auth protects admin dashboard routes
- Service account credentials used server-side only

## 🎯 8-Hour Hackathon Timeline (3-Person Team)

### Hour 0-1: Setup & Planning
**All team members**
- Clone repo, install dependencies
- Set up Firebase project and credentials
- Configure .env files
- Review architecture

### Hour 1-3: Core Backend (Person 1)
- ✅ Firebase integration
- ✅ Basic API routes (events, registrations)
- ✅ Razorpay integration
- Test with Postman

### Hour 3-5: Frontend UI (Person 2)
- ✅ Login/Dashboard pages
- ✅ Create Event form
- ✅ Event management tabs
- ✅ Styling and responsive design

### Hour 5-6: AI Features (Person 1)
- ✅ Document ingestion
- ✅ Gemini embeddings
- ✅ RAG retrieval
- ✅ Classification

### Hour 6-7: Telegram Bot (Person 3)
- ✅ Bot commands handler
- ✅ Message processing
- ✅ Ticket creation
- ✅ Organizer notifications

### Hour 7-8: Integration & Polish
**All team members**
- Connect frontend to backend
- Test complete user flow
- Deploy to Firebase/Cloud Run
- Set up Telegram webhook
- Create demo event

## 🎬 Demo Script

1. **Create Event**:
   - Login to dashboard
   - Create event "Tech Conference 2024"
   - Upload event FAQ document
   - Upload indoor map
   - Set ticket price ₹500

2. **User Registration**:
   - Open public event page
   - Register with name/email
   - Complete Razorpay payment (test mode)

3. **Telegram Bot**:
   - Join bot with `/join EVENTCODE`
   - Ask "What time does the event start?"
   - Receive AI-generated answer from FAQ

4. **Support Ticket**:
   - Send `/report The WiFi is not working`
   - Check dashboard for new flagged ticket
   - Reply from dashboard
   - User receives reply on Telegram

5. **Poll**:
   - Create poll from dashboard: "Preferred lunch option?"
   - Options: "Pizza", "Burgers", "Salad"
   - Poll sent to attendees

## 🔧 Troubleshooting

**Backend won't start**:
- Check Firebase service account JSON is valid
- Ensure all environment variables are set
- Port 3001 not in use

**Payment verification fails**:
- Verify Razorpay secret key matches
- Check HMAC signature implementation
- Use Razorpay test mode for development

**Telegram webhook not working**:
- Ensure webhook URL is publicly accessible (use ngrok for local dev)
- Check bot token is correct
- Verify webhook is set: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`

**Embeddings slow**:
- Expected for large documents (async processing)
- Consider background worker for production
- Gemini API rate limits may apply

## 📚 Tech Stack

**Backend**:
- Node.js + Express
- Firebase Admin SDK (Firestore, Storage)
- Gemini AI API
- Razorpay SDK
- Mapbox API
- Telegram Bot API

**Frontend**:
- React 18
- Vite
- Firebase Auth
- Mapbox GL JS
- Axios
- React Router

## 📄 License

MIT License - feel free to use for your hackathon or project!

## 🤝 Contributing

This is a hackathon prototype. For production use:
- Add proper error handling
- Implement background job queue
- Add rate limiting
- Add comprehensive tests
- Implement proper logging
- Add monitoring and alerts
- Optimize database queries
- Add caching layer

## 📞 Support

For issues or questions, please create an issue in the repository.
