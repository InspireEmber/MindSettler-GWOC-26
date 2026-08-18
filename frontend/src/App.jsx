import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

// Page imports
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import JourneyPage from "./pages/JourneyPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import WhatMakesUsDifferentPage from "./pages/WhatMakesUsDifferentPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import BookSessionPage from "./pages/BookSessionPage";
import AppointmentStatusPage from "./pages/AppointmentStatusPage";
import ContactPage from "./pages/ContactPage";
import FaqsPage from "./pages/FaqsPage";
import AwarenessPage from "./pages/AwarenessPage";
import CorporatePage from "./pages/CorporatePage";
import ResourcesPage from "./pages/ResourcesPage";
import ArticlesPage from "./pages/ArticlesPage";
import LinksPage from "./pages/LinksPage";
import VideosPage from "./pages/VideosPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import NonRefundPolicyPage from "./pages/NonRefundPolicyPage";
import ConfidentialityPolicyPage from "./pages/ConfidentialityPolicyPage";

// Admin imports
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminAppointmentsPage from "./pages/admin/AdminAppointmentsPage";
import AdminCorporateInquiriesPage from "./pages/admin/AdminCorporateInquiriesPage";
import AdminLatestEventsPage from "./pages/admin/AdminLatestEventsPage";
import AdminSlotsPage from "./pages/admin/AdminSlotsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Client Routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/what-makes-us-different" element={<WhatMakesUsDifferentPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/book-session" element={<BookSessionPage />} />
          <Route path="/appointment-status" element={<AppointmentStatusPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/awareness" element={<AwarenessPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/articles" element={<ArticlesPage />} />
          <Route path="/resources/links" element={<LinksPage />} />
          <Route path="/resources/videos" element={<VideosPage />} />
          <Route path="/policies/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/policies/non-refund" element={<NonRefundPolicyPage />} />
          <Route path="/policies/confidentiality" element={<ConfidentialityPolicyPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/appointments" element={<AdminAppointmentsPage />} />
          <Route path="/admin/corporate-inquiries" element={<AdminCorporateInquiriesPage />} />
          <Route path="/admin/latest-events" element={<AdminLatestEventsPage />} />
          <Route path="/admin/slots" element={<AdminSlotsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
