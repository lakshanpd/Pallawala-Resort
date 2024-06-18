const express = require("express");
const router = express.Router();
const db = require("./db");

const util = require("util");
const dbQuery = util.promisify(db.query).bind(db);

// Define routes
router.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define a route that accepts a parameter
router.get("/api/:cottageNumber", (req, res) => {
  // Retrieve the parameter from the URL
  const cottageNumber = req.params.cottageNumber;

  db.query(
    "SELECT Description FROM Room WHERE RoomID = ?",
    [cottageNumber],
    (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    }
  );
});

router.get("/api/review/contents", (req, res) => {
  db.query("SELECT Content FROM Review", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/api/review/rating", (req, res) => {
  db.query("SELECT Rating FROM Review", (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.get("/api/review/customer_names", (req, res) => {
  const sql_query = `SELECT FirstName, LastName FROM Customer
    RIGHT JOIN 
    (SELECT Booking.BookingRef, Booking.CustomerID FROM Booking
    RIGHT JOIN Review 
    ON Review.BookingRef = Booking.BookingRef) AS intermediate
    ON Customer.CustomerID = intermediate.CustomerID;`;

  db.query(sql_query, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

router.get("/api/cottage/cottage_prices", (req, res) => {
  const sql_query = `SELECT Price FROM Room WHERE IsCottage=True;`;

  db.query(sql_query, (err, data) => {
    if (err) return res.json(err);
    console.log(data);
    return res.json(data);
  });
});

router.post("/submit_booking_form", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      nic,
      phoneNo1,
      phoneNo2,
      rooms,
      checkin,
      checkout,
    } = req.body;

    console.log("Booking form submitted:", req.body);

    // Convert checkin and checkout to correct date format
    const checkinDate = new Date(checkin).toISOString().split("T")[0];
    const checkoutDate = new Date(checkout).toISOString().split("T")[0];

    //check avaliability

    for (let i = 0; i < rooms.length; i++) {
      const check_query = `
      SELECT CheckIn, CheckOut
      FROM booking
      WHERE BookingRef IN (
          SELECT BookingRef
          FROM roomdetails
          WHERE RoomID = ?
      )
      AND (
          ? BETWEEN CheckIn AND CheckOut OR
          ? BETWEEN CheckIn AND CheckOut OR
          (? < CheckIn AND ? > CheckOut)
      );
    `;

      const check_data = await dbQuery(check_query, [
        parseInt(rooms[i]),
        checkinDate,
        checkoutDate,
        checkinDate,
        checkoutDate,
      ]);

      if (check_data.length > 0) {
        return res.json({ message: "Booking not available" });
      }
    }

    // Insert customer details
    const customer_query = `INSERT INTO Customer (Email, FirstName, LastName, NIC) VALUES (?, ?, ?, ?)`;

    const customer_result = await dbQuery(customer_query, [
      email,
      firstName,
      lastName,
      nic,
    ]);

    // Retrieve the last inserted CustomerID
    const customer_id_query = `SELECT LAST_INSERT_ID() AS CustomerID`;

    const customer_id_result = await dbQuery(customer_id_query);
    const customerID = customer_id_result[0].CustomerID;

    // Insert booking details

    const booking_query = `INSERT INTO Booking (CustomerID, CheckIn, CheckOut) VALUES (?, ?, ?)`;

    await dbQuery(booking_query, [customerID, checkin, checkout]);

    // Insert phone numbers

    const phone_query = `INSERT INTO PhoneNumber (CustomerID, PhoneNumber) VALUES (?, ?), (?, ?)`;

    await dbQuery(phone_query, [customerID, phoneNo1, customerID, phoneNo2]);

    const booking_ref_query = `SELECT LAST_INSERT_ID() AS BookingRef`;
    const booking_ref_result = await dbQuery(booking_ref_query);
    const bookingRef = booking_ref_result[0].BookingRef;

    // Insert room details

    for (let i = 0; i < rooms.length; i++) {
      const room_query = `INSERT INTO RoomDetails (BookingRef, RoomID) VALUES (?, ?)`;

      await dbQuery(room_query, [bookingRef, parseInt(rooms[i])]);
    }

    console.log("Booking successful");
    return res.json({ message: "Booking submitted successfully!" });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
