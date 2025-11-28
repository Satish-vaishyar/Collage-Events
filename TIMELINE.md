# 8-Hour Hackathon Timeline
## Event Management System with AI Q&A

This timeline assumes a 3-person team working for 8 hours to build and deploy the complete system.

---

## 👥 Team Roles

**Person 1: Backend Developer**
- Focus: API, integrations, AI features

**Person 2: Frontend Developer**
- Focus: React UI, user experience

**Person 3: Integration Specialist**
- Focus: Telegram bot, webhooks, testing

---

## ⏰ Hour-by-Hour Breakdown

### Hour 0-1: Setup & Foundation (All Team Members)

**[00:00 - 00:15] Project Setup**
- Clone/create repository
- Install Node.js dependencies (backend + frontend)
- Review project structure

**[00:15 - 00:30] Service Configuration**
- Person 1: Set up Firebase project, get service account JSON
- Person 2: Set up Firebase Auth in console, get web config
- Person 3: Create Telegram bot with @BotFather, get token

**[00:30 - 00:45] Environment Setup**
- All: Copy .env.example to .env
- Person 1: Configure backend .env (Firebase, Gemini, Razorpay)
- Person 2: Configure frontend .env (Firebase, Mapbox, Razorpay public key)
- Person 3: Get Mapbox token, set up ngrok for webhooks

**[00:45 - 01:00] Initial Testing**
- All: Run backend and frontend locally
- Verify health check endpoint works
- Test Firebase connection

---

### Hour 1-2: Core Backend (Person 1) + Frontend Foundation (Person 2)

**Person 1: Core API**
- [x] Firebase Admin SDK setup
- [x] Express server with routes structure
- [x] Events CRUD endpoints
- [x] Basic Firestore operations
- Test with Postman/curl

**Person 2: Auth & Layout**
- [x] Firebase Auth integration
- [x] Login/Signup page
- [x] Protected route wrapper
- [x] Header/navigation component
- Test authentication flow

**Person 3: Research & Documentation**
- Read Telegram Bot API docs
- Read Razorpay webhook documentation
- Prepare test data (sample FAQ document)
- Set up testing checklist

---

### Hour 2-3: Payments (Person 1) + Event UI (Person 2)

**Person 1: Razorpay Integration**
- [x] Create order endpoint
- [x] Verify payment endpoint
- [x] HMAC signature validation
- [x] Webhook handler
- Test with Razorpay test credentials

**Person 2: Event Management UI**
- [x] Create Event form
- [x] Dashboard with event list
- [x] Event manage page structure
- [x] Tab navigation (Overview, Documents, Tickets, etc.)
- Connect to backend API

**Person 3: Telegram Bot Foundation**
- [x] Bot command structure
- [x] Webhook endpoint skeleton
- [x] Message parsing utilities
- Test webhook receives updates

---

### Hour 3-4: Document Processing (Person 1) + Public Page (Person 2)

**Person 1: Ingestion Pipeline**
- [x] PDF/DOCX/TXT parser integration
- [x] Text chunking algorithm (400 tokens, 100 overlap)
- [x] Gemini embeddings API integration
- [x] Store chunks in Firestore
- Test with sample FAQ document

**Person 2: Public Event Page**
- [x] Event details display
- [x] Mapbox map integration
- [x] Indoor map viewer with POIs
- [x] Registration form
- [x] Razorpay Checkout integration
- Test registration flow

**Person 3: Telegram Commands**
- [x] /join command implementation
- [x] /faq command
- [x] /report command
- [x] User-event mapping logic
- Test all commands

---

### Hour 4-5: AI Features (Person 1) + Ticket System (Person 2)

**Person 1: RAG & Classification**
- [x] Cosine similarity search
- [x] Retrieve top-k chunks
- [x] RAG prompt engineering
- [x] Gemini chat completion
- [x] Classification with keyword fallback
- Test question answering

**Person 2: Ticket Management**
- [x] Ticket list UI
- [x] Reply interface
- [x] Status badges
- [x] Auto-answer display
- [x] Registrations list
- Test ticket flow

