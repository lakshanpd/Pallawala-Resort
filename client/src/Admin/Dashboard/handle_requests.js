import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import AdminButton from "../Components/adminButton";
import "./handle_requests.css";
// import RequestCard from "../Components/requestCard";

function RequestHandling() {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/api/admin/requests", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Request data fetched successfully");
          return res.json();
        } else {
          console.error("Failed to fetch request data");
          return [];
        }
      })
      .then((r_data) => {
        setData(r_data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setData([]); // Set to empty array on error to avoid undefined issues
      });
  }, []);

  const handlClicked = () => {
    setClicked(!clicked);
  };

  const handleAccept = (booking_id) => {
    fetch("http://localhost:3001/api/admin/handle-accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: booking_id,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("Handle Accept successful");
      } else {
        console.log("Handle Accept failed");
      }
    });
  };

  const handleReject = (booking_id) => {
    fetch("http://localhost:3001/api/admin/handle-reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: booking_id,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("Handle Reject successful");
      } else {
        console.log("Handle Reject failed");
      }
    });
  };

  return (
    <div className="request-handling-class">
      <Navbar className="admin-navbar-class" />
      <div style={{ height: "40px" }}></div>
      <div className="four-buttons">
        <AdminButton
          text="Request Handling"
          clicked={true}
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
          clicked={false}
          path="/admin-dashboard/upcoming-bookings"
        />
        <AdminButton
          text="Recent Bookings"
          clicked={false}
          path="/admin-dashboard/recent-bookings"
          className="admin-button-class"
        />
      </div>

      <div style={{ height: "40px" }}></div>

      {data.map((request) => (
        <div className="request-card">
          <div className="request-card-abstract" onClick={handlClicked}>
            <p>{request.FirstName + " " + request.LastName}</p>
            <button
              className="accept-button"
              onClick={() => handleAccept(request.BookingRef)}
            >
              {" "}
              Accept{" "}
            </button>
            <button
              className="reject-button"
              onClick={() => handleReject(request.BookingRef)}
            >
              {" "}
              Reject{" "}
            </button>
          </div>
          {clicked ? (
            <div>
              <p className="card-nic">NIC : {request.NIC}</p>
              <p className="card-email">Email : {request.Email}</p>
              <p className="card-phone-1">Phone 1 : {request.PhoneNumber[0]}</p>
              <p className="card-phone-2">Phone 2 : {request.PhoneNumber[1]}</p>
              <p className="card-checkin">Check-in : {request.CheckIn}</p>
              <p className="card-checkout">Check-out : {request.CheckOut}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default RequestHandling;
