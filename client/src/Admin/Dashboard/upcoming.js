import Navbar from "../Components/navbar";
import AdminButton from "../Components/adminButton";
import { useEffect, useState } from "react";

function UpcomingBookings() {
  const [data, setData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleSelectedBooking = (bookingID) => {
    if (selectedBooking === bookingID) {
      setSelectedBooking(null);
    }
    if (selectedBooking !== bookingID) {
      setSelectedBooking(bookingID);
    }
  };

  const fetchData = () => {
    fetch("http://localhost:3001/api/admin/upcoming_bookings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Failed to fetch request data");
        }
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(fetchData, []);
  return (
    <div>
      <Navbar className="admin-navbar-class" />
      <div style={{ height: "40px" }}></div>
      <div className="four-buttons">
        <AdminButton
          text="Request Handling"
          clicked={false}
          path="/admin-dashboard/request-handling"
          className="admin-button-class"
        />
        <AdminButton
          text="Change Prices"
          clicked={false}
          path="/admin-dashboard/change-prices"
          className="admin-button-class"
        />
        <AdminButton
          text="Upcoming Bookings"
          clicked={true}
          path="/admin-dashboard/upcoming-bookings"
          className="admin-button-class"
        />
        <AdminButton
          text="Recent Bookings"
          clicked={false}
          path="/admin-dashboard/recent-bookings"
          className="admin-button-class"
        />
      </div>

      <ul>
        {data.map((booking) => (
          <li key={booking.BookingRef}>
            <p>{booking.FirstName + " " + booking.LastName}</p>
            <button onClick={() => handleSelectedBooking(booking.BookingRef)}>
              Info
            </button>
            {selectedBooking === booking.BookingRef && (
              <ul>
                <li>Email: {booking.Email}</li>
                <li>Check-In: {booking.CheckIn}</li>
                <li>Check-Out: {booking.CheckOut}</li>
                <li>Phone Number 1: {booking.PhoneNumber[0]}</li>
                <li>Phone Number 2: {booking.PhoneNumber[1]}</li>
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingBookings;
