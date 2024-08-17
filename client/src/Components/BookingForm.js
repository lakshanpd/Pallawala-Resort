import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingForm.css";
import Button from "react-bootstrap/Button";

function BookingForm() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [nic, setNic] = useState("");
  const [phoneNo1, setPhoneNo1] = useState("");
  const [phoneNo2, setPhoneNo2] = useState("");
  const roomNames = [
    "cottage 1",
    "cottage 2",
    "cottage 3",
    "cottage 4",
    "cottage 5",
    "cottage 6",
    "room 1",
    "room 2",
    "room 3",
    "room 4",
  ];
  const rows = ["1", "2", "3", "1", "2", "3", "1", "2", "3", "4"];
  const columns = ["1", "1", "1", "2", "2", "2", "3", "3", "3", "3"];

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStartDate();
    setEndDate();
    setFirstName("");
    setLastName("");
    setEmail("");
    setRooms([]);
    setMessage("");
    setNic("");
    setPhoneNo1("");
    setPhoneNo2("");

    if (startDate >= endDate) {
      setMessage("Check-out date should be after check-in date");
      return;
    }

    if (rooms.length === 0) {
      setMessage("Please select at least one room");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:3001/api/submit_booking_form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            nic,
            phoneNo1,
            phoneNo2,
            rooms,
            checkin: startDate.toISOString().split("T")[0],
            checkout: endDate.toISOString().split("T")[0],
          }),
        }
      );

      const data = await response.json(); // Parse JSON response

      if (response.ok) {
        console.log("Success:", data.message); // Log success message from response
        setMessage(data.message);
        setTimeout(1000);
        setMessage("");
      } else {
        console.log("Error:", data.message); // Log error message from response
      }
    } catch (error) {
      console.error("An error occurred:", error); // Log network or other errors
    }
  };

  return (
    <div className="booking-form">
      {/* <h1>Book Your Stay</h1> */}

      <form onSubmit={handleSubmit}>
        <div className="grid-container-form">
          <div className="grid-item-1">
            <label htmlFor="fname">First Name</label>
            <br />
            <input
              type="text"
              id="fname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{ width: "100%" }}
              className="input-field"
            />
            <br />
          </div>

          <div className="grid-item-2">
            <label htmlFor="lname">Last Name</label>
            <br />
            <input
              type="text"
              id="lname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={{ width: "100%" }}
              className="input-field"
            />
            <br />
          </div>

          <div className="grid-item-3">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%" }}
              className="input-field"
            />
            <br />
          </div>

          <div className="grid-item-4">
            <label htmlFor="nic">NIC</label>
            <br />
            <input
              type="text"
              id="nic"
              pattern="^[0-9]{12}$|^[0-9]{9}[vV]$"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              required
              style={{ width: "100%" }}
              className="input-field"
            />
            <br />
          </div>

          <div className="grid-item-5">
            <label htmlFor="phoneNo1">Phone Number 1</label>
            <br />
            <input
              type="tel"
              id="phoneNo1"
              pattern="^0[0-9]{9}$|^\+94[0-9]{9}$"
              value={phoneNo1}
              onChange={(e) => setPhoneNo1(e.target.value)}
              required
              style={{ width: "100%" }}
              className="input-field"
            />
            <br />
          </div>

          <div className="grid-item-6">
            <label htmlFor="phoneNo2">Phone Number 2</label>
            <br />
            <input
              type="tel"
              id="phoneNo2"
              pattern="^0[0-9]{9}$|^\+94[0-9]{9}$"
              value={phoneNo2}
              onChange={(e) => setPhoneNo2(e.target.value)}
              required
              style={{ width: "100%" }}
              className="input-field"
            />
            <br />
          </div>
        </div>

        <div style={{ height: "20px" }}></div>

        <div className="room-checkboxes">
          {roomNames.map((room, index) => {
            let row = rows[index];
            let column = columns[index];
            return (
              <div
                key={index}
                className={`checkbox-item  row${row} col${column}`}
              >
                <input
                  type="checkbox"
                  id={room}
                  value={index + 1}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRooms([...rooms, e.target.value]);
                    } else {
                      setRooms(rooms.filter((room) => room !== e.target.value));
                    }
                  }}
                />
                <label htmlFor={room} style={{ paddingLeft: "10px" }}>
                  {room}{" "}
                </label>
              </div>
            );
          })}
        </div>

        <div style={{ height: "10px" }}></div>

        <div className="date-labels">
          <div className="grid-item-7">
            <label htmlFor="checkin">Check-in Date</label>
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              id="checkin"
              required
            />
            <br />
          </div>

          <div className="checkout-date">
            <label htmlFor="grid-item-8">Check-out Date</label>
            <br />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              id="checkout"
              required
            />
            <br />
          </div>
        </div>
        <div style={{ height: "30px" }}></div>

        <div className="submission">
          <Button
            type="submit"
            variant="outline-secondary"
            size="sm"
            style={{
              border: "2px solid rgb(166, 159, 159)",
              fontWeight: "bold",
            }}
          >
            Send Request
          </Button>
          <p style={{ marginLeft: "30px", color: "red" }}>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
