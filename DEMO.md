# DEMO SCRIPT - Event Management System

Follow this script to demonstrate all features of the system.

## 🎬 Preparation (5 minutes before demo)

1. **Start Backend**:
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend**:
   ```bash
   cd frontend
   npm start
   ```

3. **Set Telegram Webhook** (if not already set):
   ```bash
   curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=<YOUR_NGROK_URL>/webhook/telegram"
   ```

## 🎯 Demo Flow (15 minutes)

### Part 1: Event Creation (3 minutes)

1. **Login**:
   - Open `http://localhost:3000`
   - Sign up with demo credentials or use existing account
   - Email: `demo@example.com`
   - Password: `Demo123!`

2. **Create Event**:
   - Click "Create Event"
   - Fill in details:
     - Name: "Tech Conference 2024"
     - Description: "Annual technology conference with workshops and keynotes"
     - Address: "Convention Center, Mumbai"
     - Lat: `19.0760`, Lng: `72.8777`
     - Date: Tomorrow's date
     - Ticket Price: `500`
     - Telegram Chat ID: Your chat ID (get from @userinfobot)
   - Click "Create Event"
   - Note the Event Code (e.g., `ABC123`)

### Part 2: Document Upload & Processing (2 minutes)

1. **Prepare Sample FAQ**:
   - Create a text file `event-faq.txt`:
     ```
     Event FAQ
     
     Q: What time does the event start?
     A: The event starts at 9:00 AM and ends at 6:00 PM.
     
     Q: Is lunch provided?
     A: Yes, lunch is included in your ticket price.
     
     Q: Where is parking available?
     A: Free parking is available in the basement levels B1-B3.
     
     Q: What should I bring?
     A: Please bring a valid ID and your ticket confirmation.
     ```

2. **Upload Document**:
   - Go to "Documents" tab
   - Select the FAQ file
   - Click "Upload & Process"
   - Wait for processing message

3. **Upload Indoor Map**:
   - Create or use a simple floor plan image
   - Click "Upload Indoor Map"
   - Select image file
   - Upload completes

### Part 3: Public Registration & Payment (3 minutes)

1. **Open Public Page**:
   - Click "View Public Page" button
   - New tab opens with event details

2. **View Location**:
   - Scroll to "Location" section
   - See Mapbox map with event marker
   - Try zooming and panning

3. **Register for Event**:
   - Scroll to "Register for Event"
   - Enter:
     - Name: "Test Attendee"
     - Email: "attendee@example.com"
   - Click "Register (₹500)"
   - Razorpay Checkout opens

4. **Complete Payment** (Test Mode):
   - Use test card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - Click "Pay"
   - Payment verifies, registration confirmed

### Part 4: Telegram Bot Interaction (4 minutes)

1. **Join Event via Telegram**:
   - Open your Telegram bot
   - Send: `/join ABC123` (use your actual event code)
   - Bot confirms: "Welcome to Tech Conference 2024!"

2. **Ask FAQ Question**:
   - Send: "What time does the event start?"
   - Bot retrieves from document and answers: "The event starts at 9:00 AM..."

3. **Report Issue**:
   - Send: `/report WiFi is not working in hall B`
   - Bot confirms: "Report submitted. The organizer will respond shortly."

4. **Check Dashboard**:
   - Return to web dashboard
   - Go to "Tickets" tab
   - See new flagged ticket with the report
   - Type reply: "Thank you for reporting. Our tech team is on it!"
   - Click "Send Reply"
   - User receives reply on Telegram

### Part 5: Organizer Features (3 minutes)

1. **View Registrations**:
   - Click "Registrations" tab
   - See the test registration
   - Payment status: "paid"

2. **Send Poll**:
   - Click "Send Poll" tab
   - Question: "Preferred lunch option?"
   - Options:
     - "Pizza"
     - "Burgers"
     - "Salad"
   - Click "Send Poll"
   - Poll appears in organizer's Telegram chat

3. **Review Tickets**:
   - Check "Tickets" tab
   - See all attendee messages
   - Review auto-answers
   - Check flagging status

## 🎓 Key Points to Highlight

1. **AI-Powered Q&A**:
   - Documents automatically processed
   - Chunks created with embeddings
   - Questions answered via RAG
   - No manual FAQ management needed

2. **Smart Classification**:
   - Keyword fallback for fast responses
   - LLM classification for nuanced cases
   - Auto-flagging for organizer attention
   - Confidence scoring

3. **Seamless Payment**:
   - Razorpay integration
   - Order creation
   - Secure signature verification
   - Automatic status updates

4. **Complete Integration**:
   - Telegram bot for attendees
   - Web dashboard for organizers
   - Real-time updates
   - Maps and indoor navigation

## 🐛 Troubleshooting During Demo

**Bot not responding**:
- Check webhook is set correctly
- Verify bot token in .env
- Check server logs for errors

**Payment fails**:
- Use Razorpay test mode
- Use test card numbers
- Check Razorpay key ID is public key

**Document processing slow**:
- Normal for first-time processing
- Gemini API may have rate limits
- Show "processing in background" message

**Maps not loading**:
- Check Mapbox token in frontend .env
- Verify coordinates are valid
- Check browser console for errors

## 📝 After Demo

1. Show architecture diagram
2. Review code structure
3. Discuss scalability considerations
4. Answer questions

## 💡 Advanced Features to Mention

- Background job processing for production
- Vector database for large document sets
- Caching layer for frequently asked questions
- Analytics dashboard for organizers
- Multi-language support via Gemini
- Image recognition for indoor navigation
- WhatsApp integration (similar to Telegram)
- Email notifications alongside Telegram
