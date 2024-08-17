import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import CottagePage from "./Pages/CottagePage";
import NavigationButton from "./Components/NavigationButton";
import ReviewPage from "./Pages/ReviewPage";
import MapPage from "./Pages/MapPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./App.css";
import BookingForm from "./Components/BookingForm";
import BookingPage from "./Pages/BookingPage";
import AdminLogin from "./Admin/Auth/AdminLogin";
import Dashboard from "./Admin/Dashboard/dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info/:cottageKey" element={<CottagePage />} />
          <Route path="/navigate" element={<NavigationButton />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/location" element={<MapPage />} />
          <Route path="/test" element={<BookingForm />} />
          <Route path="/reservation" element={<BookingPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
