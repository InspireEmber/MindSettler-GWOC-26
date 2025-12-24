const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../controllers/chatbotController');

// Chat endpoint
router.post('/chat', getChatResponse);

module.exports = router;

