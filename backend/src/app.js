// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const passport = require('./config/passport');
// const errorHandler = require('./middleware/errorHandler');

// // Import routes
// const bookingRoutes = require('./routes/bookingRoutes');
// const slotRoutes = require('./routes/slotRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const authRoutes = require('./routes/authRoutes');
// const corporateRoutes = require('./routes/corporateRoutes');
// const userRoutes = require('./routes/userRoutes');
// const chatbotRoutes = require('./routes/chatbotRoutes');

// const app = express();

// // Basic security headers
// app.use(helmet());

// // Logging
// if (process.env.NODE_ENV !== 'test') {
//   app.use(morgan('dev'));
// }

// require('dotenv').config();
// console.log("Key Loaded:", process.env.OPENROUTER_API_KEY ? "Yes" : "No");

// // CORS
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Sessions (for admin auth)
// const SESSION_SECRET = process.env.SESSION_SECRET || 'change-this-secret';

// app.use(session({
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//   },
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/mindsettler',
//     collectionName: 'sessions'
//   })
// }));

// // Passport initialization
// app.use(passport.initialize());
// app.use(passport.session());

// // Health check route
// app.get('/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/slots', slotRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/corporate', corporateRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/chatbot', chatbotRoutes);

// // Error handling middleware (must be last)
// app.use(errorHandler);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// module.exports = app;


const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const bookingRoutes = require('./routes/bookingRoutes');
const slotRoutes = require('./routes/slotRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const corporateRoutes = require('./routes/corporateRoutes');
const userRoutes = require('./routes/userRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const latestEventRoutes = require('./routes/latestEventRoutes');

const app = express();
app.set('trust proxy', 1);
// Basic security headers
app.use(helmet());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

require('dotenv').config();
console.log("Key Loaded:", process.env.OPENROUTER_API_KEY ? "Yes" : "No");

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions (for admin auth)
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-this-secret';

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/mindsettler',
    collectionName: 'sessions'
  })
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/corporate', corporateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/latest-events', latestEventRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;
