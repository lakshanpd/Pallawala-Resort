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
import AdminButton from "./Admin/Components/adminButton";
import Request_Handling from "./Admin/Dashboard/handle_requests";
import ChangePrice from "./Admin/Dashboard/change_prices";
import UpcomingBookings from "./Admin/Dashboard/upcoming";
import RecentBookings from "./Admin/Dashboard/recent";

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
          <Route
            path="/admin-dashboard/request-handling"
            element={<Request_Handling />}
          />
          <Route
            path="/admin-testing"
            element={<AdminButton text="Handle Requests" clicked={false} />}
          />

          <Route
            path="/admin-dashboard/change-prices"
            element={<ChangePrice />}
          />
          <Route
            path="/admin-dashboard/upcoming-bookings"
            element={<UpcomingBookings />}
          />
          <Route
            path="/admin-dashboard/recent-bookings"
            element={<RecentBookings />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
