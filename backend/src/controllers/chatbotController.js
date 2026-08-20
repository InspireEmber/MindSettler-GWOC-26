// backend/controllers/chatbotController.js
const ChatAgent = require('../ai/agent');
const BookingStateManager = require('../ai/bookingManager');
const { bookingTool } = require('../ai/tools/bookingTool');

// --- Safety ---
const SAFE_RESPONSE = `I am here to explain MindSettler's services. For personal mental health support, please Book a Session (/book-session) or Contact Us (/contact).`;

const RESTRICTED_KEYWORDS = [
  'anxiety', 'depress', 'suicide', 'kill', 'hurt', 'pain', 'fear', 'panic',
  'sad', 'anger', 'help me', 'feel', 'diagnose', 'symptom', 'treatment',
  'medication', 'trauma', 'ptsd', 'bipolar', 'adhd', 'ocd', 'therapy advice'
];

const isRestricted = (text) => {
  if (!text) return false;
  return RESTRICTED_KEYWORDS.some(k => text.toLowerCase().includes(k));
};

// --- Controller ---
const getChatResponse = async (req, res) => {
  try {
    const { message, conversationHistory = [], bookingState = null, action = null } = req.body;

    // --- Action Handling (e.g. User clicked "Confirm Booking") ---
    if (action === "CONFIRM_BOOKING") {
      if (!req.user || !req.user._id) {
        return res.json({
          success: true,
          response: { type: "auth_required", text: "Please log in to finalize your booking." }
        });
      }

      // Execute the business logic tool directly
      const result = await bookingTool({
        ...bookingState,
        userId: req.user._id
      });

      if (result.success) {
        return res.json({
          success: true,
          response: { type: "text", text: `Success! Your session is booked. (Booking ID: ${result.bookingId})` },
          bookingState: null // clear state
        });
      } else {
        return res.json({
          success: true,
          response: { type: "text", text: `Booking failed: ${result.error}` },
          bookingState
        });
      }
    }

    // 1. Validation
    if (!message?.trim()) return res.status(400).json({ success: false, message: 'Empty message' });

    // 2. Safety Check (Basic Keyword Filter)
    if (isRestricted(message)) {
      return res.json({ success: true, response: { type: "text", text: SAFE_RESPONSE }, restricted: true });
    }

    // 3. Intent Detection
    let isBookingIntent = false;
    let finalBookingState = bookingState;

    // Fast-path for informational queries that shouldn't trigger the step-by-step state manager
    if (/(available|slots?|pricing|cost|faq|policy)/i.test(message)) {
      isBookingIntent = false;
    } else if (bookingState !== null) {
      // If the booking state is already complete and they type a message instead of clicking confirm, break flow
      if (bookingState.mode && bookingState.date && bookingState.slot && bookingState.context !== null) {
        isBookingIntent = false;
        finalBookingState = null; // Clear state
      } else {
        isBookingIntent = true;
      }
    } else if (/(book|appointment|session)/i.test(message)) {
      isBookingIntent = true;
    }

    // 4. Delegate to the correct manager
    if (isBookingIntent) {
      const result = await BookingStateManager.process(message, finalBookingState);
      return res.json({ success: true, response: result.response, bookingState: result.bookingState });
    } else {
      const responseText = await ChatAgent.invoke(message, conversationHistory);
      return res.json({ success: true, response: { type: "text", text: responseText }, bookingState: finalBookingState, restricted: false });
    }

  } catch (error) {
    console.error('Chatbot Controller Error:', error.message);
    res.status(500).json({ success: false, message: 'I am having trouble connecting right now.' });
  }
};

module.exports = { getChatResponse };