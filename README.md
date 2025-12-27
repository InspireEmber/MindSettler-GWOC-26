'''# MindSettler - Psycho-Education & Mental Well-being Platform

## Introduction

MindSettler is a comprehensive online and offline platform designed to support individuals in understanding and navigating their mental health. Through a blend of structured psycho-education and personalized one-on-one counseling, we offer guidance and support within a secure and confidential environment. The primary goals of this platform are to build awareness around mental well-being, generate leads for our services, and provide a seamless booking experience for consultations.

Our official Instagram handle is [mindsettlerbypb](https://www.instagram.com/mindsettlerbypb/).

## Our Mission

MindSettler’s mission is to empower individuals to understand their mental and emotional experiences in a structured, informed, and compassionate manner. Through psycho-education and guided exploration, we help people develop clarity around their thoughts, emotions, and behavioral patterns. Our ultimate goal is to equip them with the tools to build emotional balance and self-awareness in their everyday lives.

## Website Structure and User Journey

The website is designed to provide a calm, human, and emotionally reassuring experience. It employs a scroll-based, journey-driven layout that guides users naturally through the content, culminating in the action of booking a session.

The user journey is structured as follows:

1.  **Awareness & Introduction:** The user lands on the **Home Page**, which provides a concise introduction to MindSettler, its purpose, and its core value proposition. The visual design and messaging create a welcoming atmosphere.

2.  **Exploration & Understanding:** From the home page, users are encouraged to explore sections like **About MindSettler**, **Psycho-Education Awareness**, and **How It Works**. These pages provide deeper insight into our mission, methods, and the step-by-step process of engaging with our services.

3.  **Building Trust:** The **What Makes Us Different** and **Journey Section** pages differentiate our services by highlighting our unique structured approach and showcasing a visual roadmap of a user's potential wellness journey.

4.  **Engagement & Support:** The **FAQs** and **Resources** sections offer practical information and self-help materials (blogs, articles, videos), answering common questions and providing immediate value.

5.  **Taking Action:** Having been guided through the platform's offerings, the user is naturally led to the **Book a Session** or **Contact** pages, where they can take the next step.

## Core Features

### Informational & Engagement Pages

*   **Home Page:** The primary landing page introducing MindSettler.
*   **About MindSettler:** Details the brand's mission, vision, and approach.
*   **Psycho-Education Awareness:** Educational content on mental health concepts, presented in simple terms.
*   **How It Works:** A step-by-step explanation of the user journey from booking to session completion.
*   **What Makes Us Different:** Outlines the unique aspects of MindSettler, such as structured sessions and personalized guidance.
*   **Journey Section (Visual):** An interactive roadmap illustrating the user’s path to mental wellness.
*   **FAQs:** Addresses common questions regarding sessions, privacy, pricing, and the booking process.
*   **Resources:** A curated collection of blogs, articles, and videos related to mental well-being.
*   **Contact Page:** A form for general inquiries.

### Session & Booking System

The booking system is designed to be straightforward for the user while giving administrators full control.

*   **Session Type:** Users can book online or offline consultation sessions. The first session is emphasized as an important introductory step.
*   **Slot Selection:** The backend, controlled by an admin, dictates available time slots. Users browse these slots and select a time that works for them.
*   **Booking Process:**
    1.  The user selects an available time slot and submits their information.
    2.  An appointment is created in the system with a **"Pending Confirmation"** status.
    3.  The user is presented with instructions for manual payment (UPI ID or cash).
    4.  The administrator receives the booking request in the admin panel.
    5.  Upon verifying the payment, the admin approves the appointment, changing its status to **"Confirmed"**.
    6.  The user can see their confirmed appointment status in their profile.
*   **Google Calendar Integration:** Users have the option to add their confirmed session directly to their Google Calendar.

### Corporate Services

A dedicated section of the website provides information on services for corporate clients, including workshops, group sessions, and other collaborations. A separate contact form is available for these inquiries.

### Chatbot Integration

An AI-powered chatbot is integrated to:
*   Guide users through the website and explain MindSettler's services.
*   Assist users in navigating to the booking page.
*   Encourage users to book their first session.

The chatbot is **not** designed to provide psychological advice. It will redirect users to the booking or contact page for any personal or specific queries.

### Legal & Policy Pages

The following policies are clearly accessible from the website footer:
*   **Privacy Policy**
*   **Non-Refund Policy**
*   **Confidentiality Policy**

## Admin Panel & Backend Operations

A secure, session-authenticated admin panel allows administrators to manage the platform efficiently.

*   **Dashboard:** Provides an at-a-glance overview of pending appointments, confirmed sessions, and corporate inquiries.
*   **Slot Management:** Administrators can create, update, and delete available time slots for booking.
*   **Appointment Management:** Admins can view all appointment requests, filter them by status, and approve or reject them.
*   **User Information:** The panel allows for the management of session details and user information.

### 🔧 Backend Features

- RESTful API built with Express.js
- Secure session-based authentication using Passport
- Role-based access control (Admin / User)
- Appointment lifecycle management:
  - Pending → Approved → Confirmed → Completed / Rejected
- Google Calendar integration:
  - Auto-create calendar events on appointment confirmation
  - Store `calendarEventId` and `calendarEventLink`
- Slot availability management with real-time booking control
- Payment status tracking (Paid / Pending / Waived)
- Admin dashboard APIs for analytics and session management
- AI-powered chatbot backend using Google Gemini API
- Input validation using Joi for API safety
- MongoDB-backed session persistence


## Technical Stack & Architecture

This project is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and uses Next.js for the frontend.

*   **Frontend:**
    *   **Next.js/React.js:** Used for building a server-rendered, performant, and scalable user interface.
    *   **Tailwind CSS:** A utility-first CSS framework for rapid and consistent styling.

*   **Backend:**
    *   **Node.js/Express.js:** Forms the foundation of the RESTful API.
    *   **MongoDB:** The NoSQL database used to store all application data (users, appointments, etc.).
    *   **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
    *   **Passport.js:** Used for handling admin authentication via local sessions.

## Getting Started

To set up a local development environment, follow these steps.

### Prerequisites

*   Node.js and npm (Node Package Manager)
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/your_username/project-name.git
    ```

2.  **Backend Setup**
    ```sh
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    SESSION_SECRET=a_strong_session_secret
    FRONTEND_URL=http://localhost:3000
    ```

3.  **Frontend Setup**
    ```sh
    cd ../frontend
    npm install
    ```

4.  **Run the Application**
    *   To start the backend server: `cd backend && npm run dev`
    *   To start the frontend development server: `cd frontend && npm run dev`

---

## 📦 Backend Dependencies & Purpose

The backend of **MindSettler** is built using a secure, scalable, and production-ready Node.js architecture.

### Core Server
- **express** – REST API framework
- **dotenv** – Environment variable management
- **cors** – Secure cross-origin requests
- **helmet** – HTTP security headers
- **morgan** – API request logging

### Database
- **mongoose** – MongoDB object modeling and schema validation
- **connect-mongo** – MongoDB-backed session storage

### Authentication & Security
- **passport** – Authentication middleware
- **passport-local** – Username/password strategy
- **passport-local-mongoose** – Simplified user auth integration
- **bcrypt** – Password hashing and verification

###  Validation
- **joi** – Request body and payload validation

###  Google Calendar Integration
- **googleapis** – Creates calendar events for confirmed sessions  
- Automatically stores:
  - `calendarEventId`
  - `calendarEventLink`

### AI Features
- **@google/generative-ai** – Gemini-powered mental health chatbot

###  Development Tools
- **nodemon** – Auto-reload during development

## Backend Functionality Overview

- Session-based authentication using Passport
- Role-based access (Admin / User)
- Appointment lifecycle:
  - Pending → Approved → Confirmed
- Google Calendar event auto-creation on confirmation
- Secure payment status handling
- AI-powered chatbot using Gemini API
- MongoDB session persistence

## API Endpoints

The backend provides the following RESTful API endpoints:

*   `/api/auth`: Handles user authentication (signup, login, logout).
*   `/api/bookings`: Manages the creation and retrieval of appointments.
*   `/api/slots`: Manages the availability of time slots.
*   `/api/admin`: Provides endpoints for admin-specific actions (e.g., approving appointments).
*   `/api/corporate`: Handles submissions from the corporate inquiry form.
*   `/api/users`: Manages user profile data.
*   `/api/chatbot`: Processes interactions with the AI chatbot.
*   `/health`: A health-check endpoint to verify that the server is running.

## Environment Variables (Backend)

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_url
SESSION_SECRET=your_secret
GOOGLE_CLIENT_EMAIL=service_account_email
GOOGLE_PRIVATE_KEY=private_key
GOOGLE_CALENDAR_ID=calendar_id
GOOGLE_CALENDAR_ENABLED=true

A more detailed API documentation can be found in `docs/API_DOCUMENTATION.md`.
'''