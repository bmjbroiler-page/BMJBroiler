import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // <--- INI IMPORT YANG DITAMBAHKAN

// Import Komponen Halaman Pengunjung
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Products from './components/Products';
import VideoSection from './components/VideoSection';
import Articles from './components/Articles';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBubble from './components/ChatBubble';
import SEO from './components/SEO';
import VisitorTracker from './components/VisitorTracker';

// Import Komponen Admin
import AdminLogin from './components/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminProducts from './components/AdminProducts';
import AdminVideo from './components/AdminVideo';
import AdminArticles from './components/AdminArticles';
import AdminSettings from './components/AdminSettings';
import AdminSliders from './components/AdminSliders';
import AdminVisitors from './components/AdminVisitors';

// Komponen Pelindung Rute Admin
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isAuth ? children : <Navigate to="/admin/login" />;
};

// Komponen Halaman Utama Web (Tampilan untuk pembeli)
const MainWebsite = () => (
  <div className="bg-brand-bg text-[#1A1A1A] antialiased">
    <SEO />
    <VisitorTracker />
    <Header />
    <main className="min-h-screen pt-20">
      <Hero />
      <About />
      <VisionMission />
      <Products />
      <VideoSection />
      <Articles />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
    <ChatBubble />
  </div>
);

export default function App() {
  return (
    // <--- WAJIB BUNGKUS DENGAN HELMETPROVIDER DI SINI --->
    <HelmetProvider>
      <Router>
        <Routes>
          {/* RUTE UNTUK PENGUNJUNG UMUM */}
          <Route path="/" element={<MainWebsite />} />

          {/* RUTE LOGIN ADMIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* RUTE DASHBOARD ADMIN (DILINDUNGI) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminProducts />} />
            <Route path="sliders" element={<AdminSliders />} />
            <Route path="video" element={<AdminVideo />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="visitors" element={<AdminVisitors />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}