**Person 3: Message Processing**
- [x] Handle regular messages
- [x] Call RAG for answers
- [x] Call classification
- [x] Create tickets in Firestore
- [x] Notify organizer
- Test end-to-end message flow

---

### Hour 5-6: Advanced Features (Distributed)

**Person 1: Mapbox & Storage**
- [x] Mapbox directions API
- [x] Document upload to Storage
- [x] Indoor map upload
- [x] POI update endpoint
- Test file uploads

**Person 2: Polish UI**
- [x] Responsive CSS
- [x] Loading states
- [x] Error handling
- [x] Form validation
- [x] Better styling
- Test on mobile viewport

**Person 3: Poll Feature**
- [x] Poll send endpoint
- [x] Telegram sendPoll API
- [x] Poll creation UI
- [x] Organizer reply to attendees
- Test poll sending

---

### Hour 6-7: Integration & Testing (All Team Members)

**[06:00 - 06:20] End-to-End Testing**
- Create real test event
- Upload document
- Register with payment
- Join via Telegram
- Ask questions
- Create tickets
- Send replies

**[06:20 - 06:40] Security & Rules**
- Deploy Firestore security rules
- Deploy Storage security rules
- Test rule enforcement
- Review access controls

**[06:40 - 07:00] Bug Fixes**
- Fix any issues found in testing
- Handle edge cases
- Improve error messages
- Add console logging

---

### Hour 7-8: Deployment & Demo Prep (All Team Members)

**[07:00 - 07:20] Deploy Backend**
- Option A: Docker container on Cloud Run
- Option B: Heroku/Railway deployment
- Set environment variables
- Test deployed endpoints

**[07:20 - 07:40] Deploy Frontend**
- Build production bundle
- Deploy to Firebase Hosting or Vercel
- Configure production URLs
- Test deployed app

**[07:40 - 07:50] Webhook Configuration**
- Update Telegram webhook to production URL
- Test webhook with real bot
- Verify Razorpay webhook endpoint

**[07:50 - 08:00] Demo Preparation**
- Create demo event
- Prepare demo script
- Test complete flow
- Screenshot key features
- Prepare presentation

---

## 🎯 Minimum Viable Product (MVP) Checklist

By end of 8 hours, ensure these work:

### Core Features
- [x] Create event with details
- [x] Upload FAQ document
- [x] Document processing with embeddings
- [x] Public event page
- [x] User registration + payment
- [x] Telegram bot commands
- [x] AI-powered question answering
- [x] Ticket creation and management
- [x] Organizer dashboard

### Integrations
- [x] Firebase (Auth, Firestore, Storage)
- [x] Gemini AI (embeddings + chat)
- [x] Telegram Bot
- [x] Razorpay payments
- [x] Mapbox maps

---

## 🚨 Risk Mitigation

### Critical Path Items (Cannot skip)
1. Firebase setup
2. Basic CRUD for events
3. Telegram webhook working
4. At least one AI feature (RAG or classification)
5. Payment integration

### Nice-to-Have (Can defer if time runs short)
1. Indoor maps with POIs
2. Poll feature
3. Advanced styling
4. Mapbox directions
5. Comprehensive error handling

---

## 💡 Tips for Success

1. **Start Early on Integrations**: Get API keys and webhooks working ASAP
2. **Use Mock Data Initially**: Don't wait for backend to finish UI
3. **Parallel Work**: Different team members on different modules
4. **Test Continuously**: Don't leave testing to the end
5. **Simple First**: Get basic version working, then add features
6. **Communication**: Quick standups every 2 hours

---

## 📝 Handoff Points

**Hour 1 → 2**
- Person 1: Basic API ready for Person 2 to consume
- Person 2: Auth flow ready

**Hour 3 → 4**
- Person 1: Order/payment endpoint ready
- Person 2: Public page ready to integrate payment

**Hour 5 → 6**
- All: Core features done, start integration testing

**Hour 7 → 8**
- All: Everything deployed and ready for demo

---

## 🎬 Final Demo Flow

1. Login to dashboard (1 min)
2. Create event + upload document (2 min)
3. Show public page + register (2 min)
4. Telegram bot interaction (3 min)
5. Dashboard ticket management (2 min)

**Total Demo Time: 10 minutes**

---

Good luck! 🚀
