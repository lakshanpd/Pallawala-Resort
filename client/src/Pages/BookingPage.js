import React from "react";
import NavBar from "../Components/NavBar";
import Contacts from "../Components/Contacts";
import Slider from "../Components/Slider";
import "./BookingPage.css";
import BookingForm from "../Components/BookingForm";
import Footer from "../Components/Footer";

const BookingPage = () => {
  return (
    <div>
      <Contacts />
      <NavBar />
      <Slider />
      <div style={{ height: "30px" }}></div>
      <div className="booking-description">
        <h3> Avaliability Request </h3>
        <p>
          You are invited to submit a request for confirmation of availability.
          <br />
          We shall answer as soon as possible, and will be happy to welcome you
          as our guests to our resort. <br /> We normally answer within 24
          hours. If you do not receive our confirmation call, please contact us
          thorugh our mobile numbers or email.
        </p>
      </div>
      <div style={{ height: "30px" }}></div>
      <BookingForm />
      <div style={{ height: "30px" }}></div>
      <div className="booking-description">
        <p>
          Customers older than 18 years old can reserve the accommodation.
          <br /> We guarantee the best prices for all of our accommodation
          choice !
        </p>
        <div style={{ height: "20px" }}></div>
        <a href="/booking_policy" className="booking-policy-link">
          {" "}
          Booking Policy{" "}
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
