import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/public/Home.jsx";
import Work from "./pages/public/Work.jsx";
import Podcast from "./pages/public/Podcast.jsx";

import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import WorkAdmin from "./pages/admin/WorkAdmin.jsx";
import PodcastAdmin from "./pages/admin/PodcastAdmin.jsx";
import ServicesAdmin from "./pages/admin/ServicesAdmin.jsx";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin.jsx";
import PackagesAdmin from "./pages/admin/PackagesAdmin.jsx";
import FaqsAdmin from "./pages/admin/FaqsAdmin.jsx";
import InquiriesAdmin from "./pages/admin/InquiriesAdmin.jsx";
import SettingsAdmin from "./pages/admin/SettingsAdmin.jsx";

import "./styles/public.css";
import "./styles/admin.css";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/work"
          element={
            <PublicLayout>
              <Work />
            </PublicLayout>
          }
        />
        <Route
          path="/podcast"
          element={
            <PublicLayout>
              <Podcast />
            </PublicLayout>
          }
        />

        {/* Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="work" element={<WorkAdmin />} />
          <Route path="podcast" element={<PodcastAdmin />} />
          <Route path="services" element={<ServicesAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="packages" element={<PackagesAdmin />} />
          <Route path="faqs" element={<FaqsAdmin />} />
          <Route path="inquiries" element={<InquiriesAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
      </Routes>
    </>
  );
}
