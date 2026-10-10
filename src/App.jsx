import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LangProvider } from "./context/LangContext";
import { AppProvider, useApp } from "./context/AppContext";
import { BookingProvider } from "./context/BookingContext";
import { Bot } from "lucide-react";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Toast from "./components/common/Toast";
import BookingModal from "./components/booking/BookingModal";
import GlobalSearchModal from "./components/search/GlobalSearchModal";
import AppearanceModal from "./components/common/AppearanceModal";
import ChatWindow from "./components/chatbot/ChatWindow";

// Pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import DestinationDetail from "./pages/DestinationDetail";
import Packages from "./pages/Packages";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Vehicles from "./pages/Vehicles";
import LocalGuides from "./pages/LocalGuides";
import Guides from "./pages/Guides";
import Transport from "./pages/Transport";
import Solo from "./pages/Solo";
import SoloTrip from "./pages/SoloTrip";
import Community from "./pages/Community";
import Album from "./pages/Album";
import PhotoAlbum from "./pages/PhotoAlbum";
import Itinerary from "./pages/Itinerary";
import SmartPlanner from "./pages/SmartPlanner";
import Budget from "./pages/Budget";
import Wishlist from "./pages/Wishlist";
import Bookings from "./pages/Bookings";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Legal from "./pages/Legal";

// Admin Subpages
import Dashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminBookings from "./pages/admin/Bookings";
import AdminDestinations from "./pages/admin/Destinations";
import AdminAnalytics from "./pages/admin/Analytics";

// Protected Route Guard for Administrator Access
function AdminProtectedRoute({ children }) {
  const { currentUser } = useApp();
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function MainLayout() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div
      className="flex flex-col min-h-screen font-sans transition-colors duration-200 overflow-x-hidden"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <Navbar />
      <main className="flex-1 w-full max-w-[1440px] mx-auto overflow-x-hidden">
        <Routes>
          {/* Main User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/destination-detail/:id" element={<DestinationDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/local-guides" element={<LocalGuides />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/solo" element={<Solo />} />
          <Route path="/solo-trip" element={<SoloTrip />} />
          <Route path="/community" element={<Community />} />
          <Route path="/album" element={<Album />} />
          <Route path="/photo-album" element={<PhotoAlbum />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/smart-planner" element={<SmartPlanner />} />
          <Route path="/planner" element={<SmartPlanner />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Legal defaultTab="terms" />} />
          <Route path="/privacy" element={<Legal defaultTab="privacy" />} />
          <Route path="/refund" element={<Legal defaultTab="refund" />} />
          
          {/* Dedicated Administrator Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <AdminUsers />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <AdminProtectedRoute>
                <AdminBookings />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/destinations"
            element={
              <AdminProtectedRoute>
                <AdminDestinations />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <AdminProtectedRoute>
                <AdminAnalytics />
              </AdminProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <BookingModal />
      <GlobalSearchModal />
      <AppearanceModal />
      
      {/* Multilingual Claude AI Chatbot */}
      <ChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 border border-teal-400/40 cursor-pointer"
          title="TripCraft Claude AI Concierge"
        >
          <Bot className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline">TripCraft AI</span>
        </button>
      )}

      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LangProvider>
          <AppProvider>
            <BookingProvider>
              <MainLayout />
            </BookingProvider>
          </AppProvider>
        </LangProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
