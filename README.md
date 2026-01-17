# MindSettler - Psycho-Education & Mental Well-being Platform

<div align="center">

![MindSettler Banner](https://img.shields.io/badge/MindSettler-Mental%20Wellness%20Platform-pink?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://mindsettler.vercel.app)
[![Instagram](https://img.shields.io/badge/Instagram-@mindsettlerbypb-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/mindsettlerbypb/)

**Empowering individuals through structured psycho-education and personalized mental health support**

</div>

---

## Table of Contents

- [Introduction](#introduction)
- [Our Mission](#our-mission)
- [Key Features](#key-features)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

**MindSettler** is a comprehensive full-stack mental wellness platform that bridges the gap between mental health awareness and professional support. Built with modern web technologies, it provides a seamless, secure, and compassionate environment for individuals seeking to understand and improve their mental well-being.

The platform combines:
- **Psycho-Education** - Structured educational content on mental health
- **AI-Powered Chatbot** - 24/7 guidance and support
- **Session Booking** - Easy appointment scheduling with mental health professionals
- **Corporate Services** - Workshops and group sessions for organizations
- **Privacy-First** - Secure, confidential, and HIPAA-compliant practices

**Official Instagram:** [@mindsettlerbypb](https://www.instagram.com/mindsettlerbypb/)

---

## Our Mission

MindSettler's mission is to **empower individuals** to understand their mental and emotional experiences through structured, informed, and compassionate guidance. We help people develop clarity around their thoughts, emotions, and behavioral patterns, equipping them with tools to build emotional balance and self-awareness in their everyday lives.

### Core Values
- **Education First** - Knowledge is the foundation of mental wellness
- **Accessible Support** - Mental health care should be available to everyone
- **Privacy & Confidentiality** - Your trust is our priority
- **Evidence-Based** - Grounded in psychological research and best practices

---

## Key Features

### User-Facing Features

#### **Informational Pages**
- **Home Page** - Welcoming landing page with hero video background and smooth animations
- **About MindSettler** - Mission, vision, and team information
- **Psycho-Education Awareness** - Educational content on mental health concepts
- **How It Works** - Step-by-step visual guide to using the platform
- **What Makes Us Different** - Unique value propositions and differentiators
- **Journey Section** - Interactive visual roadmap of the wellness journey
- **FAQs** - Comprehensive answers to common questions
- **Resources** - Curated articles, videos, and external links

#### **Session Booking System**
- **Smart Slot Selection** - Browse available time slots managed by admins
- **Flexible Payment** - UPI and cash payment options
- **Email Notifications** - Automated confirmations via Brevo API
- **Google Calendar Integration** - One-click calendar event creation
- **Appointment Tracking** - Real-time status updates (Pending → Confirmed → Completed)
- **User Profile** - View booking history and manage appointments

#### **AI Chatbot Assistant**
- Powered by **OpenRouter API** (supports multiple AI models)
- Guides users through the website
- Answers questions about services
- Directs users to appropriate resources
- **Does NOT provide medical advice** - redirects to professionals

#### **Corporate Services**
- Dedicated section for organizational clients
- Workshop and group session information
- Separate inquiry form for corporate partnerships

#### **Security & Privacy**
- **Privacy Policy** - Transparent data handling practices
- **Non-Refund Policy** - Clear terms and conditions
- **Confidentiality Policy** - Professional ethics and data protection

### Admin Panel Features

- **Dashboard** - Overview of appointments, inquiries, and analytics
- **Slot Management** - Create, update, and delete available time slots
- **Appointment Approval** - Review and confirm booking requests
- **Payment Verification** - Track and verify payment status
- **Corporate Inquiries** - Manage business partnership requests
- **User Management** - View and manage user information
- **Analytics** - Track platform usage and engagement metrics
- **Latest Events** - Manage and display platform announcements/events

### UI/UX Highlights

- **Frosted Glass Theme** - Modern pink-white gradient aesthetic
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Framer Motion for fluid transitions
- **Video Backgrounds** - Engaging hero section with video integration
- **Accessible Navigation** - Intuitive navbar with dropdown menus
- **Loading States** - Custom loading page with brand consistency
- **Dark Mode Ready** - Prepared for future dark theme implementation

---

## Technical Stack

### **Frontend**
| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with SSR and routing |
| **React 19** | UI component library |
| **Tailwind CSS** | Utility-first styling framework |
| **Framer Motion** | Animation and transitions |
| **Lucide React** | Icon library |
| **Cloudinary** | Image optimization and delivery |

### **Backend**
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **Passport.js** | Authentication middleware |
| **Express Session** | Session management |
| **Connect-Mongo** | MongoDB session store |

### **Authentication & Security**
- **Passport Local** - Username/password authentication
- **Passport Google OAuth 2.0** - Social login
- **bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Joi** - Input validation

### **Third-Party Integrations**
- **OpenRouter API** - AI chatbot intelligence (supports multiple LLM models)
- **Google Calendar API** - Automated event creation for confirmed sessions
- **Brevo** - Transactional email service for notifications
- **Cloudinary** - Image hosting and optimization

### **Development Tools**
- **Nodemon** - Auto-restart development server
- **Morgan** - HTTP request logger
- **dotenv** - Environment variable management
- **Axios** - HTTP client for API calls
- **crypto-random-string** - Secure token generation

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/InspireEmber/MindSettler-GWOC-26.git
   cd MindSettler-GWOC-26
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create `.env` file in `backend/`:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/mindsettler
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mindsettler
   
   # Session
   SESSION_SECRET=your_super_secret_session_key_here
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   
   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   
   # Google Calendar API (Optional)
   GOOGLE_CLIENT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_CALENDAR_ID=your_calendar_id
   GOOGLE_CALENDAR_ENABLED=true
   
   # AI Chatbot (OpenRouter)
   OPENROUTER_API_KEY=your_openrouter_api_key
   
   # Email Service (Brevo)
   BREVO_API_KEY=your_brevo_api_key
   EMAIL_USER=your_verified_sender_email@domain.com
   
   # Image Hosting (Cloudinary)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

   Create `.env.local` file in `frontend/`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Seed Admin User (Optional)**
   ```bash
   cd backend
   npm run seed:admin
   ```

5. **Run the Application**

   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
---

## Deployment

The application is deployed using:
- **Frontend:** Vercel (Next.js optimized)
- **Backend:** Render (Node.js hosting)
- **Database:** MongoDB Atlas (cloud database)

### Quick Deployment Guide

#### **Backend (Render)**
1. Push code to GitHub
2. Create new Web Service on Render
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables (see `.env` example above)
5. Deploy and copy the backend URL

#### **Frontend (Vercel)**
1. Import GitHub repository to Vercel
2. Configure:
   - **Framework:** Next.js
   - **Root Directory:** `frontend`
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```
4. Deploy and copy the frontend URL

#### **Final Integration**
1. Update `FRONTEND_URL` in Render backend environment
2. Configure Google OAuth redirect URIs
3. Test the live application

Detailed deployment guide: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Project Structure

```
MindSettler-GWOC-26/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app directory
│   │   │   ├── page.jsx    # Home page
│   │   │   ├── about/      # About page
│   │   │   ├── admin/      # Admin panel pages
│   │   │   ├── book-session/
│   │   │   ├── journey/
│   │   │   ├── resources/
│   │   │   └── ...
│   │   ├── components/     # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── ...
│   │   └── lib/           # Utility functions
│   ├── public/            # Static assets (images, videos)
│   └── package.json
│
├── backend/               # Express.js backend API
│   ├── src/
│   │   ├── models/        # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Appointment.js
│   │   │   ├── Slot.js
│   │   │   ├── Admin.js
│   │   │   ├── CorporateInquiry.js
│   │   │   └── LatestEvent.js
│   │   ├── routes/        # API route handlers
│   │   │   ├── authRoutes.js
│   │   │   ├── bookingRoutes.js
│   │   │   ├── slotRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   ├── corporateRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── chatbotRoutes.js
│   │   │   └── latestEventRoutes.js
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth, validation, error handling
│   │   ├── services/      # Email service (Brevo)
│   │   ├── config/        # DB, passport, Google Calendar
│   │   ├── validation/    # Joi schemas
│   │   ├── utils/         # Helper functions
│   │   └── app.js         # Express app configuration
│   ├── scripts/           # Seeding scripts
│   ├── server.js          # Entry point
│   └── package.json
│
├── docs/                  # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   └── SETUP_GUIDE.md
│
├── DEPLOYMENT.md          # Deployment instructions
├── README.md             # This file
└── .gitignore
```

---

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/google` | Google OAuth login |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password/:token` | Reset password |
| GET | `/api/auth/check` | Check authentication status |

### Booking Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/slots` | Get available slots |
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings/user/:userId` | Get user bookings |
| PATCH | `/api/bookings/:id/status` | Update booking status |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Get dashboard stats |
| GET | `/api/admin/appointments` | Get all appointments |
| PATCH | `/api/admin/appointments/:id/approve` | Approve appointment |
| POST | `/api/admin/slots` | Create time slot |
| DELETE | `/api/admin/slots/:id` | Delete time slot |

### Chatbot Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chatbot` | Send message to AI chatbot |

### Latest Events Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/latest-events` | Get latest platform events |
| POST | `/api/latest-events` | Create new event (Admin) |
| PUT | `/api/latest-events/:id` | Update event (Admin) |
| DELETE | `/api/latest-events/:id` | Delete event (Admin) |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health status |

Full API documentation: See [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)

---

## Environment Variables Reference

### Backend Environment Variables

```env
# Required
MONGODB_URI=                 # MongoDB connection string
SESSION_SECRET=              # Session encryption key
FRONTEND_URL=                # Frontend URL for CORS

# Optional - Google OAuth
GOOGLE_CLIENT_ID=            # Google OAuth client ID
GOOGLE_CLIENT_SECRET=        # Google OAuth client secret
GOOGLE_CALLBACK_URL=         # OAuth callback URL

# Optional - Google Calendar
GOOGLE_CLIENT_EMAIL=         # Service account email
GOOGLE_PRIVATE_KEY=          # Service account private key
GOOGLE_CALENDAR_ID=          # Target calendar ID
GOOGLE_CALENDAR_ENABLED=     # Enable/disable calendar integration

# Required - AI Chatbot
OPENROUTER_API_KEY=          # OpenRouter API key for chatbot

# Required - Email Service
BREVO_API_KEY=               # Brevo API key
EMAIL_USER=                  # Verified sender email in Brevo

# Required - Image Hosting
CLOUDINARY_CLOUD_NAME=       # Cloudinary cloud name
CLOUDINARY_API_KEY=          # Cloudinary API key
CLOUDINARY_API_SECRET=       # Cloudinary API secret
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=         # Backend API URL (without /api suffix)
```

---

## UI/UX Design Philosophy

MindSettler's interface is designed with mental wellness in mind:

### Design Principles
- **Calming Aesthetics** - Soft pink-white gradients and frosted glass effects
- **Intuitive Navigation** - Clear user journey from awareness to booking
- **Accessibility** - WCAG compliant with semantic HTML
- **Responsive** - Mobile-first design approach
- **Performance** - Optimized images and lazy loading
- **Animations** - Subtle, purposeful motion design

### Color Palette
- Primary: Pink gradients (`#ec4899` to `#f9a8d4`)
- Secondary: White with transparency
- Accents: Soft pastels
- Text: High contrast for readability

### Typography
- Headings: System fonts with fallbacks
- Body: Optimized for readability
- Special: Antic font for About page

---

## Contributing

We welcome contributions to MindSettler! Here's how you can help:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

### Areas for Contribution
- Bug fixes
- New features
- Documentation improvements
- UI/UX enhancements
- Accessibility improvements
- Internationalization

---

## License

This project is licensed under the ISC License. See the LICENSE file for details.

---

## Acknowledgments

- **GWOC 2026** - For the opportunity to build this platform
- **OpenRouter API** - For powering our chatbot
- **Mental Health Professionals** - For guidance on best practices
- **Open Source Community** - For the amazing tools and libraries

---

## Contact & Support

- **Instagram:** [@mindsettlerbypb](https://www.instagram.com/mindsettlerbypb/)
- **Website:** [https://mindsettler.vercel.app](https://mindsettler.vercel.app)
- **Email:** Contact form available on website

---

## Roadmap

### Completed
- [x] Full-stack MERN application
- [x] Session booking system
- [x] AI chatbot integration (OpenRouter)
- [x] Google Calendar integration
- [x] Email notifications (Brevo)
- [x] Admin panel with latest events feature
- [x] Responsive design with frosted glass theme
- [x] Password reset functionality
- [x] Corporate services section
- [x] Image hosting (Cloudinary)
- [x] Deployment to production (Vercel + Render)

### Planned
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Video consultation integration
- [ ] Payment gateway integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Automated appointment reminders
- [ ] Resource library expansion
- [ ] Community forum
- [ ] Therapist marketplace

---

<div align="center">

**Built with care for mental wellness**

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Powered by MongoDB](https://img.shields.io/badge/Powered%20by-MongoDB-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![AI by OpenRouter](https://img.shields.io/badge/AI%20by-OpenRouter-blue?style=flat-square)](https://openrouter.ai/)

</div>