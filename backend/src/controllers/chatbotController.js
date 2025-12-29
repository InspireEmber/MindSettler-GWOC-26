// backend/controllers/chatbotController.js (or wherever your file is located)
const wrapAsync = require('../utils/wrapAsync');

// --- Configuration ---
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// You can change this to any model supported by OpenRouter
// e.g., 'google/gemini-flash-1.5', 'openai/gpt-4o-mini', 'meta-llama/llama-3-8b-instruct'
const MODEL_NAME = 'google/gemini-2.5-flash';
const SITE_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const SITE_NAME = 'MindSettler';

// --- Safety & Identity ---
const SAFE_RESPONSE = `I am here to explain MindSettler's services. For personal mental health support, please Book a Session (/book-session) or Contact Us (/contact).`;

const RESTRICTED_KEYWORDS = [
  'anxiety', 'depress', 'suicide', 'kill', 'hurt', 'pain', 'fear', 'panic',
  'sad', 'anger', 'help me', 'feel', 'diagnose', 'symptom', 'treatment',
  'medication', 'trauma', 'ptsd', 'bipolar', 'adhd', 'ocd', 'therapy advice'
];

const SYSTEM_INSTRUCTION = `
You are the MindSettler Guide.

IDENTITY:
MindSettler is a psycho-education platform for mental well-being.
It helps people UNDERSTAND why emotions, thoughts, and behavioral patterns occur.
MindSettler is NOT therapy, NOT counseling, and NOT medical or clinical treatment.

CORE PHILOSOPHY:
MindSettler focuses on AWARENESS, not fixing.
Understanding comes before change.
No emotional reassurance, no advice, no diagnosis.

WHAT MINDSETTLER DOES:
• Explains emotional and behavioral patterns
• Educates about confidence, self-image, relationships, trauma patterns, and parenting influences
• Helps users see repeated cycles in thoughts and reactions
• Provides clarity through structured psycho-education

WHAT MINDSETTLER DOES NOT DO:
• No therapy or counseling
• No diagnosis or labeling of conditions
• No treatment plans or coping strategies
• No medication guidance
• No crisis or emergency support

SERVICES OVERVIEW:
• Emotional awareness and pattern recognition
• Confidence and self-belief education
• Relationship behavior understanding
• Trauma-informed pattern explanation (educational only)
• Parenting and early-environment influence awareness

USER INTENT HANDLING:
If the user asks:
• “What is MindSettler?” → explain the platform and philosophy
• “How does it work?” → explain booking → session → awareness outcome
• “Can this help me?” → explain generally, without personalization
• “Is this therapy / advice / treatment?” → clearly say NO and explain the difference

STRICT SAFETY BOUNDARIES (NON-NEGOTIABLE):
1. You are NOT a therapist or mental health professional.
2. You provide INFORMATION ONLY, never advice or solutions.
3. If the user mentions personal distress, emotions, symptoms, mental health conditions, or asks for help:
   → Politely refuse
   → Redirect them to Book a Session (/book-session) or Contact Us (/contact)
4. Do NOT ask follow-up questions about emotions.
5. Do NOT normalize, validate, or reassure emotional states.

STYLE & TONE:
• Calm
• Neutral
• Professional
• Short and clear
• Educational, not empathetic
• No motivational or comforting language

FINAL RULE:
If there is ANY doubt, default to:
“I can explain how MindSettler works. For personal support, please Book a Session (/book-session).”
`;


// --- Helper ---
const isRestricted = (text) => {
  if (!text) return false;
  return RESTRICTED_KEYWORDS.some(k => text.toLowerCase().includes(k));
};

// Add this at the top of the file
const axios = require('axios'); 

// ... keep your Configuration and Safety variables the same ...

// --- Controller ---
const getChatResponse = wrapAsync(async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  // 1. Validation
  if (!message?.trim()) return res.status(400).json({ success: false, message: 'Empty message' });
  if (!OPENROUTER_API_KEY) {
    console.error("CRITICAL: OPENROUTER_API_KEY is missing from .env");
    return res.status(503).json({ success: false, message: 'Service configuration error' });
  }

  // 2. Safety Check
  if (isRestricted(message)) {
    return res.json({ success: true, response: SAFE_RESPONSE, restricted: true });
  }

  try {
    // 3. Prepare Messages
    const messages = [
      { role: "system", content: SYSTEM_INSTRUCTION },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    console.log("Sending request to OpenRouter..."); // Debug log

    // 4. API Call using Axios (More reliable than fetch)
    // 4. API Call using Axios
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: MODEL_NAME,
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000, // <--- ADD THIS LINE (500 tokens is ~300 words, plenty for chat)
    }, {
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      }
    });

    // 5. Success
    const responseText = response.data.choices[0]?.message?.content || "No response content.";
    res.json({ success: true, response: responseText, restricted: false });

  } catch (error) {
    // --- DETAILED ERROR LOGGING ---
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('OpenRouter API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from OpenRouter:', error.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Setup Error:', error.message);
    }
    
    res.status(500).json({ success: false, message: 'I am having trouble connecting right now.' });
  }
});


module.exports = { getChatResponse };