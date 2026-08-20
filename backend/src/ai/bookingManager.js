const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { z } = require("zod");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

// The Zod schema defines exactly what entities we want to extract
const extractionSchema = z.object({
  mode: z.enum(["online", "offline"]).nullable().describe("The requested session mode. Set to null if not mentioned."),
  date: z.string().nullable().describe("The requested session date in YYYY-MM-DD format. Set to null if not mentioned."),
  slot: z.string().nullable().describe("The requested session time slot in HH:MM format. Set to null if not mentioned."),
  context: z.string().nullable().describe("Any additional context or topic the user wants to focus on. Set to null if not mentioned.")
});

class BookingStateManager {
  constructor() {
    this.extractorModel = null;
  }

  initModel() {
    if (!this.extractorModel) {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured.");
      }
      
      const baseModel = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash-lite",
        apiKey: process.env.GEMINI_API_KEY,
        temperature: 0.1, // Very low temperature for precise extraction
      });

      // We use .withStructuredOutput to force the LLM to return a clean JSON object
      this.extractorModel = baseModel.withStructuredOutput(extractionSchema, {
        name: "booking_entity_extractor"
      });
    }
  }

  async process(message, currentState) {
    this.initModel();

    // 1. Initialize state if it's null
    let state = currentState || {
      mode: null,
      date: null,
      slot: null,
      context: null
    };

    // 2. Extract new entities from the user's message
    const prompt = `
      IMPORTANT: The current date is ${new Date().toISOString().split('T')[0]}. Use this to correctly infer the year and month if the user only provides a day.
      Extract booking details from the following user message. 
      If a field is not mentioned, return null for it.
      User message: "${message}"
    `;

    try {
      const extracted = await this.extractorModel.invoke([
        new HumanMessage(prompt)
      ]);

      // 3. Merge extracted entities into state
      if (extracted.mode) state.mode = extracted.mode;
      if (extracted.date) state.date = extracted.date;
      if (extracted.slot) state.slot = extracted.slot;
      if (extracted.context) state.context = extracted.context;

    } catch (err) {
      console.error("Entity extraction failed:", err);
      // Continue with existing state if extraction fails
    }

    // Handle explicit skip directly from the message
    if (message.toLowerCase().trim() === 'skip') {
      state.context = "";
    }
    
    // Also handle if the LLM successfully extracted 'skip' as the context
    if (state.context && state.context.toLowerCase().trim() === 'skip') {
      state.context = "";
    }

    // 4. Determine missing information
    if (!state.mode) {
      return {
        response: { type: "booking_questions", text: "Would you prefer your session to be Online or Offline?" },
        bookingState: state
      };
    }
    
    if (!state.date) {
      return {
        response: { type: "booking_questions", text: "What date would you like to book the session for? (e.g., Tomorrow, July 28th)" },
        bookingState: state
      };
    }

    if (!state.slot) {
      return {
        response: { type: "booking_questions", text: `What time would you prefer on ${state.date}?` },
        bookingState: state
      };
    }

    // Context is optional, but we can ask for it once if it's null and we haven't explicitly skipped it.
    // To handle skipping, the frontend can pass context as an empty string "" instead of null.
    if (state.context === null) {
      return {
        response: { 
          type: "booking_questions", 
          text: "Would you like to add any additional context for the session? (e.g., Confidence issues, relationship patterns). You can say 'skip' if you don't want to." 
        },
        bookingState: state
      };
    }

    // 5. All required fields are present -> Return Confirmation Card
    return {
      response: { 
        type: "booking_confirmation", 
        booking: {
          mode: state.mode,
          date: state.date,
          slot: state.slot,
          price: 749, // Fixed price for now, could be dynamic
          context: state.context
        }
      },
      bookingState: state
    };
  }
}

module.exports = new BookingStateManager();
