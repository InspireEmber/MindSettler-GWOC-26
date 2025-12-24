const { GoogleGenerativeAI } = require('@google/generative-ai');
const wrapAsync = require('../utils/wrapAsync');

// --- Configuration ---
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const MODEL_NAME = 'gemini-1.5-flash';

// --- Safety & Identity ---
const SAFE_RESPONSE = `I am here to explain MindSettler's services. For personal mental health support, please Book a Session (/book-session) or Contact Us (/contact).`;

const RESTRICTED_KEYWORDS = [
  'anxiety', 'depress', 'suicide', 'kill', 'hurt', 'pain', 'fear', 'panic',
  'sad', 'anger', 'help me', 'feel', 'diagnose', 'symptom', 'treatment',
  'medication', 'trauma', 'ptsd', 'bipolar', 'adhd', 'ocd', 'therapy advice'
];

const SYSTEM_INSTRUCTION = `You are the MindSettler Guide.
CONTEXT: MindSettler is a psycho-education platform for mental well-being, focusing on "Why" feelings occur.
SERVICES: Structured education on patterns, confidence, trauma, relationships, and parenting.
ROLE: Explain services, guide booking, and clarify the "MindSettler" concept.
STRICT BOUNDARIES:
1. You are NOT a therapist. You provide information, NOT advice.
2. If a user mentions personal distress, symptoms, or asks for help, REFUSE politely and redirect to /book-session.
3. Keep answers short, calm, and professional.`;

// --- Helper ---
const isRestricted = (text) => {
  if (!text) return false;
  return RESTRICTED_KEYWORDS.some(k => text.toLowerCase().includes(k));
};

// --- Controller ---
const getChatResponse = wrapAsync(async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  // 1. Validation & Availability
  if (!message?.trim()) return res.status(400).json({ success: false, message: 'Empty message' });
  if (!genAI) return res.status(503).json({ success: false, message: 'Service unavailable' });

  // 2. Safety Check (Input)
  if (isRestricted(message)) {
    return res.json({ success: true, response: SAFE_RESPONSE, restricted: true });
  }

  try {
    // 3. Initialize Model with Persona
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION
    });

    // 4. Format History for SDK (Map your frontend structure to Gemini structure)
    const history = conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // 5. Generate Response
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(message);
    const responseText = await result.response.text();

    res.json({ success: true, response: responseText, restricted: false });

  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({ success: false, message: 'I am having trouble connecting right now.' });
  }
});

module.exports = { getChatResponse };